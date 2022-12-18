const { Employee } = require('../models')

module.exports = {
  // POST /api/employees/signIn 員工可以登入系統
  signIn: async (req, res) => {
    const { employeeCode, password } = req.body
    // 稍後要利用變數 checkCode 確認員工編號是否存在
    const checkCode = await Employee.findOne({
      where: { code: employeeCode },
      raw: true
    })
    // 若密碼輸入錯誤，要利用變數 checkCodeAndPassword 增加累計錯誤次數
    const checkCodeAndPassword = await Employee.findOne({
      where: { code: employeeCode, password }
    })
    try {
      if (!checkCode) {
        throw new Error('你輸入的員工編號並不存在')
      }
      if (!checkCodeAndPassword) {
        await Employee.update(
          { typoCount: ++checkCode.typoCount },
          { where: { code: employeeCode } })
        throw new Error('密碼錯誤')
      }
      res.status(200).json({
        status: 200,
        message: '登入成功'
      })
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: err.message
      })
    }
  },
  // POST /api/employees 人資 admin 可以新增一筆員工記錄
  postEmployee: async (req, res) => {
    const { code, fullName, identity } = req.body
    const newEmployee = await Employee.create({
      code,
      fullName,
      password: 'titaner',
      identity
    })
    res.status(200).json({
      status: 200,
      message: '成功建立新員工記錄',
      data: newEmployee
    })
  }
}
