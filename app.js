require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.messages = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
});

app.get("/", (req, res) => {
  if (req.cookies.token) {
    return res.redirect("/tasks/dashboard");
  }
  res.redirect("/auth/login");
});

app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);

app.use((req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1><a href='/'>Go Home</a>");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("<h1>500 - Something went wrong</h1><a href='/'>Go Home</a>");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on PORT http://localhost:${PORT}`);
});
