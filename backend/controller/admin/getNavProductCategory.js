const navProductModel = require("../../models/adminmodel.js/navbarProductsModel")
const productUploadModel = require("../../models/adminmodel.js/productUpload")
const mongoose = require("mongoose");

async function getNavProductCategoryController(req, res) {
    try {
        const navCategoryId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(navCategoryId)) {
            return res.status(400).json({ message: "Invalid category ID", error: true, success: false });
        }
        const navCategory = await navProductModel.findById(navCategoryId)
        if (!navCategory) {
            return res.status(404).json({ message: "Category not found", error: true, success: false });
        }

        const mainProduct = await productUploadModel.find({ navCategory: navCategoryId }).populate('navCategory')

        res.status(200).json({
            success: true,
            navCategory,
            mainProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = getNavProductCategoryController