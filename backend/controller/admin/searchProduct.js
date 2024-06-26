const productCategoryModel = require("../../models/adminmodel.js/homeCategories");
const productUploadModel = require("../../models/adminmodel.js/productUpload")

const searchProduct = async (req, res) => {
    try {
        const query = req.query.q

        const regex = new RegExp(query, 'i', 'g');

        const product = await Promise.all([
            productUploadModel.find({
                $or: [
                    {
                        productName: regex
                    },
                    {
                        brandName: regex
                    }
                ]
            }),
            productCategoryModel.find({
                $or: [
                    {
                        productCategoryName: regex
                    }
                ]
            })
        ])
        const combinedResults = [].concat(...product);

        res.json({
            data: combinedResults,
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