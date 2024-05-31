const bcrypt = require('bcrypt');
const userModel = require('../../models/usermodel/userModel');
const jwt = require('jsonwebtoken');

async function userLoginController(req, res) {
    try {
        const { email, password } = req.body
        if (!email) {
            return res.status(400).json({ message: 'Please provide email', error: true, success: false });
        }
        if (!password) {
            return res.status(400).json({ message: 'Please provide password', error: true, success: false });
        }

        const user = await userModel.findOne({ email })

        if (!user) {
            throw new Error('user not found')
        }
        const checkPassword = await bcrypt.compare(password, user.password)
        console.log(checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id: user._id,
                email: user.email,
            }

            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET_KEY, { expiresIn: 60 * 60 * 8 });

            const tokenOption = {
                httpOnly: true,
                secure: true
            }


            res.cookie('token', token,tokenOption).status(200).json({
                message: "Login successfully",
                data: token,
                success: true,
                error: false
            })


        } else {
            throw new Error('Please check password')
        }



    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });

    }

}
module.exports = userLoginController