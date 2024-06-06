const productUploadModel = require("../../models/adminmodel.js/productUpload")

async function updateProductController(req, res) {
    try {
        if (!productUploadpermission(req.userId)) {
            throw new Error('Permission denid')
        }
        const { _id, ...resBody } = req.body

        const updateProduct = await productUploadModel.findByIdUpdate(_id, resBody)

        res.json({
            message: "Product updated successfully",
            data: updateProduct,
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
module.exports = updateProductController