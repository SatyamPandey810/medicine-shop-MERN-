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
const getProductbyCategoryController = require('../controller/admin/getProductByCategoryController');
const addToCartController = require('../controller/user-form/addToCartController');
const countAddToCartProduct = require('../controller/user-form/countAddToCard');
const addToCartViewProduct = require('../controller/user-form/addToCartView');
const updateAddToCartProduct = require('../controller/user-form/updateAddToCart');
const deleteAddToCartProduct = require('../controller/user-form/addToCartDelete');
const searchProduct = require('../controller/admin/searchProduct');
const createChekoutController = require('../controller/user-form/checkoutController');
// const getCheckoutController = require('../controller/user-form/getUserAddress');
// const checkoutUpdateController = require('../controller/user-form/updateUserAddress');
// const createPaymentController = require('../controller/admin/createPaymentController');
const paymentController = require('../controller/order/paymentController');
const getCheckoutController = require('../controller/user-form/checkoutGetController');
const checkoutUpdateController = require('../controller/user-form/checkoutUpdateController');
const getOrderDetails = require('../controller/order/getAllOrders');
const deleteProductController = require('../controller/admin/deleteProduct');
const navUploadProductController = require('../controller/admin/navUploadProduct');
const adminAllOrderController = require('../controller/order/adminAllOrder');
const getNavProductCategoryController = require('../controller/admin/getNavProductCategory');
const getNavProductController = require('../controller/admin/getNavProduct');
const updateNavCategoryController = require('../controller/admin/updateNavCategory');
const deleteNavCategory = require('../controller/admin/deleteNavCategory');
const updateTransactionStatus = require('../controller/order/orderStatusController');
// const userAddressController = require('../controller/user-form/userAddressController');
// const getAddressUserController = require('../controller/user-form/getUserAddress');
// const addressUpdateController = require('../controller/user-form/updateUserAddress');

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

// update product route
router.post('/update-product', authToken, updateProductController)

// delete product route
router.post('/product-delete', deleteProductController)

// product categories route
router.get('/get-categoryProduct', getCategoryProduct)

// upload home category route
router.post('/home-product', authToken, homeCategoryUploadController)

// get home category Product category route
router.get('/get-home', getAllHomeProductController)

// update home category product route
router.post('/update-home', authToken, updateHomeCategoryController)

// product find by category route
router.get('/category/:id', getProductbyCategoryController)

// navbar product upload category route
router.post('/nav-product', navUploadProductController)

// navbar product get category route
router.get('/get-nav', getNavProductController)

// navbar product update category route
router.post('/update-nav', updateNavCategoryController)

// nav product find by category route
router.get("/nav-category/:id", getNavProductCategoryController)

// nav product delete route
router.post("/delete-nav", deleteNavCategory)

// add to cart route
router.post('/addtocart', authToken, addToCartController)

// count addtocart products route
router.get('/countAddToCardProduct', authToken, countAddToCartProduct)

// user add to cart view products route
router.get('/view-cart-product', authToken, addToCartViewProduct)

// user add to cart update products route
router.post('/update-cart-product', authToken, updateAddToCartProduct)

// user add to cart delete products route
router.post("/delete-cart-product", authToken, deleteAddToCartProduct)

// search product route
router.get("/search-product", searchProduct)

// createChekout product route
router.post("/checkout", authToken, createChekoutController)

// get checkout product and user details route
router.get('/getcheckout', authToken, getCheckoutController)

// update checkout user details route 
router.post('/updatechekout/:checkoutId', authToken, checkoutUpdateController)

// payment and order router
router.post('/payment-order', authToken, paymentController)

// order get by user router
router.get('/orders', authToken, getOrderDetails);

// all order get by admin
router.get("/admin-order", adminAllOrderController)

// order status updating
router.post("/transaction/:id/status", updateTransactionStatus)




module.exports = router