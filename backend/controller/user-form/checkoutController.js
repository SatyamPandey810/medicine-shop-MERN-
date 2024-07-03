const { request } = require("express");
const addToCartModel = require("../../models/adminmodel.js/CartProduct");
const CeheckoutModel = require("../../models/adminmodel.js/CheckoutModel");

// const createChekoutController = async (req, res) => {
//     try {
//         const currentUser = req.userId;
//         // const { addtocartId } = req?.body

//         // const {
//         //     // addtocartId,
//         //     name,
//         //     email,
//         //     phone,
//         //     address1,
//         //     address2,
//         //     country,
//         //     state,
//         //     city,
//         //     zipCode,

//         // } = req.body;

//         const cartItems = await addToCartModel.find({ userId: currentUser });
//         // console.log("cartItem", cartItems);

//         if (!cartItems || cartItems.length === 0) {
//             console.error("No addToCart entries found for user:", currentUser);
//             return res.status(404).json({
//                 message: "No addToCart entries found for user",
//                 error: true,
//                 success: false
//             });
//         }

//         // Construct an array of addtocartIds from cartItems
//         const addtocartId = cartItems.map(item => item._id);

//         // Construct an array of products or other relevant data from cartItems
//         const products = cartItems.map(item => ({
//             productId: item.productId,
//             quantity: item.quantity,
//             userId: item.userId
//             // Add other relevant fields as needed
//         }));


//         // console.log("addtocartId", addtocartId);




//         const payload = {
//             addtocartId,
//             userId: currentUser,
//             name: req.body.name,
//             email: req.body.email,
//             phone: req.body.phone,
//             address1: req.body.address1,
//             address2: req.body.address2,
//             country: req.body.country,
//             state: req.body.state,
//             city: req.body.city,
//             zipCode: req.body.zipCode,
//             products // Assuming you need to store products in the checkout
//         };

//         // Log the payload before saving
//         // console.log("Payload:", payload);

//         const newCheckout = new CeheckoutModel(payload);
//         const saveCheckout = await newCheckout.save();



//         res.json({
//             data: saveCheckout,
//             message: "Checkout created successfully",
//             success: true,
//             error: false
//         });
//     } catch (error) {
//         console.error("Error creating checkout:", error);
//         res.status(400).json({
//             message: error.message || "Failed to create checkout",
//             error: true,
//             success: false
//         });
//     }

// };

const createChekoutController = async (req, res) => {
    try {
        const currentUser = req.userId;

        // Check if there's an existing checkout for the current user
        let existingCheckout = await CeheckoutModel.findOne({ userId: currentUser });

        if (existingCheckout) {
            // If an existing checkout is found, return the existing details
            console.log("Existing checkout found:", existingCheckout);
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
            console.error("No addToCart entries found for user:", currentUser);
            return res.status(404).json({
                message: "No addToCart entries found for user",
                error: true,
                success: false
            });
        }

        const addtocartId = cartItems.map(item => item._id);
        const products = cartItems.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            userId: item.userId
            // Add other relevant fields as needed
        }));

        const payload = {
            addtocartId,
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
            products // Assuming you need to store products in the checkout
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
        console.error("Error creating checkout:", error);
        res.status(400).json({
            message: error.message || "Failed to create checkout",
            error: true,
            success: false
        });
    }


}





module.exports = createChekoutController

