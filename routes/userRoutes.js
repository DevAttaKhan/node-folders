const express = require("express");
const authConroller = require("../controllers/authController");

const router = express.Router();

router.route("/sign-up").post(authConroller.createUser);

router.route("/login").post( authConroller.login);

module.exports = router;
