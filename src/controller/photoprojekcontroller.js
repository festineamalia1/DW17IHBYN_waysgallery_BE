const { User, Projek, Photoprojek } = require("../../models");
const Joi = require("@hapi/joi");

exports.addPhotoprojek = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { projekId } = req.params;

    const { id } = await Photoprojek.create({
      ...req.body,
      photo: req.file.filename,
      projekId,
      userId,
    });
    const result = await Photoprojek.findOne({
      where: {
        id,
        projekId,
      },
      include: [
        {
          model: Projek,
          as: "projek",
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
        photoprojek: result,
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

