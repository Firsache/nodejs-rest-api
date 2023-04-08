const multer = require("multer");
const { resolve } = require("path");
const createError = require("http-errors");

const tempDir = resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
  fileFilter: function fileFilter(req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true);
    } else {
      cb(createError(400, "Wrong format"));
    }
  },
  limits: {
    fieldNameSize: 100,
    fileSize: 5000000,
  },
});

module.exports = upload;
