const multer = require("multer");
const shortid = require("shortid");
const path = require("path");

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(path.dirname(__dirname) ,"uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + "-" + file.originalname);
    },
  })
  exports.upload = multer({storage });