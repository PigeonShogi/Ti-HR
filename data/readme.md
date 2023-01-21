# 資料夾 data 內各檔案相關說明
### calendar_2022.csv 及 calendar_2023.csv
這兩個檔案的原始資料來自「政府資料開放平臺 - 中華民國政府行政機關辦公日曆表」
https://data.gov.tw/dataset/14718
### holidays2022.txt 及 holidays2023.txt
這兩個檔案是藉由 tools/csv-parser.js 產生的檔案
### holidays_2022.js 及 holidays_2023.js
1. 這兩個檔案是為了建立種子資料而編寫，seeders/20221228180738-holiday-seed-file 引用了這兩個檔案。
2. 這兩個檔案內的陣列，其元素分別來自 holidays2022.txt 及 holidays2023.txt 內的資料。
### ip.js
本專案假設使用情境：公司只允許特定IP的使用者利用二維碼打卡功能。本檔案是為了設定IP白名單而編寫。