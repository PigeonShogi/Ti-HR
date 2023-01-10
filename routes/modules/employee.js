const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  checkIP,
  return2dCode,
  getEmployees,
  postEmployee,
  putPassword,
  putTypoCount
} = require('../../controllers/employee.controller')

router.put('/password', putPassword)
router.put('/typo_count', putTypoCount)
router.post('/2d_code_auth', checkIP, return2dCode)
router.get('/', getEmployees)
router.post('/', postEmployee)
router.use('/', apiErrorHandler)

module.exports = router
