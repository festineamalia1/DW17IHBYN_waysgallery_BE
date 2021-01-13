const { User, Best } = require("../../models");
const Joi = require("@hapi/joi");



exports.addBestart = async (req, res) => {
  try {
    
  const { id: userId } = req.user;
   
   

    const { id } = await Best.create({
      ...req.body,
      art: req.file.filename,
      userId,
     
    });
    const result = await Best.findOne({
      where: {
        id,
      },
      include: 
        {
          model: User,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
       
       attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.send({
      message: "success",
      data: {
        bestart: result,
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

exports.detailBestart = async (req, res) => {
  try {
     const { id } = req.params;
      const result = await Best.findOne({
        where: {
          id,
        },
        include: {
          model: User,
          as: "users",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },

        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      res.send({
        message: "success",
        data: {
          bestart: result,
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
