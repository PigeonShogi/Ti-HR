const { Employee } = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  // POST /api/employees/signIn 員工可以登入系統
  signIn: async (req, res, next) => {
    const { employeeCode, password } = req.body
    // 根據使用者輸入的員工編號找尋員工資料
    const employeeData = await Employee.findOne({
      where: { code: employeeCode },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true
    })
    try {
      // 檢查員工編號是否存在
      if (!employeeData) {
        const err = new Error('你輸入的員工編號並不存在')
        err.status = 401
        throw err
      }
      // 檢查密碼錯誤次數是否達五次以上
      if (employeeData.typoCount >= 5) {
        const err = new Error('密碼輸入錯誤累計5次以上，系統拒絕你的登入請求。請向人資同仁尋求協助。')
        err.status = 401
        throw err
      }
      // 檢查密碼是否輸入正確
      if (!bcrypt.compareSync(password, employeeData.password)) {
        await Employee.update(
          { typoCount: ++employeeData.typoCount },
          { where: { code: employeeCode } })
        const err = new Error(`密碼錯誤，累計錯誤次數${employeeData.typoCount}次。累計錯誤5次將導致無法登入，請小心。`)
        err.status = 401
        throw err
      }
      // 若密碼輸入錯誤累計次數未達五次，在登入成功後將累計次數歸零。
      await Employee.update(
        { typoCount: 0 },
        { where: { code: employeeCode } }
      )
      // 稍後要發行 JWT，在此先刪除 employeeData 的 password 屬性。
      delete employeeData.password
      const token = jwt.sign(employeeData, process.env.JWT_SECRET, { expiresIn: '23h' })
      res.status(200).json({
        status: 200,
        message: '登入成功',
        data: {
          token,
          employee: employeeData
        }
      })
    } catch (err) { next(err) }
  }
}
