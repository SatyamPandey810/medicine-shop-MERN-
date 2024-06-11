import React, { useEffect, useRef, useState } from 'react'
import 'nouislider/dist/nouislider.css';
import noUiSlider from 'nouislider';
import SummaryApi from '../common';
import SearchBar from '../components/SearchBar';

export default function CosmaticsProduct() {
  const [rangeValues, setRangeValues] = useState([20, 80]);
  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setLoading] = useState(false)

  const sliderRef = useRef(null);
  const amountRef = useRef(null);

  // product category lisiting

  const fetchCategoryProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url)
    const dataResponse = await response.json()
    console.log(dataResponse);
    setCategoryProduct(dataResponse.data)
  }

  useEffect(() => {
    fetchCategoryProduct()
  }, [])
  // range value customziation
  useEffect(() => {
    if (!sliderRef.current) return;

    noUiSlider.create(sliderRef.current, {
      start: rangeValues,
      connect: true,
      range: {
        min: 0,
        max: 1000
      }
    });

    sliderRef.current.noUiSlider.on('update', (values, handle) => {
      setRangeValues(values.map(value => Math.round(value)));
    });

    return () => {
      if (sliderRef.current && sliderRef.current.noUiSlider) {
        sliderRef.current.noUiSlider.destroy();
      }
    };
  }, [])

  useEffect(() => {
    if (amountRef.current) {
      amountRef.current.value = `${rangeValues[0]} - ${rangeValues[1]}`;
    }
  }, [rangeValues])


  
  return (
    <div>
     

      <div className="site-section">
        <div className="container">
          <div className="row">
            <div className='col-md-12'>

            <SearchBar/>
            </div>
            {/* <div className="col-lg-6">
              <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Price</h3>
              <div id="slider-range" ref={sliderRef} classNameName="border-primary"></div>
              <div className='d-flex mt-3 align-items-center c-d'>
                <span>₹</span>  <input

                  type="text"
                  name="text"
                  id="amount"
                  className="form-control-input border-0 pl-0 bg-white"
                  ref={amountRef}
                  // value={`&#x20B9; ${amount}`}
                  disabled
                />   <span>₹</span>
              </div>             
            </div> */}
            {/* <div className="col-lg-6">
              <h3 className="mb-3 h6 text-uppercase text-black d-block">Filter by Reference</h3>
              <button type="button" className="btn btn-secondary btn-md dropdown-toggle px-4" id="dropdownMenuReference"
                data-toggle="dropdown">Reference</button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuReference">
                <a className="dropdown-item" href="#">Relevance</a>
                <a className="dropdown-item" href="#">Name, A to Z</a>
                <a className="dropdown-item" href="#">Name, Z to A</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Price, low to high</a>
                <a className="dropdown-item" href="#">Price, high to low</a>
              </div>
            </div> */}
          </div>
          
          <div className="row">
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              {/* <div className='card'>
              <span className="tag">Sale</span>
              <a href="shop-single.html"> <img src="/images/product_01.png" alt="Image" /></a>
              <h3 className="text-dark"><a href="shop-single.html">Bioderma</a></h3>
              <p className="price"><del>95.00</del> &mdash; $55.00</p>
              </div> */}
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_01.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                      <a href=""></a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_02.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>


                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_03.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">

              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_04.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_05.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_05.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_06.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_07.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="/images/product_1.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-6 col-lg-4 text-center item mb-4">

              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-4 text-center item mb-4">
              <div class="product-card">
                <div class="badge">Hot</div>
                <div class="product-tumb">
                  <img src="https://i.imgur.com/xdbHo4E.png" alt="" />
                </div>
                <div class="product-details">
                  <span class="product-catagory">Women,bag</span>
                  <h4><a href="">Women leather bag</a></h4>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero, possimus nostrum!</p>
                  <div class="product-bottom-details">
                    <div class="product-price"><small>$96.00</small>$230.99</div>
                    <div class="product-links">
                      {/* <a href=""><i class="fa fa-heart"></i></a> */}
                      <button className='btn btn-primary'><i class="fa fa-shopping-cart"></i> Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <div className="site-block-27">
                <ul>
                  <li><a href="#">&lt;</a></li>
                  <li className="active"><span>1</span></li>
                  <li><a href="#">2</a></li>
                  <li><a href="#">3</a></li>
                  <li><a href="#">4</a></li>
                  <li><a href="#">5</a></li>
                  <li><a href="#">&gt;</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="site-section bg-secondary bg-image" style={{ backgroundImage: "url('/images/bg_2.jpg')" }}>
        <div className="container">
          <div className="row align-items-stretch">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('/images/bg_1.jpg')" }}>
                <div className="banner-1-inner align-self-center">
                  <h2>Pharma Products</h2>
                  <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae ex ad minus rem odio voluptatem.
                  </p>
                </div>
              </a>
            </div>
            <div className="col-lg-6 mb-5 mb-lg-0">
              <a href="#" className="banner-1 h-100 d-flex" style={{ backgroundImage: "url('/images/bg_2.jpg')" }}>
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
