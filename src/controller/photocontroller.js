const { Arts, Photo, User } = require("../../models");
const Joi = require("@hapi/joi");
const Sequelize = require("sequelize");

exports.addPhoto = async (req,res) =>{
    try {
    

     const { id: userId } = req.user;
    const { ArtId } = req.params;
      
        const { id } = await Photo.create({
          ...req.body,
          image: req.file.filename,
          ArtId,
          userId,
        });
        const result = await Photo.findOne({
          where: {
            id,
            ArtId,
          },
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
            videos: result,
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

exports.allPhoto = async (req,res) =>{
try {
  const result = await Photo.findAll({
    where: {
      createdAt: { lt: Sequelize.fn("NOW") },
    },
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

exports.detailPhoto = async (req,res) =>{
  try {
      const { id } = req.params;
        const result = await Photo.findOne({
          where: {
            id,
          },
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





