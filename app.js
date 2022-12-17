const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const router = require('./routes/index')

app.use(router)

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})
