require('dotenv').config()
process.env.TZ = 'Asia/Taipei'

const express = require('express')
const cors = require('cors')
const router = require('./routes/index')

const app = express()
const corsOptions = {
  origin: [
    'https://ti-hr-client.vercel.app',
    'https://ti-hr-client-pigeonshogi.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
}
const PORT = process.env.PORT || 8000
// 引用排程
const job = require('./tools/schedule')

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(router)
// 執行排程
job.start()

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
