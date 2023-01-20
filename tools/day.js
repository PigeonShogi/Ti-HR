const dayjs = require('dayjs')

// 2023-01-06T01:49:42+08:00
const now = dayjs().format()

// 計算上班打卡至目前為止的時間，計算結果為 n 小時。
const timeSubtraction = (start, end) => {
  return dayjs(end).diff(dayjs(start)) / (60 * 60 * 1000)
}

// yyyy-mm-dd（伺服器所在地時間、UTC+00:00）
const today = dayjs().format().slice(0, 10)

// yyyy-mm-dd（台灣時間）
const todayTaiwan = dayjs().add(8, 'h').format().slice(0, 10)

/*
產出 Date 物件，使系統於每日凌晨五點檢查昨日出勤狀況時，能將 Date 存進工作日欄位。
由於伺服器時間比台灣晚八小時，台灣每日之始相當於伺服器時間的每日16點整。
在此利用 dayjs 將台灣時間減九小時，
確保無論用台灣時間或者伺服器時間，都可正確取得前一日的日期。
*/
const yesterdayStartOf = new Date(
  // 2023-01-17T16:00:00.000Z
  dayjs().subtract(9, 'h').startOf('day').format()
)

module.exports = {
  now,
  today,
  todayTaiwan,
  timeSubtraction,
  yesterdayStartOf
}
