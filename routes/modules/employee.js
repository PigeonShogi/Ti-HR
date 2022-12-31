const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  checkIP,
  return2dCode,
  get2dCode,
  postEmployee,
  putPassword
} = require('../../controllers/employee.controller')

router.put('/password', putPassword)
router.get('/absences')
router.put('/:employee_id/absence')
router.get('/:employee_id/2d_code', get2dCode)
// 上一行在產品發布前要改掉
router.post('/2d_code_auth', checkIP, return2dCode)
router.post('/', postEmployee)
router.use('/', apiErrorHandler)

module.exports = router
