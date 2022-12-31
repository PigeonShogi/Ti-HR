const { Punch } = require('../models')
const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')
const { today } = require('../tools/day')
const { ipArray } = require('../data/ip')

module.exports = {
  // POST /api/punches 員工可以打卡
  postPunch: async (req, res, next) => {
    const today = dayjs().format().slice(0, 10)
    const time = dayjs().format().slice(11, 19)
    try {
      // 從資料表中找出當天的打卡記錄，若無則新建打卡記錄。
      const [punch, created] = await Punch.findOrCreate({
        where: { EmployeeId: req.user.id, workingDay: today },
        defaults: {
          workingDay: today,
          state: '完成上班打卡',
          in: time,
          EmployeeId: req.user.id
        },
        raw: true
      })
      // findOrCreate() 的結果若是新建打卡記錄（created === true）就顯示上班打卡成功
      if (created) {
        res.status(200).json({
          status: 200,
          message: '上班打卡成功'
        })
        // findOrCreate() 的結果若是找到打卡記錄（created === undefined）就處理下班打卡邏輯
      } else if (!created) {
        // 計算上下班時間差，並以百分比顯示，低於 100% 視為缺勤。
        const attendanceStandard =
          (dayjs(punch.updatedAt).diff(dayjs(punch.createdAt)) /
            (8 * 60 * 60 * 1000)) *
          100
        let state = ''
        if (attendanceStandard < 100) {
          state = '警告：出勤時數未達標準'
        } else if (attendanceStandard >= 100) {
          state = '出勤時數已達標準'
        } else {
          state = '工時異常'
        }
        await Punch.update(
          {
            state,
            out: time
          },
          { where: { EmployeeId: req.user.id } }
        )
        res.status(200).json({
          status: 200,
          message: '下班打卡成功',
          attendanceStandard
        })
      }
    } catch (err) {
      next(err)
    }
  },
  // GET /api/punches/:encrypted_value
  twoDCodePunch: (req, res, next) => {
    try {
      // 如果打卡路由的雜湊值（:encrypted_value）含有 slash，先將之還原為斜線符號再行比對。
      const hash = req.params.encrypted_value.replace(/slash/g, '/')
      const verify = []
      // 比對使用者IP（ip）是否為公司儲存在 ipArray 內的許可值。
      for (const ip of ipArray) {
        const unencryptedValue = `@${ip}${req.user.code}${today}j*K4$29r#U!h`
        const compare = bcrypt.compareSync(unencryptedValue, hash)
        if (compare) {
          verify.push(compare)
          break
        }
      }
      if (!verify.includes(true)) {
        const err = new Error(
          '你的打卡二維碼似乎有誤。請務必使用公司的設備產出的二維碼打卡。'
        )
        err.status = 404
        throw err
      }
      // 暫且回傳以下訊息。下次提交commit時改為調用打卡方法。
      res.status(200).json({
        status: 200,
        message: '雜湊值比對結果：合格'
      })
    } catch (err) { next(err) }
  }
}
