const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const { optionalAuth } = require("../middleware/auth");

router.get("/register", optionalAuth, authController.getRegister);
router.post("/register", authController.postRegister);

router.get("/login", optionalAuth, authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/logout", authController.logout);

module.exports = router;
