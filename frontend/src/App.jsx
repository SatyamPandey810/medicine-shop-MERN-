import React, { useEffect, useState } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Router from './router/Router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0)

  // fetch current user
  const fetchuserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }


  }

  // fetch add to cart product count 
  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addTocardProductCount.url, {
      method: SummaryApi.addTocardProductCount.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()
    console.log(dataApi);
    setCartProductCount(dataApi?.data?.count)
  }


  useEffect(() => {
    fetchuserDetails()

    fetchUserAddToCart()

  }, [])



  return (
    <>
      <Context.Provider value={{
        fetchuserDetails,   // userDetails fetch
        cartProductCount,   // current user addtocart product count
        fetchUserAddToCart
      }}>
        <ToastContainer position='top-center' />

        <Header />
        <Router />
        <Footer />
      </Context.Provider>
    </>
  )
}
