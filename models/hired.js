'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hired extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Hired.belongsTo(models.User, {
         as: "orderby",
         foreignKey: {
           name: "orderBy",
         },
       });
          Hired.belongsTo(models.User, {
            as: "orderto",
            foreignKey: {
              name: "orderTo",
            },
          });
    }
  };
  Hired.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      price: DataTypes.INTEGER,
      orderBy: DataTypes.INTEGER,
      orderTo: DataTypes.INTEGER,
      status: DataTypes.STRING
    },
    {
      sequelize,
      modelName: "Hired",
    }
  );
  return Hired;
};