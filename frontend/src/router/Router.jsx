import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import OnlineBuy from '../pages/Online-buy'
import News from '../pages/News'
import ContactUs from '../pages/Contact-us'
import PageNotFound from '../pages/PageNotFound'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import AdminPanel from '../pages/admin/AdminPanel'
import AllUser from '../pages/admin/AllUser'
import AllProducts from '../pages/admin/AllProducts'
import HomeCategory from '../pages/admin/HomeCategory'
import CategoryProduct from '../category-front/CategoryProduct'
import CartView from '../pages/addtocart/CartView'
// import Orders from '../pages/admin/Orders'
import SingleAddtocart from '../pages/addtocart/Single-addtocart'
import SearchProduct from '../pages/SearchProduct'
import CheckOut from '../pages/addtocart/CheckOut'
import PaymentView from '../pages/addtocart/PaymentView'
import SuccessPage from '../pages/addtocart/SuccessPage'
import Orders from '../pages/orders/Orders'
import TotalOrders from '../pages/admin/TotalOrders'
// import UploadNavCategory from '../components/UploadNavCategory'
import NavbarCategory from '../pages/admin/NavbarCategory'
import NavCategory from '../category-front/NavCategory'
import UserMessage from '../pages/admin/UserMessage'
// import PaymentView from '../pages/addtocart/paymentView'


export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/online-buy' element={<OnlineBuy />} />
            <Route path='/news' element={<News />} />
            <Route path='/contact-us' element={<ContactUs />} />
            {/* <Route path="/addtocart" element={}/> */}
            <Route path="/checkout/:userId" element={<CheckOut />} />

            <Route path="/navcategory/:id" element={<NavCategory />} />

            {/* category product route */}
            <Route path="/category/:id" element={<CategoryProduct />} />
            <Route path="/category/:id/single-card" element={<SingleAddtocart />} />
            {/* <Route path="/category/:id/checkout/:productName" element={<CheckOut />} /> */}
            <Route path='/cart-view' element={<CartView />} />

            <Route path='/payment/:id' element={<PaymentView />} />

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
                <Route path='navbar-category' element={<NavbarCategory/>}/>
                <Route path='total-orders' element={<TotalOrders />} />
                <Route path='user-message' element={<UserMessage />} />
            </Route>
            <Route path='/success' element={<SuccessPage />} />
            <Route path='/order/:userId' element={<Orders />} />

            {/* single add to cart page route */}


            {/* userProfile */}
            {/* <Route path='/profile' element={<UserProfile />} /> */}
        </Routes >

    )
}
