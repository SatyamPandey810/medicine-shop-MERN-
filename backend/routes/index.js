const express = require('express');

const router = express.Router();
const userSignUpController = require('../controller/user-form/userSignUp');
const userLoginController = require('../controller/user-form/userLogin');

router.post('/signup', userSignUpController)
router.post('/login',userLoginController)


module.exports = router