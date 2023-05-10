const express = require("express");
const mediaController = require("../controllers/mediaController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, mediaController.getAllMedia)
  .post(
    authController.protect,
    mediaController.upload.array('file', 200),
    mediaController.createMedia
  );

router.route("/move").post(authController.protect, mediaController.moveMedia);

module.exports = router;
