'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Massage)

    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    MassageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    newPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};