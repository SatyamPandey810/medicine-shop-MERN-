const userModel = require("../../models/usermodel/userModel");

async function allUsers(req, res) {
    try {
        const allUsers = await userModel.find()
        res.json({
            message: "All user",
            data: allUsers,
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
module.exports = allUsers