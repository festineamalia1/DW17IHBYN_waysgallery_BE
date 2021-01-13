const { User, Arts, Photo } = require("../../models");
const Joi = require("@hapi/joi");
const Sequelize = require("sequelize");
exports.allArt = async (req, res) => {
  try {
    const allArtData = await Arts.findAll({
     
      include: [
        {
          model: User,
          as: "users",
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
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      message: "Success",
      data: {
        videos: allArtData,
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

exports.detailArt = async (req, res) => {
  try {
     const { id } = req.params;
    const detailArtData = await Arts.findOne({
      where: {
        id,
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
          model: Photo,
          as: "photo",
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
        videos: detailArtData,
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



exports.addArt = async (req, res) => {
   try {
     const { id: userId } = req.user;
      const { files } = req;
 const schema = Joi.object({
   title: Joi.string().min(3),

   description: Joi.string(),
 });
 const { error } = schema.validate(req.body);
 if (error)
   return res.status(400).send({
     error: {
       message: error.details[0].message,
     },
   });
     const result = await Arts.create({
       ...req.body,
       userId,
       
     });
 files.forEach(file => {
       Photo.create({
        ...req.body,
        image: file.filename,
       
        ArtId: result.id,
        userId,
      });
       });
    
    
   /*  const result = await Arts.findOne({
       where: {
         id,
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
           model: Photo,
           as: "photo",
           attributes: {
             exclude: ["createdAt", "updatedAt"],
           },
         },
       ],

       attributes: {
         exclude: ["createdAt", "updatedAt"],
       },
     }); */

     res.send({
       message: "success",
       data: {
         art: result,
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


