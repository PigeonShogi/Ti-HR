// 解析資料夾data內的行事曆csv檔（calendar_2022.csv, calendar_2023.csv），找出每年之中有哪幾天是假日。
const { parse } = require('csv-parse')
// parse 需搭配 file system 使用
const fs = require('fs')
const path = require('path')
// 設定欲解析檔案的路徑
const calendar2022 = path.join(__dirname, '..', 'data', 'calendar_2022.csv')
const calendar2023 = path.join(__dirname, '..', 'data', 'calendar_2023.csv')
// 以上兩個檔案解析後，要將解析結果儲存為純文字檔。在此先定義存檔路徑。
const holidays2022 = path.join(__dirname, '..', 'data', 'holidays2022.txt')
const holidays2023 = path.join(__dirname, '..', 'data', 'holidays2023.txt')
// 將檔案解析結果賦值給變數 results
let results = ''

function csvParser (filePath, writeFilePath) {
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
      // 檔案解析完畢，將解析結果寫入檔案。
      fs.writeFile(writeFilePath, results, (err) => {
        if (err) { console.error(err) } else { console.info('成功寫入檔案') }
      })
    })
}

/*
由於開發時間有限，暫且不研究如何藉由 file system 或其他程式將解析後的資料寫成JS檔，
而是利用上述函式寫入的txt檔之內容編寫可達成目的之檔案：
data/holidays_2022.js, data/holidays_2023.js
*/

/*
如果調用函式 csvParser 兩次，解析結果會集中在一起。
在此必須執行指令 node tools/csv-parser.js 兩次。
因此先調用其中一次，另一次暫且設為註解。
*/
csvParser(calendar2022, holidays2022)
// csvParser(calendar2023, holidays2023)
