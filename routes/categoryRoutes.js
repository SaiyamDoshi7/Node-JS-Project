const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { authMiddleware } = require("../middleware/auth");
const roleCheck = require("../middleware/roleMiddleware");

// All category routes require authentication AND admin role
router.use(authMiddleware, roleCheck("admin"));

router.get("/", categoryController.viewCategories);
router.get("/new", categoryController.getAddCategoryForm);
router.post("/", categoryController.createCategory);
router.get("/:id/edit", categoryController.getEditCategoryForm);
router.put("/:id", categoryController.updateCategory);
router.delete("/:id", categoryController.deleteCategory);

module.exports = router;
