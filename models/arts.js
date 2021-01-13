'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Arts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Arts.belongsTo(models.User, {
         as: "users",
         foreignKey: {
           name: "userId",
         },
       });
         Arts.hasMany(models.Photo, {
           as: "photo",
         });
    }
  };
  
  Arts.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Arts',
  });
  return Arts;
};