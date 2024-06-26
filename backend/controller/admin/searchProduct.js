const productUploadModel = require("../../models/adminmodel.js/productUpload")

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g');

        const product = await productUploadModel.find({
            "$or": [
                {
                    productName: regex
                },
                {
                    brandName: regex
                }
            ]
        })

        res.json({
            data: product,
            message: "search product list",
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

module.exports = searchProduct