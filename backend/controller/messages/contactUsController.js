const contactSchema = require("../../models/otherModel.jsx/contactModel");

async function contactUsController(req, res) {

    try {
        const uploadContact = new contactSchema(req.body)
        const saveUploadContact = await uploadContact.save()

        res.json({
            data: saveUploadContact,
            success: true,
            error: false,
            message: "Massage sent"
        })

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false

        })

    }

}
module.exports = contactUsController