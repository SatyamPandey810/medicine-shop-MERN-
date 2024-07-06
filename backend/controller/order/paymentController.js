// const stripe = require("../../config/stripe")
const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
const CheckoutModel = require('../../models/adminmodel.js/CheckoutModel');
const userModel = require("../../models/usermodel/userModel")

// try {
//     const { cartItems } = request.body
//     // console.log(cartItems);

//     const user = await userModel.findOne({ _id: request.userId })
//     const params = {
//         submit_type: "pay",
//         mode: "payment",
//         payment_method_types: ['card'],
//         billing_address_collection: "auto",
//         shipping_options: [
//             {
//                 shipping_rate: 'shr_1PYmiFGqtpXSwrr11xNOwBjd'
//             }
//         ],
//         customer_email: user.email,
//         line_items: cartItems.map((item, index) => {
//             return {
//                 price_data: {
//                     currency: 'inr',
//                     product_data: {
//                         name: item.productId.productName,
//                         images: [item.productId.productImage[0]],
//                         metadata: {
//                             productId: item.productId._id
//                         }
//                     },
//                     unit_amount: item.productId.sellingPrice
//                     // unit_amount: item.productId.sellingPrice * 100
//                 },
//                 adjustable_quantity: {
//                     enabled: true,
//                     minimum: 1
//                 },
//                 quantity: item.quantity
//             }
//         }),
//         success_url: `${process.env.FRONTEND_URL}/success`,
//         cancel_url: `${process.env.FRONTEND_URL}/cancel`,
//     }


//     const session = await stripe.checkout.sessions.create(params)
//     response.status(303).json(session)


// } catch (error) {
//     response.status(400).json({
//         message: error.message || error,
//         error: true,
//         success: false

//     })
// }
const paymentController = async (req, res) => {
    try {
        const { cartItems } = req.body;
        const user = await userModel.findOne({ _id: req.userId });
        const address = await CheckoutModel.findOne({ userId: req.userId });

        if (!address) {
            return res.status(400).json({
                message: "User address not found",
                error: true,
                success: false,
            });
        }
        // console.log("User address:", address);


        // Calculate total amount
        const totalAmount = cartItems.reduce((total, item) => total + (item.productId.sellingPrice * item.quantity), 0) * 100;

        const transactionDetails = {
            email: user.email,
            amount: totalAmount, // Paystack expects the amount in kobo
            callback_url: `${process.env.FRONTEND_URL}/success`,
            // callback_url: `${process.env.FRONTEND_URL}/payment/callback`,

            metadata: {
                cartItems: cartItems.map((item) => ({
                    productId: item.productId._id,
                    name: item.productId.productName,
                    quantity: item.quantity,
                    image: item.productId.productImage[0],
                    price: item.productId.sellingPrice
                })),
                userId: user._id,
                // address: address
                address: {
                    name: address.name,
                    email: address.email,
                    phone: address.phone,
                    address1: address.address1,
                    address2: address.address2,
                    country: address.country,
                    state: address.state,
                    city: address.city,
                    zipCode: address.zipCode
                }
            }
        };

        const transaction = await paystack.transaction.initialize(transactionDetails);
        // console.log("transaction", address);

        res.status(200).json(transaction);
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}
module.exports = paymentController