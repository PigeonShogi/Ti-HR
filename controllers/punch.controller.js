const { Employee, Punch } = require('../models')
const bcrypt = require('bcryptjs')
const dayjs = require('dayjs')
const { now, today, timeSubtraction } = require('../tools/day')
const { ipArray } = require('../data/ip')

module.exports = {
  // GET /api/punches 管理者可以檢視所有打卡記錄
  getPunches: async (req, res, next) => {
    try {
      let page = Number(req.query.page)
      // 如果 req.query 是不恰當的值，將之轉換為 1，以免預期外的錯誤發生。
      if (!page || typeof page !== 'number') {
        page = 1
      }
      // 後端同一時間只回傳十筆資料給前端渲染
      const limit = 10
      const offset = (page - 1) * limit
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      const { count, rows } = await Punch.findAndCountAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
          {
            model: Employee,
            attributes: ['code', 'full_name']
          }
        ],
        order: [
          ['working_day', 'DESC'],
          [Employee, 'code', 'ASC']
        ],
        limit,
        offset,
        nest: true,
        raw: true
      })
      res.status(200).json({
        status: 200,
        message: `成功調閱打卡記錄（第${page}頁）`,
        count,
        data: rows
      })
    } catch (err) {
      next(err)
    }
  },
  // POST /api/punches 員工可以打卡
  postPunch: async (req, res, next) => {
    try {
      // 從資料表中找出當天的打卡記錄，若無則新建打卡記錄。
      console.log('調用 postPunch', now)
      const [punch, created] = await Punch.findOrCreate({
        where: { EmployeeId: req.user.id, workingDay: today },
        defaults: {
          workingDay: today,
          state: '完成上班打卡',
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
        // 計算上班打卡至目前為止的時間，計算結果為 n 小時。
        const workingHours = timeSubtraction(punch.createdAt, punch.updatedAt)
        console.log('工時：', workingHours)
        let state
        if (workingHours < 8) {
          state = '警告：出勤時數未達標準'
        } else if (workingHours >= 8) {
          state = '出勤時數已達標準'
        } else {
          state = '工時異常'
        }
        await Punch.update(
          {
            state
          },
          { where: { EmployeeId: req.user.id } }
        )
        res.status(200).json({
          status: 200,
          message: '下班打卡成功',
          data: workingHours
        })
      }
    } catch (err) {
      next(err)
    }
  },
  // GET /api/punches/:encrypted_value 員工可以掃描二維碼打卡
  twoDCodePunch: (req, res, next) => {
    try {
      // 如果打卡路由的雜湊值（:encrypted_value）含有 slash，先將之還原為斜線符號再行比對。
      const hash = req.params.encrypted_value.replace(/slash/g, '/')
      const verify = []
      // 比對使用者IP（ip）是否為公司儲存在 ipArray 內的許可值。
      for (const ip of ipArray) {
        console.log(ip)
        console.log(req.user.code)
        console.log('today === ', today)
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
      // 調用 postPunch
      next()
    } catch (err) {
      next(err)
    }
  },
  // PUT /api/punches/:punch_id/state 管理者可以將缺勤狀態改為到勤
  putState: async (req, res, next) => {
    try {
      if (req.user.identity === 'admin') {
        const punchId = req.params.punch_id
        const punch = await Punch.update(
          { state: '出勤時數已達標準' },
          {
            where: {
              id: punchId
            }
          }
        )
        // punch[0] === 0 表示資料庫中並無該筆資料
        if (punch[0] === 0) {
          res.status(404).json({
            status: 404,
            message: '查無記錄，無法更改。',
            data: punch
          })
        } else {
          res.status(200).json({
            status: 200,
            message: '已將缺勤狀態改為到勤',
            data: punch
          })
        }
      } else {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
    } catch (err) {
      next(err)
    }
  }
}
