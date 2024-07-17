const productCategoryModel = require("../../models/adminmodel.js/homeCategories");
const productUploadModel = require("../../models/adminmodel.js/productUpload");

const mongoose = require("mongoose");

async function getProductbyCategoryController(req, res) {
  try {
    const categoryId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID", error: true, success: false });
    }
    const category = await productCategoryModel.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found", error: true, success: false });
    }
    const products = await productUploadModel.find({ category: categoryId }).populate("category");

    res.status(200).json({
      success: true,
      category,
      products
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
}
module.exports = getProductbyCategoryController