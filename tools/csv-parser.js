const { parse } = require('csv-parse')
// parse 需搭配 file system 使用
const fs = require('fs')
const path = require('path')
const calendar = path.join(__dirname, '..', 'data', 'calendar_2023.csv')
let results = ''

// 由於開發時間有限，暫且不研究如何將處理後的資料寫入檔案，僅從終端機顯示結果手動複製，建立為 JavaScript 可讀取的檔案格式（data/holidays_2022.js, data/holidays_2023.js）。
csvParser(calendar)

function csvParser (filePath) {
  // 代入要解析的行事曆檔案
  fs.createReadStream(filePath)
    .pipe(parse())
    .on('data', (data) => {
      // 行事曆 csv 檔的格式如下：
      // date,week,isHoliday
      // 20220101, Saturday, TRUE
      // 將日期格式由 yyyymmdd 轉為 yyyy-mm-dd
      data[0] = data[0]
        .replace(/\B(?=(?:\d{2})+(?!\d))/g, '-')
        .replace(/-/, '')
      // 將星期轉為以個位數表示，0 表示週日，6 表示週六。
      if (data[1] === 'Sunday') {
        data[1] = 0
      } else if (data[1] === 'Monday') {
        data[1] = 1
      } else if (data[1] === 'Tuesday') {
        data[1] = 2
      } else if (data[1] === 'Wednesday') {
        data[1] = 3
      } else if (data[1] === 'Thursday') {
        data[1] = 4
      } else if (data[1] === 'Friday') {
        data[1] = 5
      } else if (data[1] === 'Saturday') {
        data[1] = 6
      }
      // 找出假日
      if (data[2] === 'TRUE') {
        results += `${data[0]},`
      }
    })
    .on('error', (err) => {
      console.error(err)
    })
    .on('end', () => {
      console.log('資料解析完畢')
      console.log('results: ', results)
    })
}
