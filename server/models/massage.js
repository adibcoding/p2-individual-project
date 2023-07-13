'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Massage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Order)
      this.belongsToMany(models.User, {through: models.Order})
      this.hasMany(models.Review)
    }
  }
  Massage.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    }
  }, {
    sequelize,
    modelName: 'Massage',
  });
  return Massage;
};