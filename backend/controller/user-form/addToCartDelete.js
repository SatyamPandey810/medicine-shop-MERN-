const addToCartModel = require("../../models/adminmodel.js/CartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.currentUserId;
        const addToCartProductId = req.body._id;

        const deleteProduct = await addToCartModel.deleteOne({ _id: addToCartProductId })

        res.json({
            message: 'product deleted from card',
            error: false,
            success: true,
            data: deleteProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports=deleteAddToCartProduct