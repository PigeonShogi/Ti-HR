# Ti-HR 鈦專業人資系統 API 伺服器
## 專案簡述
本專案為人資系統網站的後端部分，目前版本可提供使用者GPS定位打卡、二維碼打卡、人資管理者查閱打卡記錄、系統每日提示出勤狀態異常人數等。專案核心技術為Node.js、MySQL、RESTful APIs，透過後端伺服器及資料庫之CRUD操作，為前端瀏覽器端提供服務，實現前後端分離開發及整合應用。
##### 本專案前端 repo
* https://github.com/PigeonShogi/Ti-HR-Client
##### 前後端專案整合 demo
* https://ti-hr-client.vercel.app/
##### Demo 帳號
* 管理員帳號：root
  密碼：12345678
* 一般用戶帳號 1：user1
  密碼：12345678
* 一般用戶帳號 2：user2
  密碼：12345678
* 一般用戶帳號 3：user3
  密碼：12345678
* 一般用戶帳號 4：user4
  密碼：12345678
* 一般用戶帳號 5：user5
  密碼：12345678
## 專案設定
1. 將本專案下載至本地
```
$ git clone https://github.com/PigeonShogi/Ti-HR
```
2. 進入專案資料夾
```
$ cd Ti-HR
```
3. 安裝所需套件
```
$ npm install
```
4. 建立資料庫（以 MySQLWorkbench 為例）
```
※ 請先核對本地資料庫的 username、password 是否與 /config/config.json 中的 development 設定一致。
步驟A：create database ti_hr;
步驟B：字元集設定
Character Set: utf8mb4
Collation: utf8mb4_unicode_ci
```
5. 建立資料表
```
$ npx sequelize db:migrate
```
6. 建立種子資料
```
$ npx sequelize db:seed:all
```
7. 建立檔案 .env 並設定環境變數
```
環境變數設定可參考 .env.example
```
8. 啟動伺服器 
```
$ npm run dev
// 若終端機顯示「Listening on port 8000...」字樣，表示啟動成功。
```

## API 文件
* https://internal-heath-a13.notion.site/API-6e83aeda11ef4d0aac006da57be4ff80
## 主要開發工具
* Node.js 14.16.0
* Express 4.16.4
* MySQL2 1.6.4
* passport 0.4.0
* jsonwebtoken 8.5.1
* bcrypt-nodejs 0.0.3
