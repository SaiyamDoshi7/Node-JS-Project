const roleCheck = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      req.flash("error", "Please log in to continue");
      return res.redirect("/auth/login");
    }

    if (!allowedRoles.includes(req.user.role)) {
      req.flash("error", "You do not have permission to access that page");
      return res.redirect("/tasks/dashboard");
    }

    next();
  };
};

module.exports = roleCheck;
