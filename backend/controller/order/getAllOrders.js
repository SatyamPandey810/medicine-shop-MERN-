const CheckoutModel = require("../../models/adminmodel.js/CheckoutModel");
const Transaction = require("../../models/ordermodel/transactionsDetailsSchema");
const userModel = require("../../models/usermodel/userModel");

const getOrderDetails = async (req, res) => {
    try {
        const currentUser = req.userId

        console.log("currentUser",currentUser);
        // Fetch order details from Transaction model
        const order = await Transaction.findOne({ userId: currentUser });
        if (!order) {
            return res.status(404).json({
                message: "Order not found",
                error: true,
                success: false,
            });
        }

        // Fetch associated user details
        const user = await userModel.findOne({ _id: order.userId });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false,
            });
        }

        // Fetch user's address from CheckoutModel
        // const address = await CheckoutModel.findOne({ userId: order.userId });
        // if (!address) {
        //     return res.status(404).json({
        //         message: "User address not found",
        //         error: true,
        //         success: false,
        //     });
        // }

        // Prepare the response object with all details
        const response = {
            order,
            user,
            // address
        };
        console.log("response", response);
        res.json({
            data: response,
            success: true,
            error: false
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
};
module.exports = getOrderDetails