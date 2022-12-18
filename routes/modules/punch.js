const express = require('express')
const router = express.Router()
const { postPunch } = require('../../controllers/punch.controller')

router.post('/', postPunch)

module.exports = router
