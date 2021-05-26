const { Op } = require('sequelize')
const { Purchasing, Item, Purchasing_item, sequelize, User } = require('../models')
const item = require('../models/item')

module.exports = {
  create: async (req, res) => {
    const { items } = req.body
    const date = new Date()
    const trans = await sequelize.transaction()
    try {
      if (!items || items instanceof Array === false) throw new Error("items is required in body and must be array of object")
      const items_id = items.map(item => {
        if (item instanceof Object === false) throw new Error("items must be array of object")
        if (!item.quantity || isNaN(item.quantity)) throw new Error("quantity is required inside every object inside items and must be numeric")
        if (!item.item_id) throw new Error("items_id is required inside each object inside items")
        return item.item_id
      })

      let item_collection = await Item.findAll({
        where: {
          id: items_id
        }
      })
      if (items_id.length !== item_collection.length) throw new Error("Some of item is not found")

      const purchasing = await Purchasing.create({
        user_id: req.payload.id,
        transaction_code: `PRC-${date.getFullYear()}${date.getMonth()}${date.getDate()}${date.getHours()}${date.getMinutes()}${req.payload.id}`,
        payment_code: Math.floor(Math.random() * 500) + 1,
        total_price: item_collection.reduce((acc, item) => acc + item.price, 0),
        paid: false,
        completed: false
      }, {
        transaction: trans
      })

      await Purchasing_item.bulkCreate(items.map(item => ({
        ...item, purchasing_id: purchasing.id
      })), { transaction: trans })

      trans.commit()
      res.status(201).json({
        status: 'success',
        purchasing
      })
    } catch (err) {
      trans.rollback()
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readOne: async (req, res) => {
    const { purchasing_id } = req.params
    try {
      let purchasing = await Purchasing.findByPk(purchasing_id, {
        include: [{
          model: Item,
          as: 'items',
          attributes: ['id', 'name'],
          through: {
            as: 'purchasing_item',
            attributes: ['quantity']
          }
        }, {
          model: User,
          as: 'user',
          attributes: ['id', 'email', 'fullname']
        }],
        attributes: { exclude: ['user_id'] }
      })
      if (!purchasing) throw new Error("Purchasing not found")
      purchasing = purchasing.get({ plain: true })

      res.status(201).json({
        status: 'success',
        purchasing: {
          ...purchasing,
          items: purchasing.items.map(item => ({
            ...item,
            purchasing_item: item.purchasing_item.quantity
          }))
        }
      })
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readAll: async (req, res) => {
    const { paid, completed, trans_code } = req.query
    try {
      let purchasings
      if (paid && completed) purchasings = await Purchasing.findAll({ where: [{ paid }, { completed }] })
      else if (paid && !completed) purchasings = await Purchasing.findAll({ where: { paid } })
      else if (!paid && completed) purchasings = await Purchasing.findAll({ where: { completed } })
      else if (trans_code) purchasings = await Purchasing.findAll({ where: { transaction_code: trans_code } })
      else purchasings = await Purchasing.findAll()

      res.status(200).json({
        status: 'success',
        purchasings
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  paid: async (req, res) => {
    const { purchasing_id } = req.params
    try {
      let purchasing = await Purchasing.findByPk(purchasing_id, {
        include: {
          model: Item,
          as: 'items',
          attributes: ['id', 'name'],
          through: {
            as: 'purchasing_item',
            attributes: ['quantity']
          }
        }
      })
      if (!purchasing) throw new Error("Purchasing not found")

      purchasing.update({ paid: true }, {
        returning: true
      })
      purchasing = purchasing.get({ plain: true })

      res.status(200).json({
        status: 'success',
        purchasing: {
          ...purchasing,
          items: purchasing.items.map(item => ({
            ...item,
            purchasing_item: item.purchasing_item.quantity
          }))
        }
      })
    } catch (err) {
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  completed: async (req, res) => {
    const { purchasing_id } = req.params
    try {
      let purchasing = await Purchasing.findByPk(purchasing_id, {
        include: {
          model: Item,
          as: 'items',
          attributes: ['id', 'name'],
          through: {
            as: 'purchasing_item',
            attributes: ['quantity']
          }
        }
      })
      if (!purchasing) throw new Error("Purchasing not found")
      if (!purchasing.paid) throw new Error("Payment for this purchasing isn't confirmed yet")

      purchasing.update({ completed: true }, {
        returning: true
      })
      purchasing = purchasing.get({ plain: true })

      res.status(200).json({
        status: 'success',
        purchasing: {
          ...purchasing,
          items: purchasing.items.map(item => ({
            ...item,
            purchasing_item: item.purchasing_item.quantity
          }))
        }
      })
    } catch (err) {
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readHistory: async (req, res) => {
    const { paid, completed } = req.query
    const user_id = req.payload.id
    try {
      let purchasings
      if (paid && completed) purchasings = await Purchasing.findAll({ where: [{ paid }, { completed }, { user_id }] })
      else if (paid && !completed) purchasings = await Purchasing.findAll({ where: [{ paid }, { user_id }] })
      else if (!paid && completed) purchasings = await Purchasing.findAll({ where: [{ completed }, { user_id }] })
      else purchasings = await Purchasing.findAll({ where: { user_id } })

      res.status(200).json({
        status: 'success',
        purchasings
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  }
}