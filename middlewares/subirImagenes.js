const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png|gif/;
  const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && ext) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imagenes"), false);
  }
};

const uploads = multer({
  storage,
  fileFilter,
  limits: { fileSize: 14 * 1024 * 1024 },
});

module.exports = uploads;
