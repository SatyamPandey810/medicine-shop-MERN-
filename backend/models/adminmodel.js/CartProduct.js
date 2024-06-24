const mongoose = require('mongoose')

const addToCartSchema = new mongoose.Schema({

    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity: Number,
    userId: String

}, { timestamps: true })

const addToCartModel = mongoose.model('addToCart', addToCartSchema)
module.exports = addToCartModel