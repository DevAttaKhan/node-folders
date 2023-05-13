const multer = require("multer");
const path = require("path");

const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Medias = require("../modals/MediaModel");
const { v4: uuid } = require("uuid");
const { log } = require("console");
const compressAndStore = require("../utils/compressAndStore");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dest;
    if (file.mimetype.includes("image")) {
      dest = path.join(__dirname, "../public/photos");
    } else {
      dest = path.join(__dirname, "../public ");
    }
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const filename = uuid() + path.extname(file.originalname);
    cb(null, filename);
  },
});

exports.upload = multer({ storage: storage });

exports.getAllMedia = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await Medias.getAll(id);
  res.json(result);
});

exports.createMedia = catchAsync(async (req, res) => {
  const { mediaName, folderId } = req.body;

  const { id } = req.user;

  await compressAndStore(req.files);

  const result = await Medias.create(mediaName, folderId, req.files, id);
  res.json(result);
});

exports.moveMedia = catchAsync(async (req, res) => {
  const { mediaId, folderId } = req.body;
  const { id } = req.user;
  const result = await Medias.move(mediaId, folderId, id);
  res.json(result);
});
