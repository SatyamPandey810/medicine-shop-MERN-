const productUploadpermission = require("../../helper/productUploadPermission");
const productCategoryModel = require("../../models/adminmodel.js/homeCategories");
const productUploadModel = require("../../models/adminmodel.js/productUpload")

async function uploadProductController(req, res) {
    try {

        // const sessionUserId = req.userId

        // if (!productUploadpermission(sessionUserId)) {
        //     throw new Error('Permission denid')
        // }

        // const uploadProduct = new productUploadModel(req.body)
        // const saveProduct = await uploadProduct.save()
        // //-----------------------------------
        const { ...productData } = req.body;
        const uploadProduct = new productUploadModel({ ...productData });
        const saveProduct = await uploadProduct.save();

        // await productCategoryModel.findByIdAndUpdate(categoryId, { $push: { products: saveProduct._id } });

        //--------------------------------------
        // const product = await productUploadModel.create({
        //     productName: req.body.productName,
        //     brandName: req.body.brandName,
        //     category: req.body.category,
        //     productImage: req.body.productImage,
        //     description: req.body.description,
        //     price: req.body.price,
        //     sellingPrice: req.body.sellingPrice
        // })
        // const rightData = await product.save()
        
        
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