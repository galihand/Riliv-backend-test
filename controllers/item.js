const { Item } = require('../models')

module.exports = {
  create: async (req, res) => {
    const { name, price } = req.body
    try {
      if (!name || !price) throw new Error("name and price are required in body")

      const item = await Item.create({
        name, price
      })

      res.status(201).json({
        status: 'success',
        item
      })
    } catch (err) {
      res.status(422).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  readAll: async (req, res) => {
    try {
      const items = await Item.findAll()
      res.status(200).json({
        status: 'success',
        items
      })
    } catch (err) {
      res.status(500).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  update: async (req, res) => {
    const { name, price } = req.body
    const { item_id } = req.params
    try {
      const item = await Item.findByPk(item_id)
      if (!item) throw new Error("Item not found")

      await item.update({ name, price }, {
        returning: true
      })

      res.status(200).json({
        status: 'success',
        item
      })
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message
      })
    }
  },

  destroy: async (req, res) => {
    const { item_id } = req.params
    try {
      const item = await Item.findByPk(item_id)
      if (!item) throw new Error("Item not found")

      await item.destroy()

      res.status(200).json({
        status: 'success',
        message: 'Item has been delete'
      })
    } catch (err) {
      res.status(400).json({
        status: 'failed',
        message: err.message
      })
    }
  }
}