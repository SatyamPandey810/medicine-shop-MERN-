const navProductModel = require("../../models/adminmodel.js/navbarProductsModel");

async function updateNavCategoryController(req, res) {
    try {

        const sessionUserId = req.userId

        // if (!productUploadpermission(sessionUserId)) {
        //     throw new Error('Permission denid')
        // }
        const { _id, ...resBody } = req.body
        const updateNavProduct = await navProductModel.findByIdAndUpdate(_id, resBody)
        res.json({
            message: "Product updated successfully",
            success: true,
            error: false,
            data: updateNavProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }

}
module.exports = updateNavCategoryController