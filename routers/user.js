const user = require('../controllers/user')
const authenticationAdmin = require('../middlewares/authenticationAdmin')
const authenticationUser = require('../middlewares/authenticationUser')

const Router = require('express').Router()

Router.post('/', user.auth)
Router.post('/register', user.create)
Router.get('/', authenticationUser, user.read)
Router.put('/', authenticationUser, user.update)
Router.delete('/:user_id', authenticationAdmin, user.destroy)

module.exports = Router