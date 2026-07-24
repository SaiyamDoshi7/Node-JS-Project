const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const { authMiddleware } = require("../middleware/auth");

router.use(authMiddleware);

router.get("/dashboard", taskController.dashboard);

router.get("/", taskController.listTasks);
router.get("/new", taskController.getNewTaskForm);
router.post("/", taskController.createTask);

router.get("/:id/edit", taskController.getEditTaskForm);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
router.patch("/:id/status", taskController.updateStatus);

module.exports = router;
