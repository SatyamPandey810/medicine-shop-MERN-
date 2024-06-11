const express = require('express');

const router = express.Router();
const userSignUpController = require('../controller/user-form/userSignUp');
const userLoginController = require('../controller/user-form/userLogin');
const userDetailsController = require('../controller/user-form/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/user-form/userLogout');
const allUsers = require('../controller/user-form/allusers');
const updateUser = require('../controller/user-form/updateUser');
const uploadProductController = require('../controller/admin/uploadProduct');
const getProductController = require('../controller/admin/getAllProduct');
const updateProductController = require('../controller/admin/updateProduct');
const getCategoryProduct = require('../controller/admin/getCategoryProduct');
const homeCategoryUploadController = require('../controller/admin/homeCategory');
const getAllHomeProductController = require('../controller/admin/getAllHomeProduct');
const updateHomeCategoryController = require('../controller/admin/updateHomeCategory');

router.post('/signup', userSignUpController)
router.post('/login', userLoginController)
router.get('/user-details', authToken, userDetailsController)
router.get('/userLogout', authToken, userLogout)

// admin panel router route
router.get('/all-user', authToken, allUsers)

// user updated route
router.post('/update-user', authToken, updateUser)

// upload products route
router.post('/upload-product', authToken, uploadProductController)

// get products route
router.get('/get-product', getProductController)

// update product
router.post('/update-product', authToken, updateProductController)

// product categories route
router.get('/get-categoryProduct', getCategoryProduct)

// upload home category route
router.post('/home-product', authToken, homeCategoryUploadController)

// get home category Product category
router.get('/get-home', getAllHomeProductController)

// update home category product
router.post('/update-home', authToken, updateHomeCategoryController)

module.exports = router