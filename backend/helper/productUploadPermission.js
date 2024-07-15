const userModel = require("../models/usermodel/userModel")

const productUploadpermission = async (userId) => {
    const user = await userModel.findById(userId)
    if (user.role === 'ADMIN') {
        return true
    }
    return false

    // const user = await User.findById(userId);
    // return user && user.role === 'admin';

}
module.exports = productUploadpermission