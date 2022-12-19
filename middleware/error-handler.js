module.exports = {
  apiErrorHandler (err, req, res, next) {
    if (err instanceof Error) {
      res.status(err.status || 500).json({
        status: err.status,
        message: err.message
      })
    } else {
      res.status(500).json({
        status: 500,
        message: err
      })
    }
  }
}
