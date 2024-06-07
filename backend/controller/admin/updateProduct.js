const productUploadpermission = require("../../helper/productUploadPermission")
const productUploadModel = require("../../models/adminmodel.js/productUpload")

async function updateProductController(req, res) {
    try {
        
        const sessionUserId = req.userId
        
        if (!productUploadpermission(sessionUserId)) {
            throw new Error('Permission denid')
        }
        const { _id, ...resBody } = req.body
        const updateProduct = await productUploadModel.findByIdAndUpdate(_id, resBody)

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