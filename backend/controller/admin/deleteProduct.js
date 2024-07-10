const productUploadModel = require("../../models/adminmodel.js/productUpload");

async function deleteProductController(req, res) {
    try {
        const productId = req.body._id;
        const deletedProduct = await productUploadModel.deleteOne({ _id: productId });

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found",
                error: true,
                success: false
            });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            error: false,
            success: true,
            data: deletedProduct
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = deleteProductController