'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Projek.belongsTo(models.User, {
         as: "users",
         foreignKey: {
           name: "userId",
         },
       });
       Projek.belongsTo(models.Hired, {
         as: "hired",
         foreignKey: {
           name: "hiredId",
         },
       });
        Projek.hasMany(models.Photoprojek, {
          as: "photos",
        });
    }
  };
  Projek.init({
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Projek',
  });
  return Projek;
};