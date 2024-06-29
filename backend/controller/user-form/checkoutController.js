const { request } = require("express");
const addToCartModel = require("../../models/adminmodel.js/CartProduct");
const CeheckoutModel = require("../../models/adminmodel.js/CheckoutModel");

// const createChekoutController = async (req, res) => {
//     try {
//         const currentUser = req.userId

        
//         const { 
//             productsId,
//             name, 
//             email, 
//             phone, 
//             address1, 
//             address2, 
//             country, 
//             state, 
//             city, 
//             zipCode, 
//             // paymentDetails, 
//             // orderStatus, 
//             // totalAmount 
//         } = req.body;

//         const payload = {
//             productId: productsId,
//             userId: currentUser,
//             name,
//             email,
//             phone,
//             address1,
//             address2,
//             country,
//             state,
//             city,
//             zipCode,
//             // paymentDetails,
//             // orderStatus,
//             // totalAmount

//         }
//         // console.log("Payload:", payload);
//         const newCheckout = new CeheckoutModel(payload)
//         const saveCheckout = await newCheckout.save()
//         // await saveCheckout.populate('productsId').execPopulate();
//          console.log("Populated Checkout Data:", saveCheckout)

//         res.json({
//             data: saveCheckout,
//             message: "checkout",
//             success: true,
//             error: false
//         })
//     } catch (error) {
//         res.status(400).json({
//             message: error.message || error,
//             error: true,
//             success: false

//         })
//     }
// }

const createChekoutController = async (req, res) => {
    try {
        const currentUser = req.userId;

        const { 
            productsId,
            name, 
            email, 
            phone, 
            address1, 
            address2, 
            country, 
            state, 
            city, 
            zipCode 
        } = req.body;

        // Log to verify request body contains productsId
        console.log("Request Body:", req.body);

       
        const payload = {
            productsId,
            userId: currentUser,
            name,
            email,
            phone,
            address1,
            address2,
            country,
            state,
            city,
            zipCode
        };

        // Log the payload before saving
        console.log("Payload:", payload);

        const newCheckout = new CeheckoutModel(payload);
        const saveCheckout = await newCheckout.save();

        // Log the saved checkout before population
        console.log("Saved Checkout (Before Population):", saveCheckout);

        const populatedCheckout = await CeheckoutModel.findById(saveCheckout._id)
            .populate('productsId')
            .exec();

        // Log the populated checkout
        console.log("Populated Checkout Data:", populatedCheckout);

        res.json({
            data: populatedCheckout,
            message: "Checkout created successfully",
            success: true,
            error: false
        });
    } catch (error) {
        console.error("Error creating checkout:", error);
        res.status(400).json({
            message: error.message || "Failed to create checkout",
            error: true,
            success: false
        });
    }
    
};

module.exports = createChekoutController

