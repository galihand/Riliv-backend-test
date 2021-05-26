const { Admin } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const admin = {
  create: (req, res) => {

  },

  auth: async (req, res) => {
    const { email, pass } = req.body

    try {
      if (!email || !pass) throw new Error("email and pass are required in body")

      const admin = await Admin.findOne({
        where: {
          email
        }
      })
      if (!admin) throw new Error("Incorrect email address")

      let checkPassword = bcrypt.compareSync(pass, admin.password)
      if (!checkPassword) throw new Error("Incorrenct password")
      const { password, ...result } = admin.dataValues
      const token = jwt.sign(result, process.env.SECRET_KEY)

      res.status(200).json({
        status: 'success',
        admin: result, token
      })
    } catch (err) {
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  }
}

module.exports = admin