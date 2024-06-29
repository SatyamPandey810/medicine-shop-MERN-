const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
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
    address1: { type: String, required: true },
    address2: String,
    country: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
})

const userAddressSchema = new mongoose.Schema({
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    address: [addressSchema]
}, { timestamps: true })

const userAddress = mongoose.model("userAdress", userAddressSchema)
module.exports = userAddress