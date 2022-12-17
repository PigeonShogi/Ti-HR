const { Employee } = require('../models')

module.exports = {
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
