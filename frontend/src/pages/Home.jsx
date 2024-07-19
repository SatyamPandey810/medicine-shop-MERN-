import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import SummaryApi from '../common';
import { Oval } from 'react-loader-spinner'


export default function Home() {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState()
  const [allNavProduct, setAllnavProduct] = useState([])
  const [data, setData] = useState([])




  const fetchProductCategory = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.getHomeCategoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
    // console.log(dataResponse.data);
  }

  useEffect(() => {
    fetchProductCategory()
  }, [])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getNavProduct.url)
    const dataResponse = await response.json()

    setAllnavProduct(dataResponse?.data || [])
  }
  // contact message functions
  const fetchData = async () => {
    const response = await fetch(SummaryApi.getContactUs.url, {
      method: SummaryApi.getContactUs.method,
      credentials: "include",

    });
    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data)
    }
  }
  // console.log(data);
  useEffect(() => {
    fetchAllProduct()
    fetchData()
  }, [])

  return (
    <div className="site-wrap">
      <div className="site-blocks-cover" style={{ backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('images/banner.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
              <div className="site-block-cover-content text-center">
                <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
                <h1>Welcome To Zelon pharma</h1>
                <p>
                  <Link to='/' className="btn btn-primary px-5 py-3">Shop Now</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row align-items-stretch section-overlap">
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap bg-primary h-100">
                <span className="h-100">
                  <h5>Free <br /> Shipping</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap h-100">
                <span className="h-100">
                  <h5>Season <br /> Sale 50% Off</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </span>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap bg-warning h-100">
                <span className="h-100">
                  <h5>Buy <br /> A Gift Card</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section ">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Products categories</h2>
            </div>
          </div>
          <div className="row">
            {
              loading ? (
                <Oval
                  visible={true}
                  height="50"
                  width="50"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                categoryProduct?.map((product, index) => (
                  <div className="col-sm-6 col-lg-4 text-center item mb-4" key={index}>
                    <img src={product?.productCategoryimage} alt="img" className='popular-img' />
                    <div className='mt-4'>
                      <h3 className="text-dark text-capitalize">{product?.productCategoryName}</h3>                      
                      <Link to={`/category/${product?._id}`}>
                        <h3 className='text-dark btn btn-primary fw-bold'>
                          Shop now  <FontAwesomeIcon icon={faAnglesRight} style={{ fontSize: "18px" }} />
                        </h3>
                      </Link>
                    </div>
                  </div>
                )))
            }
          </div>
        </div>
      </div>
      <div className="site-section bg-light">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">New Products</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 block-3 products-wrap">
              <OwlCarousel className="owl-theme item" items={4} loop margin={8} nav dotClass="owl-dot">
                {
                  allNavProduct.map((product, index) => (
                    <div key={index} className="card items" style={{width: "100%"}}>
                      <img src={product?.image} className="card-img-top" alt="img"/>
                        <div className="card-body">
                          <h5 className="card-title text-capitalize">{product?.name}</h5>
                          <Link to={`/navcategory/${product?._id}`} >Shop now</Link>
                        </div>
                    </div>                   
                  ))
                }
              </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Testimonials</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 block-3 products-wrap">
              <div className="nonloop-block-3 no-direction owl-carousel d-flex">
                {
                  data.map((el, index) => (
                    <div key={index} className="testimony">
                      <blockquote>
                        <img src="images/user.png" alt="img" className="img-fluid w-25 mb-4 rounded-circle" />
                        <p>{el?.message}</p>
                      </blockquote>
                      <p className='text-capitalize'>&mdash; {el?.name}</p>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section bg-secondary bg-image" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_1.jpg')" }}>
                <div className="banner-1-inner align-self-center">
                  <h2>Pharma Products</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/discount.jpg')" }}>
                <div className="banner-1-inner ml-auto  align-self-center">
                  <h2>Rated by Experts</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
