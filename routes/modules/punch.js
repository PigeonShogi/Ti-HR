const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const {
  postPunch, twoDCodePunch
} = require('../../controllers/punch.controller')

router.get('/:encrypted_value/', twoDCodePunch)
router.post('/', postPunch)
router.use('/', apiErrorHandler)

module.exports = router
