const express = require('express')
const router = express.Router()
const employee = require('./modules/employee')

router.use('/api/employees', employee)

module.exports = router
