const express = require('express')
const router = express.Router()
const employee = require('./modules/employee')

router.use('/api/employees', employee)
router.post('/api/signIn')
router.get('/api/signOut')
router.post('/api/punches')

module.exports = router
