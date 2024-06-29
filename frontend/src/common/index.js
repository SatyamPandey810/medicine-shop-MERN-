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
    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
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
    }



}
export default SummaryApi