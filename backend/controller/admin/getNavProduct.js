const navProductModel = require("../../models/adminmodel.js/navbarProductsModel")

const getNavProductController = async (req, res) => {
    try {
        const allNavProduct = await navProductModel.find().sort({ createAt: -1 })
        res.json({
            success: true,
            error: false,
            data: allNavProduct
        })


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports = getNavProductController