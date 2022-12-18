const express = require('express')
const router = express.Router()
const employee = require('./modules/employee')
const punch = require('./modules/punch')

router.use('/api/employees', employee)
router.get('/api/signOut')
router.use('/api/punches', punch)

module.exports = router
