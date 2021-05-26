'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsToMany(models.Purchasing, {
        foreignKey: 'item_id',
        as: 'purchased',
        through: {
          model: models.Purchasing_item,
          as: 'purchasing_item',
          unique: false
        }
      })
    }
  };
  Item.init({
    name: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: "Name already in use"
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: {
          args: true,
          msg: "price must be numeric"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};