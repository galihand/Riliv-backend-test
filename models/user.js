'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Purchasing, {
        foreignKey: 'user_id',
        as: 'purchases'
      })
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Incorrect email format"
        }
      },
      unique: {
        args: true,
        msg: "Email already registered"
      }
    },
    password: DataTypes.TEXT,
    fullname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};