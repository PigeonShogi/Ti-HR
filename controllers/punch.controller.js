const { Punch } = require('../models')
const dayjs = require('dayjs')

module.exports = {
  // POST /api/punches 員工可以打卡
  postPunch: async (req, res, next) => {
    const today = dayjs().format().slice(0, 10)
    const time = dayjs().format().slice(11, 19)
    try {
      // 從資料表中找出當天的打卡記錄，若無則新建打卡記錄。
      const [punch, created] = await Punch.findOrCreate({
        where: { EmployeeId: req.user.id, workingDay: today },
        defaults: {
          workingDay: today,
          state: '完成上班打卡',
          in: time,
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
        // 計算上下班時間差，並以百分比顯示，低於 100% 視為缺勤。
        const attendanceStandard = dayjs(punch.updatedAt).diff(
          dayjs(punch.createdAt)) / (8 * 60 * 60 * 1000) * 100
        let state = ''
        if (attendanceStandard < 100) {
          state = '警告：出勤時數未達標準'
        } else if (attendanceStandard >= 100) {
          state = '出勤時數已達標準'
        } else {
          state = '工時異常'
        }
        await Punch.update(
          {
            state,
            out: time
          },
          { where: { EmployeeId: req.user.id } })
        res.status(200).json({
          status: 200,
          message: '下班打卡成功',
          attendanceStandard
        })
      }
    } catch (err) { next(err) }
  }
}
