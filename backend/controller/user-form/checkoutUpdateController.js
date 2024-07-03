const CheckoutModel = require("../../models/adminmodel.js/CheckoutModel");

async function checkoutUpdateController(req, res) {
    try {
        const {checkoutId} = req.params; 
        const updateData = req.body;      
        

        const updatedCheckout = await CheckoutModel.findByIdAndUpdate(checkoutId, updateData, { new: true });

        if (updatedCheckout) {
            res.json({
                success: true,
                data: updatedCheckout,
                message: 'Updated successfully',
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'Checkout not found',
            });
        }
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}

module.exports = checkoutUpdateController