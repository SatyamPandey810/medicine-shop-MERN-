const addToCartModel = require("../../models/adminmodel.js/CartProduct")

const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const allProduct = await addToCartModel.find({
            userID: userId
        })

        res.json({
            data: allProduct,
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
module.exports = addToCartViewProduct