const { User } = require("../../models");
const bycript = require("bcrypt");
const jwt = require("jsonwebtoken");
const joi = require("@hapi/joi");
const Key = process.env.KEY;
exports.checkAuth = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    res.send({
      message: "User Valid",
      data: {
        user,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      error: {
        message: "Server ERROR",
      },
    });
  }
};
exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const cek = joi.object({
      fullName: joi.string().min(3).required(),
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
     
    });

    const { error } = cek.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const cekMail = await User.findOne({
      where: {
        email,
      },
    });

    if (cekMail) {
      return res.status(400).send({
        error: {
          message: "Email already been existed",
        },
      });
    }

    const hashPassword = await bycript.hash(password, 10);

    const user = await User.create({
      fullName,
      email,
      password: hashPassword,
     
    });

    

    const token = jwt.sign(
      {
        id: user.id,
      },
      Key
    );

    res.send({
      message: "You has been registered",
      data: {
        email: user.email,
        fullName,
        token,
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

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const cek = joi.object({
      email: joi.string().email().min(10).required(),
      password: joi.string().min(8).required(),
    });

    const { error } = cek.validate(req.body);

    if (error) {
      return res.status(400).send({
        error: {
          message: error.details[0].message,
        },
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid || Email not existed",
        },
      });
    }

    const validPassword = await bycript.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).send({
        error: {
          message: "Email or password invalid || password invalid",
        },
      });
    }
   
    const token = jwt.sign(
      {
        id: user.id,
      },
      Key
    );

    res.send({
      message: "Login Success",
      data: {
        email: user.email,
        fullname: user.fullname,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
