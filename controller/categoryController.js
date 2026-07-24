const Category = require("../models/Category");
const Task = require("../models/Task");

exports.viewCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.render("category/viewCategory", {
      title: "Categories",
      categories,
    });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load categories");
    res.redirect("/tasks/dashboard");
  }
};

exports.getAddCategoryForm = (req, res) => {
  res.render("category/addCategory", { title: "Add Category", category: null });
};

exports.createCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;

    if (!categoryName) {
      req.flash("error", "Category name is required");
      return res.redirect("/categories/new");
    }

    await Category.create({
      categoryName,
      description,
      createdBy: req.user._id,
    });

    req.flash("success", "Category created successfully");
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not create category");
    res.redirect("/categories/new");
  }
};

exports.getEditCategoryForm = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      req.flash("error", "Category not found");
      return res.redirect("/categories");
    }
    res.render("category/addCategory", { title: "Edit Category", category });
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not load category");
    res.redirect("/categories");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { categoryName, description } = req.body;
    await Category.findByIdAndUpdate(req.params.id, { categoryName, description });
    req.flash("success", "Category updated successfully");
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not update category");
    res.redirect("/categories");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    await Task.updateMany({ category: req.params.id }, { $set: { category: null } });
    req.flash("success", "Category deleted successfully");
    res.redirect("/categories");
  } catch (error) {
    console.error(error);
    req.flash("error", "Could not delete category");
    res.redirect("/categories");
  }
};
