const { verifyToken } = require("../config/jwt");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.flash("error", "Please log in to continue");
      return res.redirect("/auth/login");
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.clearCookie("token");
      req.flash("error", "User not found. Please log in again.");
      return res.redirect("/auth/login");
    }

    req.user = user;
    res.locals.user = user;
    next();
  } catch (error) {
    res.clearCookie("token");
    req.flash("error", "Session expired. Please log in again.");
    return res.redirect("/auth/login");
  }
};

const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.id).select("-password");
    if (user) {
      req.user = user;
      res.locals.user = user;
    }
    next();
  } catch (error) {
    next();
  }
};

module.exports = { authMiddleware, optionalAuth };
