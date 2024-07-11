const mongoose = require('mongoose')

const uploadProductSchema = new mongoose.Schema({
    productName: String,
    // required: true   
    brandName: String,
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'homeproduct'
    },
    navCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "navbarproducts"
    },

    productImage: [],

    description: String,
    price: Number,
    sellingPrice: Number,
}, { timestamps: true })




const productUploadModel = mongoose.model("products", uploadProductSchema)

module.exports = productUploadModel