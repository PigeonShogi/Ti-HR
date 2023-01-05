const dayjs = require('dayjs')
// const timezone = require('dayjs/plugin/timezone')
// const utc = require('dayjs/plugin/utc')

// dayjs.extend(timezone)
// dayjs.extend(utc)
// dayjs.tz.setDefault('Asia/Taipei')
// now: dayjs().tz().format(),  2023-01-06T01:49:42+08:00
// today: dayjs().tz().format().slice(0, 10)  yyyy-mm-dd

// 計算上班打卡至目前為止的時間，計算結果為 n 小時。
function timeSubtraction (start, end) {
  return dayjs(end).diff(dayjs(start)) / (60 * 60 * 1000)
}

module.exports = {
  now: dayjs().format(), // 2023-01-06T01:49:42+08:00
  today: dayjs().format().slice(0, 10), // yyyy-mm-dd
  timeSubtraction
}
