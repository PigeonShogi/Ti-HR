const passport = require('../config/passport')

const authenticated = (req, res, next) => {
  passport.authenticate('jwt', { session: false },
    (err, user) => {
      if (err || !user) {
        const err = new Error('請先登入系統')
        err.status = 401
        next(err)
      }
      req.user = user
      next()
    })(req, res, next)
}

module.exports = authenticated
