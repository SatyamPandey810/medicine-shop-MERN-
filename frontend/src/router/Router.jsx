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

export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/medicine' element={<Medicine />} />
            <Route path='/online-buy' element={<OnlineBuy />} />
            <Route path='/news' element={<News />} />
            <Route path='/contact-us' element={<ContactUs />} />

            {/* nasted route */}
            <Route path='/category'>
                <Route path="health" element={<HealthProduct />} />
            </Route>
            <Route path='/login'>
                <Route path='' element={<Login />} />
                <Route path='forgotpassword' element={<ForgotPassword />} />
            </Route>
            <Route path='/signup' element={<Signup />} />

            <Route path='*' element={<PageNotFound />} />

            {/* admin panel route */}
            <Route path='/admin-panel'>
                <Route path='' element={<AdminPanel />} />
                <Route path='all-user' element={<AllUser />} />
            </Route>



            {/* userProfile */}
            {/* <Route path='/profile' element={<UserProfile />} /> */}
        </Routes>

    )
}
