const express = require("express");
const folderController = require("../controllers/folderController");

const router = express.Router();

router
  .route("/")
  .get(folderController.getAllFolders)
  .post(folderController.createFolder);

router.route("/:id").delete(folderController.deleteFolder);

module.exports = router;
