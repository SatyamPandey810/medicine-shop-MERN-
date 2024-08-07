import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context';


export default function Header() {
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const [search, setSearch] = useState(searchInput?.search?.split("=")[1])
  const [allNavProduct, setAllnavProduct] = useState([])

  // console.log("searchInput", searchInput);

  const disaptch = useDispatch();
  const user = useSelector(state => state?.user?.user)
  const userId = user?._id;
  // console.log(user);

  const userLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include"
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      disaptch(setUserDetails(null))
    }

    if (data.error) {
      toast.error(data.message)
    }

  }
  // search fanctonallty
  const handleSearch = (event) => {
    const { value } = event.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate('/search')
    }

  }

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.getNavProduct.url)
    const dataResponse = await response.json()

    setAllnavProduct(dataResponse?.data || [])
  }
  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className="site-navbar py-2">
      <div className="search-wrap">
        <div className="container">
          <Link to="/" className="search-close js-search-close"><span className="icon-close2"></span></Link>
          <form action="#" method="post">
            <input type="text" className="form-control" placeholder="Search keyword and hit enter..." onChange={handleSearch} value={search} />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <Link to="/" className="js-logo-clone">
                <img src='/images/logo.png' width={100} height={100} alt="img" />
                <span>Zelon pharma</span>
              </Link>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav className="site-navigation text-right text-md-center" role="navigation">
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li className="active"><Link to="/">Home</Link></li>
                {/* <li><Link to="/">Store</Link></li> */}
                <li className="has-children">
                  <Link to="/">Shop</Link>
                  <ul className="dropdown">
                    {
                      allNavProduct.map((products,index)=>(
                         <li key={index}><Link to={`/navcategory/${products?._id}`} className=' text-capitalize'>{products.name}</Link></li>
                      ))
                    }                  
                  </ul>
                </li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact-us">Contact</Link></li>

                <li className="has-children">
                  <Link to=""> <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} /> Account</Link>
                  <ul className="dropdown">
                    <li>{
                      user?._id ? (
                        <Link to={`/order/${userId}`}>Your order</Link>
                      ) : (<></>)
                    }</li>
                    <li> {
                      user?._id ? (
                        <Link onClick={userLogout} to={'/login'} >Logout</Link>
                      ) : (<Link to='/login'>Login</Link>)
                    }</li>
                    <li><Link to='/signup'>Sign up</Link></li>

                  </ul>
                </li>
                <li><Link to="/cart-view" className="icons-btn d-inline-block bag mx-3">
                  <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "26px" }} />
                  {
                    user?._id && user?._id.length > 0 ? (
                      <span className="number">{context.cartProductCount}</span>
                    ) : <span className="number">0</span>
                  }
                </Link></li>

              </ul>

            </nav>
           
          </div>

          <div className="icons">
            <Link to="/" className="icons-btn d-inline-block js-search-open"><span className="icon-search"></span></Link>
            {/* <a href="cart.html" className="icons-btn d-inline-block bag">

            </a> */}
            <Link to="/" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"><span
              className="icon-menu"></span></Link>
          </div>
        </div>
      </div>
    </div>

    // <div className="site-navbar py-2">
    //   <div className="search-wrap">
    //     <div className="container">
    //       <a href="#" className="search-close js-search-close"><span className="icon-close2"></span></a>
    //       <form action="#" method="post">
    //         <input type="text" className="form-control" placeholder="Search keyword and hit enter..." />
    //       </form>
    //     </div>
    //   </div>

    //   <div className="container">
    //     <div className="d-flex align-items-center justify-content-between">
    //       <div className="logo">
    //         <div className="site-logo">
    //           <a href="index.html" className="js-logo-clone">Pharma</a>
    //         </div>
    //       </div>
    //       <div className="main-nav d-none d-lg-block">
    //         <nav className="site-navigation text-right text-md-center" role="navigation">
    //           <ul className="site-menu js-clone-nav d-none d-lg-block">
    //             <li className="active"><Link to="/">Home</Link></li>
    //             <li><Link to="/">Store</Link></li>
    //             <li className="has-children">
    //               <a href="#">Shop</a>
    //               <ul className="dropdown">
    //                 <li><a href="#">Supplements</a></li>
    //                 <li className="has-children">
    //                   <a href="#">Vitamins</a>
    //                   <ul className="dropdown">
    //                     <li><a href="#">Supplements</a></li>
    //                     <li><a href="#">Vitamins</a></li>
    //                     <li><a href="#">Diet &amp; Nutrition</a></li>
    //                     <li><a href="#">Tea &amp; Coffee</a></li>
    //                   </ul>
    //                 </li>
    //                 <li><a href="#">Diet &amp; Nutrition</a></li>
    //                 <li><a href="#">Tea &amp; Coffee</a></li>
    //               </ul>
    //             </li>
    //             <li><Link to="/about">About</Link></li>
    //             <li><Link to="/contact-us">Contact</Link></li>
    //           </ul>
    //         </nav>
    //       </div>
    //       <div className="icons d-flex justify-content-center align-items-center">
    //         <Dropdown>
    //           <Dropdown.Toggle variant="success" id="dropdown-basic" className='drop-btn'>
    //             <FontAwesomeIcon icon={faUser} style={{ fontSize: "26px" }} />
    //             &nbsp; account
    //           </Dropdown.Toggle>
    //           <Dropdown.Menu>
    //             <Dropdown.Item>
    //               {user?._id ? (<Link to="/profile">Profile</Link>) : (<></>)}
    //             </Dropdown.Item>
    //             <Dropdown.Item>
    //               {user?._id ? (<Link onClick={userLogout} to={'/'}>Logout</Link>) : (<Link to='/login'>Login</Link>)}
    //             </Dropdown.Item>
    //             <Dropdown.Item><Link to='/signup'>Sign up</Link></Dropdown.Item>
    //           </Dropdown.Menu>
    //         </Dropdown>
    //         <div>
    //           <Link to="/cart-view" className="icons-btn d-inline-block bag mx-3">
    //             <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "26px" }} />
    //             {user?._id && user?._id.length > 0 ? (<span className="number">{context.cartProductCount}</span>) : <span className="number">0</span>}
    //           </Link>
    //         </div>
    //       </div>
    //       <a href="#" className="site-menu-toggle js-menu-toggle d-inline-block d-lg-none"><span className="icon-menu"></span></a>
    //     </div>
    //   </div>
    // </div>
  )
}
