const mongoose = require('mongoose')

const paymentModel = new mongoose.Schema({
    userId: String,
    reference: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    gateway_response: { type: String, required: true },
    transaction_date: { type: Date, required: true },
    payment_method: { type: String, required: true }


}, { timestamps: true })
const paymentSchema = mongoose.model("payment", paymentModel)
module.exports = paymentSchema