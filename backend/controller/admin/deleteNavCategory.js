const navProductModel = require("../../models/adminmodel.js/navbarProductsModel")

async function deleteNavCategory (req, res){
    try {
        const navProductId = req.body._id
        console.log("navProduct", navProductId);

        const deleteNavProduct = await navProductModel.deleteOne({ _id: navProductId })

        res.status(200).json({
            message: "Category deleted successfully",
            error: false,
            success: true,
            data: deleteNavProduct
        });


    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })
    }
}
module.exports = deleteNavCategory