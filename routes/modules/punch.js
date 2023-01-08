const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  getMyPunches,
  getPunches,
  postPunch,
  putState,
  twoDCodePunch
} = require('../../controllers/punch.controller')

router.get('/:employeeCode/my_punches', getMyPunches)
router.get('/:encrypted_value/', twoDCodePunch, postPunch)
router.put('/:punch_id/state', putState)
router.get('/', getPunches)
router.post('/', postPunch)
router.use('/', apiErrorHandler)

module.exports = router
