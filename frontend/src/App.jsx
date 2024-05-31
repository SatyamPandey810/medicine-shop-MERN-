import React, { useEffect } from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Router from './router/Router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import Context from './context';

export default function App() {

  const fetchuserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include"
    })
    const dataApi = await dataResponse.json()
    console.log(dataResponse);

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
