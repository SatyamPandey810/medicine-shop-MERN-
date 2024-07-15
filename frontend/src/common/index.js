const backendDomain = "http://localhost:8080"

const SummaryApi = {
    signUP: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },
    userLogin: {
        url: `${backendDomain}/api/login`,
        method: "post"
    },
    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },
    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: "get"
    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: "post"
    },
    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: "get"
    },
    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: "post"
    },
    productDelete: {
        url: `${backendDomain}/api/product-delete`,
        method: "post"
    },
    categoryProduct: {
        url: `${backendDomain}/api/get-categoryProduct`,
        method: "get"
    },
    homeCategoryProduct: {
        url: `${backendDomain}/api/home-product`,
        method: "post"
    },
    getHomeCategoryProduct: {
        url: `${backendDomain}/api/get-home`,
        method: "get"
    },
    updateHomeCategoryProduct: {
        url: `${backendDomain}/api/update-home`,
        method: "post"
    },
    getCategoriesProduct: {
        url: `${backendDomain}/api/category/:id`,
        method: "get"
    },
    uploadNavCategoryProduct: {
        url: `${backendDomain}/api/nav-product`,
        method: "post"
    },
    getNavProduct: {
        url: `${backendDomain}/api/get-nav`,
        method: "get"
    },
    updateNavProduct: {
        url: `${backendDomain}/api/update-nav`,
        method: "post"
    },
    deleteNavCategory: {
        url: `${backendDomain}/api/delete-nav`,
        method: "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },
    getNavCategoryProduct: {
        url: `${backendDomain}/api/nav-category/:id`,
        method: "get"
    },
    addTocardProductCount: {
        url: `${backendDomain}/api/countAddToCardProduct`,
        method: "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },
    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },
    searchprodct: {
        url: `${backendDomain}/api/search-product`,
        method: "get"
    },
    createCheckout: {
        url: `${backendDomain}/api/checkout`,
        method: "post"
    },
    getCheckout: {
        url: `${backendDomain}/api/getcheckout`,
        method: "get"
    },
    checkoutUpdate: {
        url: (checkoutId) => `${backendDomain}/api/updatechekout/${checkoutId}`,
        method: "post"
    },
    paymentOrder: {
        url: `${backendDomain}/api/payment-order`,
        method: "post"
    },
    getOrder: {
        url: `${backendDomain}/api/orders`,
        method: "get"
    },
    getAdminAllOrder: {
        url: `${backendDomain}/api/admin-order`,
        method: "get"
    },
    orderUpdate: {
        // url: `("${backendDomain}/api/transaction-status/:id`,
        // method: "post"
        url: `${backendDomain}/api/transaction-status/:id`,
        method: "POST"
    },
    contactUs: {
        url: `${backendDomain}/api/contact-message`,
        method: "post"
    }


}
export default SummaryApi