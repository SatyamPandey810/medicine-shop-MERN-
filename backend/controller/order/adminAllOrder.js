const Transaction = require("../../models/ordermodel/transactionsDetailsSchema");

const adminAllOrderController = async (req, res) => {
    try {
        const getAllOrder = await Transaction.find()
       


        res.json({
            data: getAllOrder,
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
module.exports = adminAllOrderController