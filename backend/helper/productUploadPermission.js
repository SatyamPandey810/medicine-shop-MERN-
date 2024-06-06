const userModel = require("../models/usermodel/userModel")

const productUploadpermission = async (userId) => {
    const user = await userModel.findById(userId)
    if (user.role !== 'ADMIN') {
        return false
    }
    return true

}
module.exports=productUploadpermission