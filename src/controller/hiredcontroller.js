const { User, Hired } = require("../../models");
const Joi = require("@hapi/joi");

exports.createHired = async (req, res) => {
  try {
    const orderBy = req.user.id;
    const { orderTo } = req.params;

    const hiredCreated = await Hired.create({
      ...req.body,
      orderBy,
      orderTo,
    });

    res.send({
      message: "has succesfully created",
      data: {
        Literatur: hiredCreated,
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

exports.editHired = async (req, res) => {
  try {
    const { id } = req.params;
     const orderTo = req.user.id;
    const editData = await Hired.update(
      {
        ...req.body,
        id,
        orderTo,
      },
      {
        where: {
          id,
        },
      }
    );

    
      res.send({
        message: ` has been successfully edited`,
        data: {
          hired: editData,
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

exports.allOffer = async (req, res) => {
  try {
  const { orderTo } = req.params;
    const allOfferData = await Hired.findAll({
      where: {
        orderTo,
      },
      include: {
        model: User,
        as: "orderby",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });
    res.send({
      message: "Success",
      data: {
        hired: allOfferData,
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

exports.allOrder = async (req, res) => {
  try {
    const { orderBy } = req.params;
    const allOfferData = await Hired.findAll({
      where: {
        orderBy,
      },
      include: {
        model: User,
        as: "orderto",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "UserId"],
      },
    });
    res.send({
      message: "Success",
      data: {
        hired: allOfferData,
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

