const paystack = require('paystack')(process.env.PAYSTACK_SECRET_KEY);
const CheckoutModel = require('../../models/adminmodel.js/CheckoutModel');
const Transaction = require('../../models/ordermodel/transactionsDetailsSchema');
const userModel = require("../../models/usermodel/userModel");
const initializeTransaction = require('./initializeTransaction');

const paymentController = async (req, res) => {
  try {
    const { cartItems, paymentMethod } = req.body;
    const user = await userModel.findOne({ _id: req.userId });
    const address = await CheckoutModel.findOne({ userId: req.userId });

    if (!address) {
      return res.status(400).json({
        message: "User address not found",
        error: true,
        success: false,
      });
    }

    const totalAmount = cartItems.reduce((total, item) => total + (item.productId.sellingPrice * item.quantity), 0);

    if (paymentMethod === 'online') {
      const transactionDetails = {
        email: user.email,
        name: user.name,
        amount: totalAmount * 100, 
        callback_url: `${process.env.FRONTEND_URL}/success`,
        metadata: {
          cartItems: cartItems.map((item) => ({
            productId: item.productId._id,
            name: item.productId.productName,
            // brandName: item.productId.brandName,
            quantity: item.quantity,
            image: item.productId.productImage[0],
            price: item.productId.sellingPrice
          })),
          userId: user._id,
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

      const transaction = await initializeTransaction(transactionDetails);

      const newTransaction = new Transaction({
        userId: user._id,
        email: user.email,
        name: user.name,
        amount: totalAmount,
        reference: transaction.data.reference,
        access_code: transaction.data.access_code,
        authorization_url: transaction.data.authorization_url,
        cartItems: transactionDetails.metadata.cartItems,
        address: transactionDetails.metadata.address,
        paymentMethod: 'online',
        status: 'pending'
      });

      await newTransaction.save();

      res.status(200).json(transaction);
    } else if (paymentMethod === 'cod') {
      const newTransaction = new Transaction({
        userId: user._id,
        email: user.email,
        name: user.name,
        amount: totalAmount,
        cartItems: cartItems.map((item) => ({
          productId: item.productId._id,
          name: item.productId.productName,
          // brandName: item.productId.brandName,
          quantity: item.quantity,
          image: item.productId.productImage[0],
          price: item.productId.sellingPrice
        })),
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
        },
        paymentMethod: 'cod',
        status: 'pending'
      });

      await newTransaction.save();

      res.status(200).json({
        message: "Order placed successfully! You will pay on delivery.",
        success: true,
        transaction: newTransaction
      });
    } else {
      res.status(400).json({
        message: "Invalid payment method",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    console.error('Error in paymentController:', error.message || error);
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};



module.exports = paymentController