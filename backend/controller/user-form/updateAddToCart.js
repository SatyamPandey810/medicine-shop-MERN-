const addToCartModel = require("../../models/adminmodel.js/CartProduct");

const updateAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addToCartProductId = req.body._id

        const qty = req.body.quantity

        const updateProduct = await addToCartModel.updateOne({ _id: addToCartProductId }, {
            ...(qty && { quantity: qty })
        })

        res.json({
            message: "Product updated",
            data: updateProduct,
            error: false,
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports = updateAddToCartProduct