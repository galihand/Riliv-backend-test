const purchasing = require('../controllers/purchasing')
const authenticationAdmin = require('../middlewares/authenticationAdmin')
const authenticationUser = require('../middlewares/authenticationUser')
const Router = require('express').Router()

Router.post('/', authenticationUser, purchasing.create)
Router.get('/history', authenticationUser, purchasing.readHistory)
Router.get('/:purchasing_id', authenticationUser, purchasing.readOne)
Router.put('/:purchasing_id/paid', authenticationAdmin, purchasing.paid)
Router.put('/:purchasing_id/completed', authenticationAdmin, purchasing.completed)
Router.get('/', authenticationAdmin, purchasing.readAll)
module.exports = Router