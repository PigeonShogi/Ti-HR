// 檢驗伺服器時區
const mailer = require('./mailer')
const CronJob = require('cron').CronJob
const job2 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 2 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 2 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job4 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 4 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 4 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job6 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 6 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 6 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job8 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 8 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 8 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job10 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 10 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 10 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job12 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 12 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 12 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job14 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 14 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 14 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job16 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 16 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 16 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job18 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 18 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 18 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job20 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 20 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 20 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job22 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 22 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 22 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)

const job0 = new CronJob(
  // 秒 分 時 日 月 星期
  '* * 0 * * *',
  async function () {
    const scheduleStartTime = new Date()
    mailer.dailyReport.text = `cron 設定為 '* * 0 * * *' 實際排程開始於${scheduleStartTime}。相當於 UTC 的 ${new Date()}`
    // 發出系統信
    mailer.transporter
      .sendMail(mailer.dailyReport)
      .then((info) => {
        console.info({ info })
      })
      .catch((err) => {
        console.error(err)
      })
    console.info()
  },
  null,
  true,
  'Asia/Taipei'
)
// 將排程輸出，讓 app.js 使用。
module.exports = {
  job2,
  job4,
  job6,
  job8,
  job10,
  job12,
  job14,
  job16,
  job18,
  job20,
  job22,
  job0
}
