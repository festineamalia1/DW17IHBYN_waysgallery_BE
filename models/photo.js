'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Photo.belongsTo(models.User, {
   as: "user",
   foreignKey: {
     name: "userId",
   },
 });
       Photo.belongsTo(models.Arts, {
         as: "arts",
         foreignKey: {
           name: "ArtId",
         },
       });
    }
    
    
  };
  Photo.init({
    image: DataTypes.STRING,
    ArtId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
  });
  return Photo;
};