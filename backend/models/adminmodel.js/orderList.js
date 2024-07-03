const mongoose = require('mongoose')


const paymentSchema = new mongoose.Schema({
    checkoutId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer-address',
        // required: true
    },
    addtocartIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addtocart'
    }],
    userId: String,
    paymentMethod: {
        type: String,
        enum: ['credit_card','bank_transfer', 'cash_on_delivery '], // Example payment methods
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    },
    paymentAmount: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    },
    orderStatus: {
        type: String,
        enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'],
        required: true
    }
}, { timestamps: true })

const PaymentModel = mongoose.model('payments', paymentSchema);
module.exports = PaymentModel;