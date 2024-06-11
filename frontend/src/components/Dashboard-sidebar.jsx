import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AllUser from '../pages/admin/AllUser'
import { useSelector } from 'react-redux'
import ROLE from '../common/role'

export default function DashboardSidebar() {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate();

    //  useEffect(() => {
    //     if (user?.role !== ROLE.ADMIN) {
    //         navigate('/')

    //     }
    // }, [user])



  return (
    <>
     <div className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>Dashbord</h3>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <div className="bg-success rounded-circle  border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">{user?.name}</h6>
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100">
                            <a href="index.html" className="nav-item nav-link active"><i className="fa fa-laptop me-2"></i>Dashboard</a>
                            <Link to="/admin-panel/all-user" className="nav-item nav-link"><i className="fa fa-th me-2"></i><span className='mx-2'>User</span></Link>

                            {/* <Link to="/admin-panel/all-products" className="nav-item nav-link"><i className="fa fa-th me-2"></i></Link> */}
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-th me-2"></i><span className='mx-2'>Products</span></a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <Link to="/admin-panel/all-products" className="dropdown-item">All Products</Link>
                                    <Link to="/admin-panel/home-category" className="dropdown-item">Home products</Link>
                                    <a href="404.html" className="dropdown-item">404 Error</a>
                                    <a href="blank.html" className="dropdown-item">Blank Page</a>
                                </div>
                            </div>
                            <a href="form.html" className="nav-item nav-link"><i className="fa fa-laptop me-2"></i><span className='mx-2'>Forms</span></a>
                            <a href="table.html" className="nav-item nav-link"><i className="fa fa-table me-2"></i><span className='mx-2'>Tables</span></a>
                            <a href="chart.html" className="nav-item nav-link"><i className="fa fa-laptop me-2"></i><span className='mx-2'>Charts</span></a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i><span className='mx-2'>Pages</span></a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <a href="signin.html" className="dropdown-item">Sign In</a>
                                    <a href="signup.html" className="dropdown-item">Sign Up</a>
                                    <a href="404.html" className="dropdown-item">404 Error</a>
                                    <a href="blank.html" className="dropdown-item">Blank Page</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
                {/* <AllUser/> */}
    
    </>
  )
}
