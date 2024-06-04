const userModel = require("../../models/usermodel/userModel")
const bcrypt = require('bcrypt');


async function userSignUpController(req, res) {
    try {
        const { email, password, name } = req.body
        const user = await userModel.findOne({ email })
        console.log('user', user);
        if (user) {
            throw new Error('user already  exist')
        }
        if (!email) {
            // throw new Error('Please provide email')
            return res.status(400).json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            // throw new Error('Please provide password')
            return res.status(400).json({ message: 'Please provide password', error: true, success: false });
        }
        if (!name) {
            // throw new Error('Please provide name')
            return res.status(400).json({ message: 'Please provide name', error: true, success: false });
        }

        const salt = await bcrypt.genSaltSync(10)
        const hashPassword = await bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error('somthing went wrong')
        }

        const payload = {
            ...req.body,
            role: "USER",
            password: hashPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            success: true,
            error: false,
            message: "User created successfully"
        })

    } catch (error) {       
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }
}

module.exports = userSignUpController;