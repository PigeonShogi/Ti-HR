const { Employee } = require('../models')
const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
}

passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
  try {
    const user = await Employee.findOne({
      where: { code: jwtPayload.code },
      // 以下是 JWT 不需夾帶的訊息
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      raw: true
    })
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
}))

module.exports = passport
