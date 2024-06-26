import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import Medicine from '../pages/Medicine'
import OnlineBuy from '../pages/Online-buy'
import News from '../pages/News'
import ContactUs from '../pages/Contact-us'
import PageNotFound from '../pages/PageNotFound'
import HealthProduct from '../category-front/Health-product'
import Login from '../pages/Login'
import ForgotPassword from '../pages/Forgot-password'
import Signup from '../pages/Signup'
// import UserProfile from '../pages/UserProfile'
import AdminPanel from '../pages/admin/AdminPanel'
import AllUser from '../pages/admin/AllUser'
import AllProducts from '../pages/admin/AllProducts'
import CosmaticsProduct from '../category-front/CosmaticsProduct'
import HomeCategory from '../pages/admin/HomeCategory'
import CategoryProduct from '../category-front/CategoryProduct'
// import HomeCategory from '../pages/admin/HomeCategory'
import addToCart from '../pages/addtocart/AddToCart';
import CartView from '../pages/addtocart/CartView'
import Orders from '../pages/admin/Orders'
import SingleAddtocart from '../pages/addtocart/Single-addtocart'
import CheckOut from '../pages/addtocart/CheckOut'
import SearchProduct from '../pages/SearchProduct'


export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/medicine' element={<Medicine />} />
            <Route path='/online-buy' element={<OnlineBuy />} />
            <Route path='/news' element={<News />} />
            <Route path='/contact-us' element={<ContactUs />} />
            <Route path='/cart-view' element={<CartView />} />
            {/* <Route path="/addtocart" element={}/> */}

            {/* category product route */}
            <Route path="/category/:id" element={<CategoryProduct />} />
            <Route path="/category/:id/single-card" element={<SingleAddtocart />} />
            <Route path="/category/:id/checkout/:productName" element={<CheckOut />} />



            {/* <Route path='/category/:id'>
                <Route path="" element={<CategoryProduct />} />
                <Route path="single-card" element={<SingleAddtocart />} />
                <Route path="checkout/:productName" element={<CheckOut />} />
            </Route> */}

            {/* product search routing */}
            <Route path="/search" element={<SearchProduct />} />

            {/* login and signup route */}
            <Route path='/login'>
                <Route path='' element={<Login />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
            </Route>
            <Route path='/signup' element={<Signup />} />

            {/* pagenotfound route */}
            <Route path='*' element={<PageNotFound />} />

            {/* admin panel route */}
            <Route path='/admin-panel'>
                <Route path='' element={<AdminPanel />} />
                <Route path='all-user' element={<AllUser />} />
                <Route path='all-products' element={<AllProducts />} />
                <Route path='home-category' element={<HomeCategory />} />
                <Route path='user-order' element={<Orders />} />
            </Route>

            {/* single add to cart page route */}


            {/* userProfile */}
            {/* <Route path='/profile' element={<UserProfile />} /> */}
        </Routes>

    )
}
