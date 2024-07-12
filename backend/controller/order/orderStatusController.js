const Transaction = require("../../models/ordermodel/transactionsDetailsSchema");

const updateTransactionStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        console.log("id", id);
        // Validate status
        const validStatuses = ['pending', 'order confirmed', 'order packed', 'order delivered', 'order canceled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid status",
                error: true,
                success: false,
            });
        }

        // Find the transaction by ID and update status
        const transaction = await Transaction.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
                error: true,
                success: false,
            });
        }

        res.status(200).json({
            message: "Transaction status updated successfully",
            success: true,
            transaction,
        });
    } catch (error) {
        console.error('Error updating transaction status:', error.message || error);
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
};

module.exports = updateTransactionStatus
