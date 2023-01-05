const bcrypt = require('bcryptjs')
const { Employee } = require('../models')
const { generateQR, generateEncryptedQR } = require('../tools/qr-code')
const { today } = require('../tools/day')

module.exports = {
  // GET /api/employees/:employee_id/2d_code 員工可以取得當日打卡二維碼(無加密)
  get2dCode: async (req, res, next) => {
    try {
      const id = req.params.employee_id
      console.log('get2dCode 偵測 id === ', id)
      const qrCode = await generateQR(`${process.env.PUNCH_URL}${id}`)
      res.status(200).json({
        status: 200,
        message: '成功取得打卡二維碼',
        punchCode: qrCode
      })
    } catch (err) {
      next(err)
    }
  },
  // POST /api/employees/2d_code_auth 使用者向伺服器發送驗證用 IP
  checkIP: async (req, res, next) => {
    try {
      console.log('checkIP已觸發')
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
    } catch (err) { next(err) }
  },
  // 接在 checkIP() 之後，回傳加密二維碼給前端。
  return2dCode: async (req, res, next) => {
    try {
      console.log('return2dCode已觸發')
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
      res.status(200).json({
        status: 200,
        message: '成功取得打卡二維碼',
        punchCode: qrCode
      })
    } catch (err) {
      next(err)
    }
  },
  // POST /api/employees 人資 admin 可以新增一筆員工記錄
  postEmployee: async (req, res, next) => {
    try {
      const { code, fullName } = req.body
      // 如果使用者身份非 admin 拒絕請求
      if (req.user.identity !== 'admin') {
        const err = new Error('你的權限無法提出此請求')
        err.status = 403
        throw err
      }
      // 如果未送出員工編號或姓名，拒絕請求。
      if (!code || !fullName) {
        const err = new Error('員工編號及姓名都是必填')
        err.status = 403
        throw err
      }
      const newEmployee = await Employee.create({
        code,
        fullName
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
  }
}
