require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = {
  transporter: nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
    }
  }),
  // mailOptions
  dailyReport: {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_ONE,
    subject: '每日缺勤人數通知',
    text: ''
  },
  // mailOptions
  accountLocked: {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_ONE,
    subject: '帳號上鎖通知',
    text: '有員工登入考勤系統時密碼輸入錯誤五次。詳情請在人資專區確認，謝謝。'
  }
}
