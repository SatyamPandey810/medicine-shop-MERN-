const { request } = require("express");
const addToCartModel = require("../../models/adminmodel.js/CartProduct");
const CeheckoutModel = require("../../models/adminmodel.js/CheckoutModel");


const createChekoutController = async (req, res) => {
    try {
        const currentUser = req.userId;
        let existingCheckout = await CeheckoutModel.findOne({ userId: currentUser });

        if (existingCheckout) {
            return res.json({
                data: existingCheckout,
                message: "Existing checkout found",
                success: true,
                error: false
            });
        }

        // If no existing checkout is found, create a new checkout
        const cartItems = await addToCartModel.find({ userId: currentUser });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({
                message: "No addToCart entries found for user",
                error: true,
                success: false
            });
        }      
        const payload = {
            userId: currentUser,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address1: req.body.address1,
            address2: req.body.address2,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            zipCode: req.body.zipCode,
        };

        const newCheckout = new CeheckoutModel(payload);
        const saveCheckout = await newCheckout.save();

        res.json({
            data: saveCheckout,
            message: "Checkout created successfully",
            success: true,
            error: false
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || "Failed to create checkout",
            error: true,
            success: false
        });
    }
}
module.exports = createChekoutController

