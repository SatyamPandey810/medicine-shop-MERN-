const productUploadpermission = require("../../helper/productUploadPermission")
const productCategoryModel = require("../../models/adminmodel.js/homeCategories")

async function updateHomeCategoryController(req, res) {
    try {

        const sessionUserId = req.userId

        // if (!productUploadpermission(sessionUserId)) {
        //     throw new Error('Permission denid')
        // }
        const { _id, ...resBody } = req.body
        const updateHomeProduct = await productCategoryModel.findByIdAndUpdate(_id, resBody)
        res.json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updateHomeProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }

}
module.exports = updateHomeCategoryController