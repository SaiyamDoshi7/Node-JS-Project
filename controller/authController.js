const User = require("../models/User");
const { generateToken } = require("../config/jwt");

exports.getRegister = (req, res) => {
  res.render("auth/register", { title: "Register" });
};

exports.postRegister = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, role } = req.body;

    if (!name || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/auth/register");
    }

    if (password !== confirmPassword) {
      req.flash("error", "Passwords do not match");
      return res.redirect("/auth/register");
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      req.flash("error", "An account with that email already exists");
      return res.redirect("/auth/register");
    }

    const finalRole = role === "admin" ? "admin" : "user";

    const user = await User.create({
      name,
      email,
      password, 
      role: finalRole,
    });

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    req.flash("success", `Welcome, ${user.name}! Your account has been created.`);
    res.redirect("/tasks/dashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong during registration");
    res.redirect("/auth/register");
  }
};

exports.getLogin = (req, res) => {
  res.render("auth/login", { title: "Login" });
};

exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/auth/login");
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/auth/login");
    }

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    req.flash("success", `Welcome back, ${user.name}!`);
    res.redirect("/tasks/dashboard");
  } catch (error) {
    console.error(error);
    req.flash("error", "Something went wrong during login");
    res.redirect("/auth/login");
  }
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  req.flash("success", "You have been logged out");
  res.redirect("/auth/login");
};
