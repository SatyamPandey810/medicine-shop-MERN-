const CeheckoutModel = require("../../models/adminmodel.js/CheckoutModel");

async function getCheckoutController(req, res) {
    try {
        const checkout = await CeheckoutModel.findById(req.params.id)
            .populate('userId', 'username email')
            .populate('products', 'productId quantity');

        if (!checkout) {
            return res.status(404).json({ message: 'Checkout not found' });
        }

        res.json(checkout);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = getCheckoutController