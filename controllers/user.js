const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  create: async (req, res) => {
    const { email, fullname, pass } = req.body
    try {
      if (!email || !fullname || !pass) throw new Error("emai, fullname, and pass are required in body")
      const user = await User.create({ email, fullname, password: bcrypt.hashSync(pass, 10) })
      const { password, ...result } = user.dataValues
      const token = jwt.sign(result, process.env.SECRET_KEY)
      res.status(201).json({
        status: 'success',
        user: result, token
      })
    } catch (error) {
      res.status(422).json({
        status: 'failed',
        message: error.message
      })
    }
  },
  read: async (req, res) => { },
  update: async (req, res) => { },
  destroy: async (req, res) => { },
  auth: async (req, res) => {
    const { email, pass } = req.body
    try {
      if (!email || !pass) throw new Error("email and pass are required in body")

      const user = await User.findOne({
        where: { email }
      })
      if (!user) throw new Error("Incorrect email address")

      let checkPassword = bcrypt.compareSync(pass, user.password)
      if (!checkPassword) throw new Error("Incorrect password")
      const { password, ...result } = user.dataValues
      const token = jwt.sign(result, process.env.SECRET_KEY)

      res.status(200).json({
        status: 'success',
        user: result, token
      })
    } catch (err) {
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  }
}