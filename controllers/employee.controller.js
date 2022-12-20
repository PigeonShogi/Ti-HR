const { Employee } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = {
  // POST /api/employees 人資 admin 可以新增一筆員工記錄
  postEmployee: async (req, res, next) => {
    const { code, fullName } = req.body
    try {
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
    } catch (err) { next(err) }
  }
}
