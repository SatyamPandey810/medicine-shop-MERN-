const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({   
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    reference: {
        type: String,
        required: function () {
            return this.paymentMethod === 'online';
        },
    },
    access_code: {
        type: String,
        required: function () {
            return this.paymentMethod === 'online';
        },
    },
    authorization_url: {
        type: String,
        required: function () {
            return this.paymentMethod === 'online';
        },
    },
    cartItems: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
    }],
    address: {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address1: {
            type: String,
            required: true,
        },
        address2: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        zipCode: {
            type: String,
            required: true,
        },
    },
    paymentMethod: {
        type: String,
        enum: ['online', 'cod'],
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'order confirmed', 'order packed', 'order delivered', 'order canceled'],
        default: 'pending',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }


});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
