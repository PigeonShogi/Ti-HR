const { Employee } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  // POST /api/employees/signIn 員工可以登入系統
  signIn: async (req, res, next) => {
    const { employeeCode, password } = req.body
    // 稍後要利用變數 checkCode 確認員工編號是否存在
    const checkCode = await Employee.findOne({
      where: { code: employeeCode },
      raw: true
    })
    // 找出員工編號及密碼匹配正確的員工資料，此變數也用於發行 JWT。
    const employeeData = await Employee.findOne({
      where: { code: employeeCode, password },
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      raw: true
    })
    try {
      // 檢查員工編號是否存在
      if (!checkCode) {
        const err = new Error('你輸入的員工編號並不存在')
        err.status = 401
        throw err
      }
      // 檢查密碼錯誤次數是否達五次以上
      if (checkCode.typoCount >= 5) {
        const err = new Error('密碼輸入錯誤累計5次以上，系統拒絕你的登入請求。請向人資同仁尋求協助。')
        err.status = 401
        throw err
      }
      // 檢查密碼是否輸入正確
      if (!employeeData) {
        await Employee.update(
          { typoCount: ++checkCode.typoCount },
          { where: { code: employeeCode } })
        const err = new Error(`密碼錯誤，累計錯誤次數${checkCode.typoCount}次。累計錯誤5次將導致無法登入，請小心。`)
        err.status = 401
        throw err
      }
      // 若密碼輸入錯誤累計次數未達五次，在登入成功後將累計次數歸零。
      await Employee.update(
        { typoCount: 0 },
        { where: { code: employeeCode } }
      )
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
