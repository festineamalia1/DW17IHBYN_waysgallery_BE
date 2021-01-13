const { Arts, Photo, User } = require("../../models");
const Joi = require("@hapi/joi");
const Sequelize = require("sequelize");



exports.allPhoto2 = async (req,res) =>{
try {
  const result = await Photo.findAll({
  
    include: [
      {
        model: Arts,
        as: "arts",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    ],
    attributes: {
      exclude: ["chanelId", "ChanelId", "createdAt", "updatedAt"],
    },
  });

  res.send({
    message: "success",
    data: {
      photos: result,
    },
  });
} catch (error) {
   console.log(error);
   res.status(500).send({
     error: {
       message: "Server Error",
     },
   });
}
};







