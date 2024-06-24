const addToCartModel = require("../../models/adminmodel.js/CartProduct")

const addToCartController = async (req, res) => {
    try {
        const { productId } = req?.body
        const currentUser = req.userId

        // product available or not 
        const isProductAvailable = await addToCartModel.findOne({ productId: productId })
        console.log("isProductAvailable", isProductAvailable);

        if (isProductAvailable) {
            return res.json({
                message: "allready exits in add to cart",
                success: false,
                error: true
            })
        }

        const payload = {
            productId: productId,
            quantity: 1,
            userId: currentUser,
        }

        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()

        res.json({
            data: saveProduct,
            message: "Product added",
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

}
module.exports = addToCartController


