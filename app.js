require('dotenv').config()

const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const server = require('http').createServer()

const app = express()
const corsOptions = {
  origin: [
    'https://ti-hr-client.vercel.app',
    'https://ti-hr-client-pigeonshogi.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200
}
const io = require('socket.io')(server, {
  cors: {
    origin: [
      'https://ti-hr-client.vercel.app',
      'https://ti-hr-client-pigeonshogi.vercel.app',
      'http://localhost:5173',
      'http://localhost:5174'
    ],
    methods: ['GET', 'POST']
  }
})
const PORT = process.env.PORT || 8000
const PORT_IO = process.env.PORT_IO || 3030
// 引用排程
const job = require('./tools/schedule')

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(router)
// 執行排程
job.start()

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}...`)
})

server.listen(PORT_IO, () => {
  console.info(`Listening on port ${PORT_IO} (socket.io)`)
})

io.on('connection', (socket) => {
  console.info(`A user connected. ID: ${socket.id}`)
})
