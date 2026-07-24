const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { authMiddleware } = require("../middleware/auth");
const roleCheck = require("../middleware/roleMiddleware");

router.use(authMiddleware, roleCheck("admin"));

router.get("/", userController.listUsers);

module.exports = router;
