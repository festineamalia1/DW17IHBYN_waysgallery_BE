var multer = require("multer");

exports.uploadImage2 = (fileName) => {
  var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });

  const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = {
        message: "Only PDF files are allowed!",
      };
      return cb(new Error("Only PDF files are allowed!"), false);
    }
    cb(null, true);
  };

  const maxSize = 100 * 1000 * 1000;

  const doUpload = multer({
    storage,
    fileFilter: imageFilter,
    limits: {
      fileSize: maxSize,
    },
  }).array(fileName);

  return (req, res, next) => {
    doUpload(req, res, (err) => {
      if (req.fileValidationError) {
        const message = req.fileValidationError.message;
        return res.send({
          status: "error",
          error: {
            message,
          },
        });
      }

      if (!req.files && !err) {
        return res.send({
          status: "error",
          message: "Please select file to upload",
        });
      }

      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.send({
            status: "error",
            message: "Max file sized 10MB",
          });
        }
        return res.send({
          status: "error",
          message: err,
        });
      }

      return next();
    });
  };
};
