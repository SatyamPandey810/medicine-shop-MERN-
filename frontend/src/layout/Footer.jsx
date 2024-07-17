import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [allNavProduct, setAllnavProduct] = useState([])


  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getNavProduct.url)
    const dataResponse = await response.json()

    setAllnavProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])


  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">

            <div className="block-7">
              <h3 className="footer-heading mb-4">About Us</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius quae reiciendis distinctio voluptates
                sed dolorum excepturi iure eaque, aut unde.</p>
            </div>

          </div>
          <div className="col-lg-3 mx-auto mb-5 mb-lg-0">
            <h3 className="footer-heading mb-4">Quick Links</h3>
            <ul className="list-unstyled text-capitalize">
              {
                allNavProduct.map((products, index) => (
                  <li key={index}><Link to={`/navcategory/${products?._id}`}>{products.name}</Link></li>
                ))
              }
            </ul>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="block-5 mb-5">
              <h3 className="footer-heading mb-4">Contact Info</h3>
              <ul className="list-unstyled">
                <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                <li className="email">emailaddress@domain.com</li>
              </ul>
            </div>


          </div>
        </div>
        <div className="row pt-5 mt-5 text-center">
          <div className="col-md-12">
            <p>
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
              Copyright &copy;
              <script>document.write(new Date().getFullYear());</script> All rights reserved
              {/* <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. --> */}
            </p>
          </div>

        </div>
      </div>
    </footer>
  )
}
