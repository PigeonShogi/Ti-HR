const dayjs = require('dayjs')

// 計算上班打卡至目前為止的時間，計算結果為 n 小時。
function timeSubtraction (start, end) {
  return dayjs(end).diff(dayjs(start)) / (60 * 60 * 1000)
}

module.exports = {
  now: dayjs().format(), // 2023-01-06T01:49:42+08:00
  today: dayjs().format().slice(0, 10), // yyyy-mm-dd（伺服器所在地時間、UTC+00:00）
  todayTaiwan: dayjs().add(8, 'h').format().slice(0, 10), // yyyy-mm-dd（台灣時間）
  timeSubtraction
}
