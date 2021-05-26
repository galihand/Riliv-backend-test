const { Op } = require('sequelize')
const { Item, Purchasing, User } = require('../models')

module.exports = {
  readSalesItem: async (req, res) => {
    try {
      const { desc } = req.query
      let items = await Item.findAll({
        include: {
          model: Purchasing,
          as: 'purchased',
          attributes: ['id'],
          where: { completed: true },
          through: {
            as: 'purchasing_item',
            attributes: ['quantity']
          }
        }
      })
      items = items.map(item => {
        item = item.get({ plain: true })
        item = {
          ...item,
          sold: item.purchased.reduce((acc, curr) => acc + curr.purchasing_item.quantity, 0),
          number_of_transaction: item.purchased.length
        }
        const { purchased, ...result } = item
        return result
      })
      res.status(200).json({
        status: 'success',
        items: items.sort((a, b) => desc ? b.sold - a.sold : a.sold - b.sold)
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readUserPurchase: async (req, res) => {
    const { desc } = req.params
    try {
      let users = await User.findAll({
        attributes: { exclude: ['password'] },
        include: {
          model: Purchasing,
          as: 'purchases',
          where: { completed: true }
        }
      })

      users = users.map(user => {
        user = user.get({ plain: true })
        user = {
          ...user,
          number_of_transactions: user.purchases.length,
          total_transactions: user.purchases.reduce((acc, curr) => acc + curr.total_price, 0)
        }
        const { purchases, ...result } = user
        return result
      })

      res.status(200).json({
        status: 'success',
        users
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readIncome: async (req, res) => {
    const { start_date, end_date } = req.query
    try {
      let income
      if (start_date && end_date) income = await Purchasing.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(start_date), new Date(end_date).setHours(23, 59)]
          }
        }
      })
      else if (start_date && !end_date) income = await Purchasing.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(start_date), new Date().setHours(23, 59)]
          }
        }
      })
      else if (!start_date && end_date) income = await Purchasing.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date().setHours(00, 00), new Date(end_date).setHours(23, 59)]
          }
        }
      })
      else income = await Purchasing.findAll()
      res.status(200).json({
        status: 'success',
        income: {
          number_of_transaction: income.length,
          total_transactions: income.reduce((acc, curr) => acc + curr.total_price, 0)
        }
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  }
}