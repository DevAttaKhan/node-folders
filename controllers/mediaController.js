const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Medias = require("../modals/MediaModal");

exports.getAllMedia = catchAsync(async (req, res) => {
  const result = await Medias.getAll();
  res.json(result);
});

exports.createMedia = catchAsync(async (req, res) => {
  const { bookName, folderId } = req.body;
  const result = await Medias.create(bookName, folderId);
  res.json(result);
});

exports.moveMedia = catchAsync(async (req, res) => {
  const { bookId, folderId } = req.body;
   const result = await Medias.move(bookId, folderId);
  res.json(result);
});
