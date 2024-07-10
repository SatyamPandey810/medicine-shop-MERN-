const navProductModel = require("../../models/adminmodel.js/navbarProductsModel");

async function navUploadProductController(req, res) {
    try {

        const uploadNavCategory = new navProductModel(req.body);
        const saveNavCategory = await uploadNavCategory.save();

        res.status(201).json({
            message: "Product upload sucessfully",
            error: false,
            success: true,
            data: saveNavCategory
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}

module.exports = navUploadProductController