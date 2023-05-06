const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Medias = require("../modals/MediaModal");

exports.getAllMedia = catchAsync(async (req, res) => {
  const result = await Medias.getAll();
  res.json(result);
});

exports.createMedia = catchAsync(async (req, res) => {
  const { mediaName, folderId } = req.body;
  const result = await Medias.create(mediaName, folderId);
  res.json(result);
});

exports.moveMedia = catchAsync(async (req, res) => {
  const { mediaId, folderId } = req.body;
   const result = await Medias.move(mediaId, folderId);
  res.json(result);
});
