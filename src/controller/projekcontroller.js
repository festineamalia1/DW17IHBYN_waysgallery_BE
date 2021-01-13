const { User, Projek, Photoprojek, Hired } = require("../../models");
const Joi = require("@hapi/joi");

exports.addProjek = async (req, res) => {
  try {
    const { id:userId } = req.user;
    const { hiredId } = req.params;
     const { files } = req;
    const schema = Joi.object({
      description: Joi.string().required(),
    });
    const { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    const result = await Projek.create({
      ...req.body,
      userId,
      hiredId,
    });
    files.forEach((file) => {
      Photoprojek.create({
        ...req.body,
        photo: file.filename,

        projekId: result.id,
        userId,
      });
    }); 

    res.send({
      message: "success",
      data: {
        projek: result,
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

exports.detailProjek = async (req, res) => {
  try {
    const { hiredId } = req.params;
    const detailProjekData = await Projek.findOne({
      where: {
        hiredId,
      },
      include: [
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },

        {
          model: Hired,
          as: "hired",
          attributes: {
            exclude: ["UserId", "createdAt", "updatedAt"],
          },
        },

        {
          model: Photoprojek,
          as: "photos",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],

      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Success",
      data: {
        projek: detailProjekData,
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
