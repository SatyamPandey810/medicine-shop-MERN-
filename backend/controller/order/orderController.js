const axios = require('axios');
const orderSchema = require('../../models/ordermodel/orderSchema');
const paymentSchema = require('../../models/ordermodel/paymentSchema');
const CheckoutModel = require('../../models/adminmodel.js/CheckoutModel');

const paystackWebhook = async (req, res) => {
    try {
        const { reference } = req.query;
        console.log("Received callback with reference:", reference);

        const verificationUrl = `https://api.paystack.co/transaction/verify/${reference}`;
        console.log("Verification URL:", verificationUrl);

        const response = await axios.get(verificationUrl, {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
            }
        });

        console.log("Verification response:", response.data);

        const { status, data } = response.data;

        if (status === true && data.status === 'success') {
            console.log("Payment successful for reference:", reference);

            // Extract metadata from the response
            const { metadata } = data;
            const { userId, cartItems, address } = metadata;

            // Save address details to the database
            const addressRecord = new CheckoutModel({
                userId: userId,
                name: address.name,
                email: address.email,
                phone: address.phone,
                address1: address.address1,
                address2: address.address2,
                country: address.country,
                state: address.state,
                city: address.city,
                zipCode: address.zipCode
            });

            await addressRecord.save();

            // Save order details to the database
            const order = new orderSchema({
                userId: userId,
                items: cartItems,
                totalAmount: data.amount / 100, // Convert kobo to NGN
                address: addressRecord._id, // Reference to the saved address
                paymentStatus: data.status,
                paymentReference: reference,
                email: data.customer.email
            });

            await order.save();

            // Save payment details to the database
            const payment = new paymentSchema({
                userId: userId,
                reference: reference,
                amount: data.amount / 100, // Convert kobo to NGN
                status: data.status,
                gateway_response: data.gateway_response,
                transaction_date: data.transaction_date,
                payment_method: data.channel,
            });

            await payment.save();

            res.redirect(`${process.env.FRONTEND_URL}/payment/success`);
        } else {
            console.log("Payment failed for reference:", reference);
            res.redirect(`${process.env.FRONTEND_URL}/payment/failed`);
        }

    } catch (error) {
        console.error("Error in paystackWebhook:", error);
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
};

module.exports = paystackWebhook;
