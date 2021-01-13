'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photoprojek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
         Photoprojek.belongsTo(models.User, {
           as: "user",
           foreignKey: {
             name: "userId",
           },
         });
          Photoprojek.belongsTo(models.Projek, {
            as: "projek",
            foreignKey: {
              name: "projekId",
            },
          });
    }
  };
  Photoprojek.init({
    photo: DataTypes.STRING,
    projekId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photoprojek',
  });
  return Photoprojek;
};