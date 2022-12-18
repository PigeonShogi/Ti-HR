const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../../middleware/error-handler')
const { postPunch } = require('../../controllers/punch.controller')

router.post('/', postPunch)
router.use('/', apiErrorHandler)

module.exports = router
