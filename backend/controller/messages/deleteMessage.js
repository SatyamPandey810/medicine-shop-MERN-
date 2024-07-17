const contactSchema = require("../../models/otherModel.jsx/contactModel");

async function deleteMesageController(req, res) {
    try {
        const messageId = req.body._id;
        const deleteMessage = await contactSchema.deleteOne({ _id: messageId })

        res.status(200).json({
            message: "Message deleted successfully",
            error: false,
            success: true,
            data: deleteMessage
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}
module.exports = deleteMesageController