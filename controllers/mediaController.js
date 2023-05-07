const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Medias = require("../modals/MediaModel");

exports.getAllMedia = catchAsync(async (req, res) => {
  const { id } = req.user;

  const result = await Medias.getAll(id);
  res.json(result);
});

exports.createMedia = catchAsync(async (req, res) => {
  const { mediaName, folderId } = req.body;
  const { id } = req.user;

  const result = await Medias.create(mediaName, folderId, id);
  res.json(result);
});

exports.moveMedia = catchAsync(async (req, res) => {
  const { mediaId, folderId } = req.body;
  const { id } = req.user;
  const result = await Medias.move(mediaId, folderId,id);
  res.json(result);
});
