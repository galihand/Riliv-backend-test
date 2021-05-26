const item = require('../controllers/item')
const authenticationAdmin = require('../middlewares/authenticationAdmin')

const Router = require('express').Router()

Router.post('/', authenticationAdmin, item.create)
Router.put('/:item_id', authenticationAdmin, item.update)
Router.delete('/:item_id', authenticationAdmin, item.destroy)
Router.get('/', item.readAll)
module.exports = Router