const mongoose = require("mongoose")

const homeCategoryProductSchema = new mongoose.Schema({
    productCategoryName: {
        type: String,
        required: true,
        unique: true
    },
    productCategoryimage: [],
    productCategoryDescription: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })


const productCategoryModel = mongoose.model("homeproduct", homeCategoryProductSchema)
module.exports = productCategoryModel
