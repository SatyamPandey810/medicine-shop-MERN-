const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({
    userId: String,
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address1: {
        type: String,
        required: true
    },
    address2: String,
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: {
        type: String,
        required: true
    },

    // addtocartId: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'addtocart',

    // }],

}, { timestamps: true })
const CheckoutModel = mongoose.model("customer-address", checkoutSchema);
module.exports = CheckoutModel