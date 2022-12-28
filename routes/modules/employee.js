const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  get2dCode,
  postEmployee,
  putPassword
} = require('../../controllers/employee.controller')

router.put('/password', putPassword)
router.get('/absences')
router.put('/:employee_id/absence')
router.get('/:employee_id/2d_code', get2dCode)
router.post('/', postEmployee)
router.use('/', apiErrorHandler)

module.exports = router
