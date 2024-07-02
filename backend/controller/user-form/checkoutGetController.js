const CheckoutModel = require("../../models/adminmodel.js/CheckoutModel");
const productUploadModel = require("../../models/adminmodel.js/productUpload");
const userModel = require("../../models/usermodel/userModel");

async function getCheckoutController(req, res) {
    try {
        // const currentUser = req.userId
        // const UserAllProduct = await CheckoutModel.find({ userId: currentUser })
        //     .populate('addtocartId')
        //     // .populate({
        //     //     path: 'addtocartId',
        //     //     populate: {
        //     //         path: 'productId',
        //     //         model: 'products'
        //     //     }
        //     // });

        // let totalAmount = 0;
        // UserAllProduct.forEach(checkout => {
        //     if (checkout.addtocartId && checkout.addtocartId.productId) {
        //         totalAmount += checkout.addtocartId.quantity * checkout.addtocartId.productId.price;
        //     }
        // });
        // const responseData = UserAllProduct.map(checkout => ({
        //     _id: checkout._id,
        //     userId: checkout.userId,
        //     name: checkout.name,
        //     email: checkout.email,
        //     phone: checkout.phone,
        //     address1: checkout.address1,
        //     address2: checkout.address2,
        //     country: checkout.country,
        //     state: checkout.state,
        //     city: checkout.city,
        //     zipCode: checkout.zipCode,
        //     products: checkout.addtocartId && checkout.addtocartId.productId ? [checkout.addtocartId.productId] : []
        //     // Add more fields as needed
        // }));


        // console.log("responseData", responseData);

        // res.json({
        //     data: responseData,
        //     // totalAmount,
        //     success: true,
        //     error: false
        // })
        // console.log("UserAllProduct", total);

        //-----------------------------------------------------

        const currentUser = req.userId;

        // Fetch all checkouts for the current user
        const checkouts = await CheckoutModel.find({ userId: currentUser })
            .populate('addtocartId'); // Populate addtocartId references

        if (!checkouts || checkouts.length === 0) {
            return res.status(404).json({
                message: "No checkouts found for user",
                error: true,
                success: false
            });
        }

        // Fetch user details if needed
        const user = await userModel.findById(currentUser);

        // Prepare an array to store products for each checkout
        const checkoutsWithProducts = await Promise.all(checkouts.map(async checkout => {
            const productIds = checkout.addtocartId.map(item => item.productId);
            const products = await productUploadModel.find({ _id: { $in: productIds } });

            return {
                checkout,
                products
            };
        }));

        console.log("checkoutsWithProducts",checkoutsWithProducts);
        res.json({
            data: {
                user,
                checkouts: checkoutsWithProducts
            },
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