const { Employee, Punch } = require('../models')
const { Op } = require('sequelize')
const bcrypt = require('bcryptjs')
const { todayTaiwan, today, timeSubtraction } = require('../tools/day')
const { ipArray } = require('../data/ip')
const { roundToTwo } = require('../tools/math')

module.exports = {
  // GET /api/punches/:employee_code/my_punches 員工可以檢視自己的打卡記錄
  getMyPunches: async (req, res, next) => {
    try {
      const { employeeCode } = req.params
      // 只能查閱自己的打卡記錄
      if (req.user.code !== employeeCode) {
        const err = new Error('你只能查閱自己的打卡記錄')
        err.status = 403
        throw err
      }
      const { option } = req.query
      let page = Number(req.query.page)
      let criterion
      // 之後會使用 SQL 的 NOT 關鍵詞查詢資料。如果前端的檢索選項是 absence，就將 state 非「出勤時數已達標準」的記錄回傳前端。如果前端的檢索選項是 all，就將 state 非空字串的記錄回傳前端。
      if (option === 'absence') {
        criterion = '出勤時數已達標準'
      } else if (option === 'all') {
        criterion = ''
      }
      // 如果 req.query 是不恰當的值，將之轉換為 1，以免預期外的錯誤發生。
      if (!page || typeof page !== 'number') {
        page = 1
      }
      // 後端同一時間只回傳十筆資料給前端渲染
      const limit = 10
      const offset = (page - 1) * limit
      const { count, rows } = await Punch.findAndCountAll({
        where: {
          [Op.not]: [{ state: [criterion] }]
        },
        include: [
          {
            model: Employee,
            where: { code: employeeCode },
            attributes: ['code', 'full_name']
          }
        ],
        order: [['working_day', 'DESC']],
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
  // GET /api/punches 管理者可依條件檢視打卡記錄
  getPunches: async (req, res, next) => {
    try {
      // 一般使用者無法提出此請求
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      const { option } = req.query
      let page = Number(req.query.page)
      let criterion
      // 之後會使用 SQL 的 NOT 關鍵詞查詢資料。如果前端的檢索選項是 absence，就將 state 非「出勤時數已達標準」的記錄回傳前端。如果前端的檢索選項是 all，就將 state 非空字串的記錄回傳前端。
      if (option === 'absence') {
        criterion = '出勤時數已達標準'
      } else if (option === 'all') {
        criterion = ''
      }
      // 如果 req.query 是不恰當的值，將之轉換為 1，以免預期外的錯誤發生。
      if (!page || typeof page !== 'number') {
        page = 1
      }
      // 後端同一時間只回傳十筆資料給前端渲染
      const limit = 10
      const offset = (page - 1) * limit
      const { count, rows } = await Punch.findAndCountAll({
        where: {
          [Op.not]: [{ state: [criterion] }]
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
      const [punch, created] = await Punch.findOrCreate({
        where: { EmployeeId: req.user.id, workingDay: todayTaiwan },
        defaults: {
          workingDay: todayTaiwan,
          workingHours: 0,
          state: '完成上班打卡',
          EmployeeId: req.user.id
        },
        nest: true,
        raw: true
      })
      // findOrCreate() 的結果若是新建打卡記錄（created === true）就顯示上班打卡成功
      if (created) {
        res.status(200).json({
          status: 200,
          message: '上班打卡成功'
        })
        // findOrCreate() 的結果若是找到打卡記錄（created === false）就處理下班打卡邏輯
      } else if (!created) {
        // 計算上班打卡至目前為止的時間，計算結果為 n 小時。
        const workingHours = roundToTwo(
          timeSubtraction(punch.createdAt, punch.updatedAt)
        )
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
            state,
            workingHours
          },
          { where: { EmployeeId: req.user.id, workingDay: todayTaiwan } }
        )
        res.status(200).json({
          status: 200,
          message: `下班打卡成功。你今日的工時：${workingHours}小時`,
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
  // GET /api/punches/demo 掃描二維碼打卡（Demo 專用，無加密、不審核IP）
  twoDCodePunchDemo: (req, res, next) => {
    try {
      // 調用 postPunch（掃描二維碼無法發出POST請求，需轉交下個中介軟體處理）
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
