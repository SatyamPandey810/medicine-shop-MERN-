const mongoose = require("mongoose")

const homeCategoryProductSchema = new mongoose.Schema({
    productCategoryName: { type: String, required: true, unique: true },
    productCategoryimage: [],
    category: String,
    subcategory: String,
    productCategoryDescription: String
}, { timestamps: true })


const productCategoryModel = mongoose.model("homeproduct", homeCategoryProductSchema)
module.exports = productCategoryModel
