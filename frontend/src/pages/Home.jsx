import React, { useEffect, useState } from 'react'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import SummaryApi from '../common';
import { Oval, TailSpin } from 'react-loader-spinner'


export default function Home() {
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState()



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




  return (
    <div className="site-wrap">


      <div className="site-blocks-cover" style={{ backgroundImage: "url('images/hero_1.jpg')" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 mx-auto order-lg-2 align-self-center">
              <div className="site-block-cover-content text-center">
                <h2 className="sub-title">Effective Medicine, New Medicine Everyday</h2>
                <h1>Welcome To Zelon pharma</h1>
                <p>
                  <a href="#" className="btn btn-primary px-5 py-3">Shop Now</a>
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
                <a href="#" className="h-100">
                  <h5>Free <br /> Shipping</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap h-100">
                <a href="#" className="h-100">
                  <h5>Season <br /> Sale 50% Off</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </a>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 mb-4 mb-lg-0">
              <div className="banner-wrap bg-warning h-100">
                <a href="#" className="h-100">
                  <h5>Buy <br /> A Gift Card</h5>
                  <p>
                    Amet sit amet dolor
                    <strong>Lorem, ipsum dolor sit amet consectetur adipisicing.</strong>
                  </p>
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="site-section p-4">
        <div className="container-fluid">
          <div className="row">
            <div className="title-section text-center col-12">
              <h2 className="text-uppercase">Popular Products</h2>
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
                    {/* <span className="tag">30% OFF</span> */}
                    <img src={product?.productCategoryimage} alt="Image" className='popular-img' />
                    <div className='mt-4'>
                      <h3 className="text-dark text-capitalize">{product?.productCategoryName}</h3>
                      {/* <p className="price">{product?.productCategoryDescription}</p> */}


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
              <OwlCarousel items={3} className="owl-theme" loop nav margin={8} >
                <div className="text-center item mb-4">
                  <a href="shop-single.html"> <img src="images/product_03.png" alt="Image" /></a>
                  <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4">
                  <a href="shop-single.html"> <img src="images/product_01.png" alt="Image" /></a>
                  <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4">
                  <a href="shop-single.html"> <img src="images/product_02.png" alt="Image" /></a>
                  <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                  <p className="price">$120.00</p>
                </div>

                <div className="text-center item mb-4">
                  <a href="shop-single.html"> <img src="images/product_04.png" alt="Image" /></a>
                  <h3 className="text-dark"><a href="shop-single.html">Umcka Cold Care</a></h3>
                  <p className="price">$120.00</p>
                </div>
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
              <div className="nonloop-block-3 no-direction owl-carousel">

                <div className="testimony">
                  <blockquote>
                    <img src="images/person_1.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                    <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat unde.&rdquo;</p>
                  </blockquote>

                  <p>&mdash; Kelly Holmes</p>
                </div>

                <div className="testimony">
                  <blockquote>
                    <img src="images/person_2.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                    <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                      obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                      unde.&rdquo;</p>
                  </blockquote>

                  <p>&mdash; Rebecca Morando</p>
                </div>

                <div className="testimony">
                  <blockquote>
                    <img src="images/person_3.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                    <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                      obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                      unde.&rdquo;</p>
                  </blockquote>

                  <p>&mdash; Lucas Gallone</p>
                </div>

                <div className="testimony">
                  <blockquote>
                    <img src="images/person_4.jpg" alt="Image" className="img-fluid w-25 mb-4 rounded-circle" />
                    <p>&ldquo;Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nemo omnis voluptatem consectetur quam tempore
                      obcaecati maiores voluptate aspernatur iusto eveniet, placeat ab quod tenetur ducimus. Minus ratione sit quaerat
                      unde.&rdquo;</p>
                  </blockquote>

                  <p>&mdash; Andrew Neel</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-section bg-secondary bg-image" style={{ backgroundImage: "url('images/bg_2.jpg')" }}>
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/bg_1.jpg')" }}>
                <div className="banner-1-inner align-self-center">
                  <h2>Pharma Products</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('images/discount.jpg')" }}>
                <div className="banner-1-inner ml-auto  align-self-center">
                  <h2>Rated by Experts</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>



    </div>
  )
}
