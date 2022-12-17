const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: '成功建立新員工資料'
  })
})

module.exports = router
