const User = require("../models/User");
const Task = require("../models/Task");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    const usersWithCounts = await Promise.all(
      users.map(async (u) => {
        const taskCount = await Task.countDocuments({ user: u._id });
        return { ...u.toObject(), taskCount };
      })
    );

    res.render("admin/users", { title: "Users", users: usersWithCounts });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load users");
    res.redirect("/tasks/dashboard");
  }
};
