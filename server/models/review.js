'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Massage)
    }
  }
  Review.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,
        notEmpty: true
      }
    },
    comment: {
      type: DataTypes.TEXT,
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
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};