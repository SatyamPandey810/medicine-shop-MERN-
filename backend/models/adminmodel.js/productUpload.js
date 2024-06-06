const mongoose = require('mongoose')

const uploadProductSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sellingPrice: Number
}, { timestamps: true })

const productUploadModel = mongoose.model("Products", uploadProductSchema)
module.exports = productUploadModel