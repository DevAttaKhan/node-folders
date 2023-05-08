const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Folders = require("../modals/folderModel");

exports.getAllFolders = catchAsync(async (req, res) => {
  const { id } = req.user;
  const result = await Folders.getFolderTree(id);
  res.json(result);
});

exports.createFolder = catchAsync(async (req, res) => {
  const { folderName, parentFolder } = req.body;
  console.log('>>>>>',req.body)
  const { id } = req.user;

  const result = await Folders.createFolder(folderName, parentFolder, id);
  res.json(result);
});

exports.deleteFolder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { id: userId } = req.user;
  const result = await Folders.deleteFolderById(id,  userId);
  res.json(result);
});
