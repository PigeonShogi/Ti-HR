const express = require('express')
const router = express.Router()
const employee = require('./modules/employee')
const { signIn } = require('../controllers/index.controller')
const punch = require('./modules/punch')
const authenticated = require('../middleware/auth')
const { apiErrorHandler } = require('../middleware/error-handler')

router.post('/api/signIn', signIn)
router.get('/api/signOut')
router.use('/api/employees', authenticated, employee)
router.use('/api/punches', authenticated, punch)
router.use('/', apiErrorHandler)

module.exports = router
