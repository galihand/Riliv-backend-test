'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Purchasing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Purchasing.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      })

      Purchasing.belongsToMany(models.Item, {
        foreignKey: 'purchasing_id',
        as: 'items',
        through: {
          model: models.Purchasing_item,
          as: 'purchasing_item',
          unique: false
        }
      })
    }
  };
  Purchasing.init({
    user_id: DataTypes.INTEGER,
    transaction_code: DataTypes.STRING,
    payment_code: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    paid: DataTypes.BOOLEAN,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Purchasing',
  });
  return Purchasing;
};