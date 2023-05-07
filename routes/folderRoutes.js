const express = require("express");
const folderController = require("../controllers/folderController");
const authController = require("../controllers/authController");


const router = express.Router();

router
  .route("/")
  .get(authController.protect,folderController.getAllFolders)
  .post(authController.protect,folderController.createFolder);

router.route("/:id").delete(authController.protect,folderController.deleteFolder);

module.exports = router;
