const Transaction = require("../../models/ordermodel/transactionsDetailsSchema");

const updateTransactionStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['pending', 'order confirmed', 'order packed', 'order delivered', 'order canceled'];

    if (!validStatuses.includes(status)) {
        return res.status(400).send({ error: 'Invalid status' });
    }

    try {
        const updateFields = { status };
        const currentDate = new Date();

        switch (status) {
            case 'order confirmed':
                updateFields['statusUpdatedDates.orderConfirmedDate'] = currentDate;
                break;
            case 'order packed':
                updateFields['statusUpdatedDates.orderPackedDate'] = currentDate;
                break;
            case 'order delivered':
                updateFields['statusUpdatedDates.orderDeliveredDate'] = currentDate;
                break;
            case 'order canceled':
                updateFields['statusUpdatedDates.orderCanceledDate'] = currentDate;
                break;
        }

        const transaction = await Transaction.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
        if (!transaction) {
            return res.status(404).send({ error: 'Transaction not found' });
        }
        res.send(transaction);
    } catch (error) {
        res.status(500).send({ error: 'Error updating transaction status' });
    }
};

module.exports = updateTransactionStatus;

