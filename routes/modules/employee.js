const express = require('express')
const router = express.Router()
const { postEmployee } = require('../../controllers/employee.controller')

router.put('/password')
router.get('/absences')
router.put('/:employee_id/absence')
router.post('/', postEmployee)

module.exports = router
