/*
這是一個排程檔案。命令伺服器每天凌晨五點檢查昨天是否為上班日，是就從資料庫存取打卡記錄，否則結束當日排程工作。
*/
const { Employee, Holiday, Punch } = require('../models')
// 引用套件計算時間、發系統通知信
const dayjs = require('dayjs')
const today = dayjs().format().slice(0, 10) + ' 05:00:00'
const yesterday = dayjs(today).subtract(1, 'd').format().slice(0, 10)
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
})

const mailOptions = {
  from: process.env.GMAIL_USER,
  to: process.env.GMAIL_ONE,
  subject: 'Daily Report',
  text: null
}

const CronJob = require('cron').CronJob
const job = new CronJob(
  // 秒 分 時 日 月 星期
  // 開發完成後需調整下列時間
  '10 * * * * *',
  async function () {
    const scheduleStartTime = new Date()
    console.info('提示：排程工作啟用中')
    // 資料表 Holidays 內的預設資料為 2022、2023兩年的所有假日。以下編碼將以昨日日期為檢索條件，找尋資料表內是否有日期與其一致的記錄，是則表示昨日為假日，結束本日排程工作；若找尋資料表結果查無記錄，表示昨日為上班日，繼續本日排程工作。
    const isHoliday = await Holiday.findOne({
      where: { date: yesterday }
    })
    // if (!isHoliday) {
    if (mailOptions.subject === 'Daily Report') { // 測試完畢後要改回來
      // 之後會將出勤狀況異常的記錄寫入陣列 abnormal 之中
      const abnormal = []
      // 從員工資料表中找出所有員工記錄
      const employees = await Employee.findAll({
        attributes: ['id', 'code', 'fullName'],
        raw: true
      })
      // 根據前面取得的員工清單，從打卡資料表找出 employee_id 與 員工資料表 id 一致，且上班日為昨天的記錄，若查無記錄則新增一筆缺勤記錄。
      for (const employee of employees) {
        const [record] = await Punch.findOrCreate({
          where: {
            employee_id: employee.id,
            working_day: yesterday
          },
          include: [
            {
              model: Employee,
              attributes: ['code', 'full_name']
            }
          ],
          defaults: {
            workingDay: yesterday,
            state: '無打卡記錄',
            EmployeeId: employee.id
          },
          attributes: ['working_day', 'state'],
          raw: true,
          nest: true
        })
        if (record && record.state === '出勤時數已達標準') {
          continue
        } else if (record && record.state === '無打卡記錄') {
          abnormal.push({
            state: record.dataValues.state,
            employee_id: record.dataValues.employee_id
          })
        } else {
          abnormal.push(record)
        }
      }
      const report = {
        scheduleStartTime,
        message: `昨天是上班日，打卡記錄異常人數為${abnormal.length}人，異常狀況如下：`,
        abnormal
      }
      mailOptions.text = `本報表產生於：${scheduleStartTime}。昨天是上班日，打卡記錄異常人數為${abnormal.length}人。詳情請查閱人資系統。`
      transporter
        .sendMail(mailOptions)
        .then((info) => {
          console.info({ info })
        })
        .catch((err) => {
          console.error(err)
        })
      console.info(report)
    }
  },
  null,
  false,
  'Asia/Taipei'
)
job.start()

module.exports = job