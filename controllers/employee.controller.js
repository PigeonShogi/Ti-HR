const bcrypt = require('bcryptjs')
const { Employee } = require('../models')
const { generateEncryptedQR, generateDemoQR } = require('../tools/qr-code')
const { today } = require('../tools/day')

module.exports = {
  // POST /api/employees/2d_code_auth 使用者向伺服器發送驗證用 IP，藉以取得加密過的打卡二維碼。
  checkIP: async (req, res, next) => {
    try {
      const { userIP } = req.body
      if (!userIP) {
        const err = new Error('系統無法取得你的IP，因此無法接受請求。')
        err.status = 403
        throw err
      }
      req.user.ip = userIP
      req.user.today = today
      // 調用 return2dCode()，將使用者的IP及當下日期當作引數傳入其中。
      next()
    } catch (err) {
      next(err)
    }
  },
  // 接在 checkIP() 之後，回傳加密二維碼給前端。
  return2dCode: async (req, res, next) => {
    try {
      if (!req.user.ip || !req.user.code || !req.user.today) {
        const err = new Error('你提供給系統的資料不齊全，因此請求不被核准。')
        err.status = 403
        throw err
      }
      const qrCode = await generateEncryptedQR(
        req.user.ip,
        req.user.code,
        req.user.today,
        process.env.PUNCH_URL
      )
      // 生成 Demo 專用二維碼（無加密、不檢查IP）
      const qrCodeDemo = await generateDemoQR(process.env.PUNCH_URL)
      res.status(200).json({
        status: 200,
        message: '成功取得打卡二維碼',
        punchCode: qrCode,
        punchCodeDemo: qrCodeDemo
      })
    } catch (err) {
      next(err)
    }
  },
  // GET /api/employees 人資 admin 可以檢視員工一覽表
  getEmployees: async (req, res, next) => {
    try {
      // 如果使用者身份非 admin，拒絕請求
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      // 後端同一時間只回傳十筆資料給前端渲染
      const page = Number(req.query.page)
      const limit = 10
      const offset = (page - 1) * limit
      const { count, rows } = await Employee.findAndCountAll({
        attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] },
        order: [
          ['typo_count', 'DESC'],
          ['code', 'ASC']
        ],
        limit,
        offset,
        nest: true,
        raw: true
      })
      res.status(200).json({
        status: 200,
        message: `成功調閱員工名單（第${page}頁）`,
        count,
        data: rows
      })
    } catch (err) {
      next(err)
    }
  },
  // POST /api/employees 人資 admin 可以新增一筆員工記錄
  postEmployee: async (req, res, next) => {
    try {
      const { code, fullName, identity } = req.body
      // 如果使用者身份非 admin，拒絕請求
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      // 如果有欄位未填，拒絕請求。
      if (!code || !fullName || !identity) {
        const err = new Error('所有欄位都是必填')
        err.status = 403
        throw err
      }
      // 一般員工的預設密碼為 titaner；管理者的預設密碼為 tiadmin
      let password = 'titaner'
      if (identity === 'admin') {
        password = 'tiadmin'
      }
      const newEmployee = await Employee.create({
        code,
        fullName,
        identity,
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10))
      })
      res.status(200).json({
        status: 200,
        message: '成功建立新員工記錄',
        data: newEmployee
      })
    } catch (err) {
      next(err)
    }
  },
  // PUT /api/employees/password
  putPassword: async (req, res, next) => {
    try {
      const { password, newPassword, newPasswordConfirm } = req.body
      const employee = await Employee.findByPk(req.user.id)
      if (!bcrypt.compareSync(password, employee.password)) {
        const err = new Error('舊密碼輸入不正確')
        err.status = 403
        throw err
      }
      if (newPassword !== newPasswordConfirm) {
        const err = new Error('新密碼與確認新密碼不一致')
        err.status = 403
        throw err
      }
      await Employee.update(
        {
          password: await bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10))
        },
        {
          where: {
            id: req.user.id
          }
        }
      )
      res.status(200).json({
        status: 200,
        message: '更改密碼成功'
      })
    } catch (err) {
      next(err)
    }
  },
  // PUT /api/employees/typo_count 管理者可以將使用者的密碼錯誤次數歸零
  putTypoCount: async (req, res, next) => {
    try {
      // 如果使用者身份非 admin，拒絕請求
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      const { code } = req.query
      await Employee.update(
        {
          typoCount: 0
        },
        {
          where: {
            code
          }
        }
      )
      res.status(200).json({
        status: 200,
        message: '密碼錯誤次數歸零成功'
      })
    } catch (err) {
      next(err)
    }
  }
}
