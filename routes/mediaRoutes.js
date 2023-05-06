const express = require("express");
const mediaController = require("../controllers/mediaController");

const router = express.Router();

router.route("/").get(mediaController.getAllMedia).post(mediaController.createMedia);

router.route("/move").post(mediaController.moveMedia);

module.exports = router;
