'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Follow.belongsTo(models.User, {
          as: "user",
          foreignKey: {
            name: "userId",
          },
        });

          Follow.belongsTo(models.User, {
            as: "following",
            foreignKey: {
              name: "follower",
            },
          });
    }
  };
  Follow.init({
    userId: DataTypes.INTEGER,
    follower: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Follow',
  });
  return Follow;
};