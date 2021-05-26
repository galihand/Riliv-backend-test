const Router = require('express').Router()
const admin = require('../controllers/admin')

Router.post('/', admin.auth)

module.exports = Router