const productUploadpermission = require("../../helper/productUploadPermission");
const productCategoryModel = require("../../models/adminmodel.js/homeCategories");
const productUploadModel = require("../../models/adminmodel.js/productUpload")

async function uploadProductController(req, res) {
    try {
        const { ...productData } = req.body;
        const uploadProduct = new productUploadModel({ ...productData });
        const saveProduct = await uploadProduct.save();      
                
        res.status(201).json({
            message: "Product upload sucessfully",
            error: false,
            success: true,
            data: saveProduct
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }

}
module.exports = uploadProductController