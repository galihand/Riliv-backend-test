const { User, Admin } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    let user = await User.findByPk(payload.id, {
      attributes: {
        exclude: 'password'
      }
    })

    if (!user) user = await Admin.findByPk(payload.id, {
      attributes: {
        exclude: 'password'
      }
    })

    if (!user) throw new Error("Unauthorized")

    req.payload = user
    next()
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: err.message
    })
  }
}
