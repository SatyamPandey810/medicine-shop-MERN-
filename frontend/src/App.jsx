import React, { useEffect } from 'react'
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
  useEffect(() => {
    fetchuserDetails()


  }, [])



  return (
    <>
      <Context.Provider value={{
        fetchuserDetails
      }}>
        <ToastContainer />

        <Header />
        <Router />
        <Footer />
      </Context.Provider>
    </>
  )
}
