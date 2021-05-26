const { Admin } = require('../models')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    const admin = await Admin.findByPk(payload.id, {
      attributes: {
        exclude: 'password'
      }
    })

    if (!admin) throw new Error("Unauthorized")
    req.payload = admin
    next()
  } catch (err) {
    res.status(401).json({
      status: 'failed',
      message: err.message
    })
  }
}
