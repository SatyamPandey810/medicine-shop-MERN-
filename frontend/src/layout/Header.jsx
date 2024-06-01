import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Dropdown from 'react-bootstrap/Dropdown';
import { setUserDetails } from '../store/userSlice';


export default function Header() {
  
  const disaptch = useDispatch();
  const user = useSelector(state => state?.user?.user)
  console.log('userHeader', user);

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
  return (
    <div className="site-navbar py-2">

      <div className="search-wrap">
        <div className="container">
          <a href="#" className="search-close js-search-close"><span className="icon-close2"></span></a>
          <form action="#" method="post">
            <input type="text" className="form-control" placeholder="Search keyword and hit enter..." />
          </form>
        </div>
      </div>

      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          <div className="logo">
            <div className="site-logo">
              <a href="index.html" className="js-logo-clone">Pharma</a>
            </div>
          </div>
          <div className="main-nav d-none d-lg-block">
            <nav className="site-navigation text-right text-md-center" role="navigation">
              <ul className="site-menu js-clone-nav d-none d-lg-block">
                <li className="active"><Link to="/">Home</Link></li>
                <li><Link to="/">Store</Link></li>
                <li className="has-children">
                  <a href="#">Shop</a>
                  <ul className="dropdown">
                    <li><a href="#">Supplements</a></li>
                    <li className="has-children">
                      <a href="#">Vitamins</a>
                      <ul className="dropdown">
                        <li><a href="#">Supplements</a></li>
                        <li><a href="#">Vitamins</a></li>
                        <li><a href="#">Diet &amp; Nutrition</a></li>
                        <li><a href="#">Tea &amp; Coffee</a></li>
                      </ul>
                    </li>
                    <li><a href="#">Diet &amp; Nutrition</a></li>
                    <li><a href="#">Tea &amp; Coffee</a></li>

                  </ul>
                </li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact-us">Contact</Link></li>
              </ul>
            </nav>
          </div>
          <div className="icons d-flex justify-content-center align-items-center">
            {/* <a href="#" className="icons-btn d-inline-block js-search-open"><span className="icon-search"></span></a>
           
            <a href="#" className="site-menu-toggle js-menu-toggle ml-3 d-inline-block d-lg-none"><span
              className="icon-menu"></span></a> */}
            {/* <Link className='btn btn-warning mx-5'>Login</Link> */}
            {/* <Link to="/login" className='mx-3'> <FontAwesomeIcon icon={faUser} style={{ fontSize: "26px", textTransform: "capitalize" }} /> <span style={{ fontSize: "20px" }}>
              {
                user?.name ? (
                  user.name
                ) : (
                  "Login"
                )
              }

            </span> </Link> */}
            <Dropdown >
              <Dropdown.Toggle variant="success" id="dropdown-basic" className='drop-btn'>
                <FontAwesomeIcon icon={faUser} style={{ fontSize: "26px" }} />
                &nbsp; account

              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  {
                    user?._id ? (
                      <Link to="">Profile</Link>
                    ) : (<></>)
                  }
                </Dropdown.Item>
                <Dropdown.Item>
                  {
                    user?._id ? (
                      <span onClick={userLogout}>Logout</span>
                    ) : (<Link to='/login'>Login</Link>)
                  }
                </Dropdown.Item>
                <Dropdown.Item><Link to='/signup'>Sign up</Link></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <div>
              <Link to="/" className="icons-btn d-inline-block bag mx-3">
                {/* <span className="icon-shopping-bag"></span> */}
                <FontAwesomeIcon icon={faCartShopping} style={{ fontSize: "26px" }} />
                <span className="number">2</span>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
