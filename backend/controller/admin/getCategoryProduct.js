const productUploadModel = require("../../models/adminmodel.js/productUpload")

const getCategoryProduct = async (req, res) => {
    try {
        const productCategory = await productUploadModel.distinct('category')

        const productByCategory = [];

        for (const category of productCategory) {
            // Find all subcategories for the current category
            const subcategories = await productUploadModel.distinct('subcategory', { category });

            // Fetch products for each subcategory
            const products = [];

            for (const subcategory of subcategories) {
                const subcategoryProducts = await productUploadModel.find({ category, subcategory });
                if (subcategoryProducts.length > 0) {
                    products.push({
                        subcategory,
                        products: subcategoryProducts
                    });
                }
            }

            // Push category with its products and subcategories into the array
            productByCategory.push({
                category,
                subcategories: products
            });
        }

        res.json({
            message: "category product",
            data: productByCategory,
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
module.exports = getCategoryProduct