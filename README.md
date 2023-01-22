# Ti-HR 鈦專業人資系統 API 伺服器

## 專案簡述

本專案為人資系統網站的後端程式碼，目前版本可提供使用者 GPS 定位打卡、二維碼打卡、人資管理者查閱打卡記錄、系統每日提示出勤狀態異常人數等功能。<br>專案核心技術為 Node.js、MySQL、RESTful APIs，透過後端伺服器及資料庫之 CRUD 操作，可為前端瀏覽器提供各種服務，實現前後端分離開發及整合應用。
## 專案功能詳述
本專案各項功能之詳細介紹揭示於本儲存庫的 [Wiki 頁面](https://github.com/PigeonShogi/Ti-HR/wiki/%E5%B0%88%E6%A1%88%E5%8A%9F%E8%83%BD%E8%A9%B3%E8%BF%B0)。
<br>
##### 本專案前端 repo

- https://github.com/PigeonShogi/Ti-HR-Client

##### 前後端專案整合 demo

- https://ti-hr-client.vercel.app/

##### Demo 帳號

- 管理者
  帳號：admin
  密碼：tiadmin
- 一般使用者
  帳號：user
  密碼：titaner

## 重要開發工具

##### 執行環境

- Node.js 18.12.1

##### 框架

- Express 4.18.2

##### SQL

- MySQL2 2.3.3
- sequelize 6.27.0

##### 身份認證、密碼加密

- passport 0.6.0
- jsonwebtoken 8.5.1
- bcryptjs 2.4.3

##### 其他

- cors 2.8.5
- cron 2.1.0
- csv-parse 5.3.3

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

- https://internal-heath-a13.notion.site/API-6e83aeda11ef4d0aac006da57be4ff80

## 資料庫結構

- https://internal-heath-a13.notion.site/e49f5dab021a4a2ab617116e61e89505
