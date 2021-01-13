const { User, Follow, Arts, Photo} = require("../../models");
const Joi = require("@hapi/joi");

exports.createFollow = async (req, res) => {
  try {
    const userId = req.user.id;
    const { follower } = req.params;

    await Follow.create({
      userId,
      follower,
    });

    res.send({
      status: "success",
      message: "added successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};


exports.getAllFollow = async (req, res) => {
  try {
    const { id } = req.params;
    const AllFollowData = await Follow.findAll({
      where: {
        userId: id,
      },
      include: [
        {
          model: User,
          as: "following",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },

          include: {
           
            
              model: Photo,
              as: "photo",
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              
            },
          },
        },
      ],

      attributes: {
        exclude: ["follower", "userId", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "successfully loaded",
      data: {
        follow: AllFollowData,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};