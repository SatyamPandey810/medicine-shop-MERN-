const navProductModel = require("../../models/adminmodel.js/navbarProductsModel");

async function updateNavCategoryController(req, res) {
    try {

        const sessionUserId = req.userId

        // if (!productUploadpermission(sessionUserId)) {
        //     throw new Error('Permission denid')
        // }
        console.log('req.body:', req.body);
        const { _id, ...resBody } = req.body
        const updateNavProduct = await navProductModel.findByIdAndUpdate(_id, resBody)
        console.log('_id:', _id);
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