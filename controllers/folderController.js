const sequelize = require("../config/db.confg");
const catchAsync = require("../utils/catchAsync");
const Folders = require("../modals/folderModal");

exports.getAllFolders = catchAsync(async (req, res) => {
  const result = await Folders.getFolderTree();
  res.json(result);
});

exports.createFolder = catchAsync(async (req, res) => {
  const { folderName, parentFolder } = req.body;
  const result = await Folders.createFolder(folderName, parentFolder);
  res.json(result);
});

exports.deleteFolder = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await Folders.deleteFolderById(id); 
  res.json(result);
});
