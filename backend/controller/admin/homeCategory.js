const productUploadpermission = require("../../helper/productUploadPermission")
const productCategoryModel = require("../../models/adminmodel.js/homeCategories")

async function homeCategoryUploadController(req, res) {
    try {

        const sessionUserId = req.userId

        // if (!productUploadpermission(sessionUserId)) {
        //     throw new Error('Permission denid')
        // }

        const uploadHomeCategory = new productCategoryModel(req.body);
        const saveHomeCategory = await uploadHomeCategory.save();

        // const { productCategoryName, productCategoryDescription, productCategoryimage } = req.body;
        // const homeCategory = await productCategoryModel.create({
        //     productCategoryName,
        //     productCategoryimage,
        //     productCategoryDescription
        // })

        res.status(201).json({
            message: "Product upload sucessfully",
            error: false,
            success: true,
            data: saveHomeCategory
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }

}
module.exports = homeCategoryUploadController