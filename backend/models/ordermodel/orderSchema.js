const mongoose = require('mongoose')

const orderModel = new mongoose.Schema({
    userId: String,
    items: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    totalAmount: { type: Number, required: true },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer-address',
        required: true
    },
    paymentStatus: { type: String, required: true },
    paymentReference: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true })

const orderSchema = mongoose.model("orders", orderModel)
module.exports = orderSchema