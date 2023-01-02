const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  getPunches,
  postPunch,
  twoDCodePunch
} = require('../../controllers/punch.controller')

router.get('/:encrypted_value/', twoDCodePunch, postPunch)
router.get('/', getPunches)
router.post('/', postPunch)
router.use('/', apiErrorHandler)

module.exports = router
