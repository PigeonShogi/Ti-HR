const express = require('express')
const router = express.Router()
const { addEmployee } = require('../../controllers/employee.controller')

router.put('/password')
router.get('/absences')
router.put('/:employee_id/absence')
router.post('/', addEmployee)

module.exports = router
