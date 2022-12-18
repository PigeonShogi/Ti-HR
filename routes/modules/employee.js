const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const { postEmployee, signIn } = require('../../controllers/employee.controller')

router.post('/signIn', signIn)
router.put('/password')
router.get('/absences')
router.put('/:employee_id/absence')
router.post('/', postEmployee)
router.use('/', apiErrorHandler)

module.exports = router
