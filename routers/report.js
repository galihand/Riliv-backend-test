const report = require('../controllers/report')
const authenticationAdmin = require('../middlewares/authenticationAdmin')
const Router = require('express').Router()

Router.get('/sales-item', authenticationAdmin, report.readSalesItem)
Router.get('/user-purchases', authenticationAdmin, report.readUserPurchase)
Router.get('/income', authenticationAdmin, report.readIncome)


module.exports = Router