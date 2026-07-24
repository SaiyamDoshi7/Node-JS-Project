const Task = require("../models/Task");
const Category = require("../models/Category");
const User = require("../models/User");

exports.dashboard = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const baseFilter = isAdmin ? {} : { user: req.user._id };

    const [total, pending, inProgress, completed, recentTasks] = await Promise.all([
      Task.countDocuments(baseFilter),
      Task.countDocuments({ ...baseFilter, status: "Pending" }),
      Task.countDocuments({ ...baseFilter, status: "In Progress" }),
      Task.countDocuments({ ...baseFilter, status: "Completed" }),
      Task.find(baseFilter)
        .populate("user", "name email")
        .populate("category", "categoryName")
        .sort({ createdAt: -1 })
        .limit(5),
    ]);

    res.render("dashboard", {
      title: "Dashboard",
      stats: { total, pending, inProgress, completed },
      recentTasks,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load dashboard");
    res.redirect("/");
  }
};

exports.listTasks = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";
    const page = parseInt(req.query.page) || 1;
    const limit = 6;
    const skip = (page - 1) * limit;
    const search = req.query.q ? req.query.q.trim() : "";
    const statusFilter = req.query.status || "";

    const filter = isAdmin ? {} : { user: req.user._id };

    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }
    if (statusFilter) {
      filter.status = statusFilter;
    }

    const [tasks, totalTasks, categories] = await Promise.all([
      Task.find(filter)
        .populate("user", "name email")
        .populate("category", "categoryName")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Task.countDocuments(filter),
      Category.find(),
    ]);

    const totalPages = Math.ceil(totalTasks / limit);

    res.render("task/taskList", {
      title: isAdmin ? "All Tasks" : "My Tasks",
      tasks,
      categories,
      currentPage: page,
      totalPages,
      search,
      statusFilter,
      isAdmin,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load tasks");
    res.redirect("/tasks/dashboard");
  }
};

exports.getNewTaskForm = async (req, res) => {
  try {
    const categories = await Category.find();
    const users = req.user.role === "admin" ? await User.find().select("name email") : [];
    res.render("task/taskForm", {
      title: "Add Task",
      task: null,
      categories,
      users,
      formAction: "/tasks",
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load task form");
    res.redirect("/tasks");
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, category, assignedUser } = req.body;

    if (!title) {
      req.flash("error", "Task title is required");
      return res.redirect("/tasks/new");
    }

    const ownerId = req.user.role === "admin" && assignedUser ? assignedUser : req.user._id;

    await Task.create({
      title,
      description,
      status: status || "Pending",
      priority: priority || "Medium",
      dueDate: dueDate || null,
      category: category || null,
      user: ownerId,
    });

    req.flash("success", "Task created successfully");
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not create task");
    res.redirect("/tasks/new");
  }
};

exports.getEditTaskForm = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash("error", "Task not found");
      return res.redirect("/tasks");
    }

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      req.flash("error", "You do not have permission to edit this task");
      return res.redirect("/tasks");
    }

    const categories = await Category.find();
    const users = req.user.role === "admin" ? await User.find().select("name email") : [];

    res.render("task/taskForm", {
      title: "Edit Task",
      task,
      categories,
      users,
      formAction: `/tasks/${task._id}?_method=PUT`,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load task");
    res.redirect("/tasks");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash("error", "Task not found");
      return res.redirect("/tasks");
    }

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      req.flash("error", "You do not have permission to edit this task");
      return res.redirect("/tasks");
    }

    const { title, description, status, priority, dueDate, category, assignedUser } = req.body;

    task.title = title || task.title;
    task.description = description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate || null;
    task.category = category || null;

    if (req.user.role === "admin" && assignedUser) {
      task.user = assignedUser;
    }

    await task.save();

    req.flash("success", "Task updated successfully");
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not update task");
    res.redirect("/tasks");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash("error", "Task not found");
      return res.redirect("/tasks");
    }

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      req.flash("error", "You do not have permission to delete this task");
      return res.redirect("/tasks");
    }

    await Task.findByIdAndDelete(req.params.id);

    req.flash("success", "Task deleted successfully");
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not delete task");
    res.redirect("/tasks");
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      req.flash("error", "Task not found");
      return res.redirect("/tasks");
    }

    if (req.user.role !== "admin" && task.user.toString() !== req.user._id.toString()) {
      req.flash("error", "You do not have permission to update this task");
      return res.redirect("/tasks");
    }

    task.status = req.body.status;
    await task.save();

    req.flash("success", "Task status updated");
    res.redirect("/tasks");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not update task status");
    res.redirect("/tasks");
  }
};
