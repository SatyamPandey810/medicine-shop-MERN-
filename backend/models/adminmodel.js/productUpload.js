const mongoose = require('mongoose')

const uploadProductSchema = new mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    subcategory: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, { timestamps: true })

const productUploadModel = mongoose.model("products", uploadProductSchema)
module.exports = productUploadModel