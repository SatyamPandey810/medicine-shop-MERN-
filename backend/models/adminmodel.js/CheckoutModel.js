const mongoose = require('mongoose')

const checkoutSchema = new mongoose.Schema({

    productsId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addToCart',
        // required: true

    },
    userId:String,
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'user', 
    //     required: true
    // },
    
    name: {
        type: String,
        // required: true

    },
    email: {
        type: String,
        // required: true
    },
    phone: {
        type: Number,
        // required: true
    },
    address1: { type: String },
    address2: String,
    country: { type: String },
    state: { type: String },
    city: { type: String },
    zipCode: { type: String },

    // shippingAddress: {
    //     state: { type: String, required: true },
    //     country: { type: String, required: true },
    //     zipCode: { type: String, required: true }
    // },
    paymentDetails: {
        method: { type: String }, // e.g., 'Credit Card', 'PayPal'
        status: { type: String }, // e.g., 'Pending', 'Completed'
        transactionId: String
    },
    orderStatus: {
        type: String,
        defauenum: ['created', 'processing', 'completed', 'cancelled'], // e.g., 'Pending', 'Shipped', 'Delivered', 'Cancelled'
        // required: true
    },
    totalAmount: {
        type: Number,
        // required: true
    }
}, { timestamps: true })
const CeheckoutModel = mongoose.model("chekout", checkoutSchema);
module.exports = CeheckoutModel