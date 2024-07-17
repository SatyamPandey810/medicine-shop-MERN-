const CheckoutModel = require("../../models/adminmodel.js/CheckoutModel");
const productUploadModel = require("../../models/adminmodel.js/productUpload");
const userModel = require("../../models/usermodel/userModel");

async function getCheckoutController(req, res) {
    try {
        const currentUser = req.userId;

        // Fetch all checkouts for the current user
        const checkouts = await CheckoutModel.find({ userId: currentUser })

        if (!checkouts || checkouts.length === 0) {
            return res.status(404).json({
                message: "No checkouts found for user",
                error: true,
                success: false
            });
        }


        res.json({
            data: checkouts,
            // data: {
            //     user,
            //     checkouts: checkoutsWithProducts
            // },
            message: "Checkouts retrieved successfully",
            success: true,
            error: false
        });



    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports = getCheckoutController