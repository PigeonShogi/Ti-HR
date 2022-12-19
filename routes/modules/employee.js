const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const authenticated = require('../../middleware/auth')
const { postEmployee, signIn } = require('../../controllers/employee.controller')

router.post('/signIn', signIn)
router.put('/password')
router.get('/absences')
router.put('/:employee_id/absence')
router.post('/', authenticated, postEmployee)
router.use('/', apiErrorHandler)

module.exports = router
