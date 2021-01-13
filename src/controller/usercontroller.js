const { User, Best, Photo } = require("../../models");
const Joi = require("@hapi/joi");

exports.detailUser = async (req, res) => {
  try {
    const { id } = req.params;
    const detailDataUser = await User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Best,
          as: "bestart",

          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: Photo,
          as: "photo",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Success",
      data: {
        chanels: detailDataUser,
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
}
exports.editUser = async (req, res) => {
   try {
      const schema = Joi.object({
        fullName: Joi.string().min(3),

        greeting: Joi.string(),
      });
      const { error } = schema.validate(req.body);
      if (error)
        return res.status(400).send({
          error: {
            message: error.details[0].message,
          },
        });

         const { id } = req.params;
        
         const editDataUser = await User.update(
           {
             ...req.body,
             avatar: file.filename,
           
           },
           {
             where: {
               id,
             },
           }
         );
           
         if (editDataUser) {
           const result = await User.findOne({
             where: {
               id,
             },
             include: [
               {
                 model: Best,
                 as: "bestart",

                 attributes: {
                   exclude: ["createdAt", "updatedAt"],
                 },
               },
               {
                 model: Photo,
                 as: "photo",
                 attributes: {
                   exclude: ["createdAt", "updatedAt"],
                 },
               },
             ],
             attributes: {
               exclude: ["password", "createdAt", "updatedAt"],
             },
           });
           res.send({
             message: "Success",
             data: {
               chanels: result,
             },
           });
         } else {
           res.status(400).send({
             message: "Error while edit data video",
           });
         }
   } catch (error) {
     
   }
};


