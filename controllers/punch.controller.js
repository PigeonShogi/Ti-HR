const { Employee, Punch } = require('../models')
const dayjs = require('dayjs')

module.exports = {
  // POST /api/punches 員工可以打卡
  postPunch: async (req, res) => {
    const today = dayjs().format().slice(0, 10)
    const time = dayjs().format().slice(11, 19)
    const punch = await Punch.findOne({
      where: { EmployeeId: 3, workingDay: today }
    })
    try {
      if (!punch) {
        await Punch.create({
          workingDay: today,
          state: '完成上班打卡',
          in: time,
          EmployeeId: 3
        })
        res.status(200).json({
          status: 200,
          message: '上班打卡成功'
        })
      }
      await punch.update(
        { out: time },
        { where: { EmployeeId: 3 } })
      res.status(200).json({
        status: 200,
        message: '下班打卡成功'
      })
    } catch (err) {
      res.status(401).json({
        status: 401,
        message: err.message
      })
    }
  }
}
