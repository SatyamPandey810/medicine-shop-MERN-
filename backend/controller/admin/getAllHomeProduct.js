const productCategoryModel = require("../../models/adminmodel.js/homeCategories")

const getAllHomeProductController = async (req, res) => {
    try {
        const allHomeProduct = await productCategoryModel.find().sort({ createAt: -1 })

        res.json({
            message: "All product",
            success: true,
            error: false,
            data: allHomeProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports = getAllHomeProductController