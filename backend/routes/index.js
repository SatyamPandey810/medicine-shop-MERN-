const express = require('express');

const router = express.Router();
const userSignUpController = require('../controller/user-form/userSignUp');
const userLoginController = require('../controller/user-form/userLogin');
const userDetailsController = require('../controller/user-form/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user-form/userLogout');

router.post('/signup', userSignUpController)
router.post('/login', userLoginController)
router.get('/user-details', authToken, userDetailsController)
router.get('/userLogout', userLogout)



module.exports = router