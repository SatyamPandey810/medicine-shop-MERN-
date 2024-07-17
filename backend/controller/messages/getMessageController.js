const contactSchema = require("../../models/otherModel.jsx/contactModel")

const getMessageController = async (req, res) => {
    try {
        const getMessage = await contactSchema.find().sort({ createAt: -1 })

        res.json({
            data: getMessage,
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
module.exports = getMessageController