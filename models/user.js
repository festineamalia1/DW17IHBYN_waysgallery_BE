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
        User.hasMany(models.Best, {
          as: "bestart",
        });
         User.hasMany(models.Arts, {
           as: "art",
         });
        User.hasMany(models.Photo, {
           as: "photo",
         });
           User.hasMany(models.Follow, {
             as: "user",
            // foreignKey: "userId",
            
           });
           User.hasMany(models.Follow, {
             as: "followers",
          //   foreignKey: "follower",
           });
           User.hasMany(models.Hired, {
             as: "orderby",
          //   foreignKey: "orderBy",
           
           });
            User.hasMany(models.Hired, {
              as: "orderto",
            //  foreignKey: "orderTo",
             
            });
    }
  };
  User.init({
    fullName: DataTypes.STRING,
    greeting: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};