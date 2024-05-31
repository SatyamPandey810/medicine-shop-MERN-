import React from 'react'
import Header from './layout/Header'
import Footer from './layout/Footer'
import Router from './router/Router'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <ToastContainer />

      <Header />
      <Router />
      <Footer />

    </>
  )
}
