// const addToCartModel = require('../models/addToCart');  
const CheckoutModel = require('../../models/adminmodel.js/CheckoutModel');
const PaymentModel = require('../../models/adminmodel.js/orderList');

// Create a new payment
const createPaymentController = async (req, res) => {
    try {
        const { checkoutId, paymentMethod, paymentAmount, orderStatus } = req.body;
        const userId = req.userId;  // Assuming you have a middleware that sets req.userId

        // Find the related checkout document
        const checkout = await CheckoutModel.findById(checkoutId).populate('addtocartId');
        if (!checkout) {
            return res.status(404).json({
                message: 'Checkout not found',
                error: true,
                success: false
            });
        }

        // Create a new payment document
        const newPayment = new PaymentModel({
            checkoutId,
            addtocartIds: checkout.addtocartId.map(item => item._id),
            userId,
            paymentMethod,
            paymentAmount,
            orderStatus
        });

        // Save the payment document
        const savedPayment = await newPayment.save();

        res.json({
            data: savedPayment,
            message: 'Payment created successfully',
            success: true,
            error: false
        });
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({
            message: error.message || 'Failed to create payment',
            error: true,
            success: false
        });
    }
};



module.exports = createPaymentController
   



// Get payment details by ID
// const getPaymentById = async (req, res) => {
//     try {
//         const paymentId = req.params.id;

//         const payment = await PaymentModel.findById(paymentId).populate('checkoutId').populate('addtocartIds');
//         if (!payment) {
//             return res.status(404).json({
//                 message: 'Payment not found',
//                 error: true,
//                 success: false
//             });
//         }

//         res.json({
//             data: payment,
//             message: 'Payment retrieved successfully',
//             success: true,
//             error: false
//         });
//     } catch (error) {
//         console.error('Error retrieving payment:', error);
//         res.status(500).json({
//             message: error.message || 'Failed to retrieve payment',
//             error: true,
//             success: false
//         });
//     }
// };

// // Update payment status
// const updatePaymentStatus = async (req, res) => {
//     try {
//         const paymentId = req.params.id;
//         const { paymentStatus, orderStatus } = req.body;

//         const updatedPayment = await PaymentModel.findByIdAndUpdate(
//             paymentId,
//             { paymentStatus, orderStatus },
//             { new: true }
//         );

//         if (!updatedPayment) {
//             return res.status(404).json({
//                 message: 'Payment not found',
//                 error: true,
//                 success: false
//             });
//         }

//         res.json({
//             data: updatedPayment,
//             message: 'Payment status updated successfully',
//             success: true,
//             error: false
//         });
//     } catch (error) {
//         console.error('Error updating payment status:', error);
//         res.status(500).json({
//             message: error.message || 'Failed to update payment status',
//             error: true,
//             success: false
//         });
//     }
// };