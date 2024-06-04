import React from 'react'
import { Link } from 'react-router-dom'
import AllUser from '../pages/admin/AllUser'

export default function DashboardSidebar() {
  return (
    <>
     <div className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>DarkPan</h3>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Jhon Doe</h6>
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100">
                            <a href="index.html" className="nav-item nav-link active"><i className="fa fa-laptop me-2"></i>Dashboard</a>
                            <Link to="/admin-panel/all-user" className="nav-item nav-link"><i className="fa fa-th me-2"></i>User</Link>

                            <a href="widget.html" className="nav-item nav-link"><i className="fa fa-th me-2"></i>Widgets</a>
                            <a href="form.html" className="nav-item nav-link"><i className="fa fa-laptop me-2"></i>Forms</a>
                            <a href="table.html" className="nav-item nav-link"><i className="fa fa-table me-2"></i>Tables</a>
                            <a href="chart.html" className="nav-item nav-link"><i className="fa fa-laptop me-2"></i>Charts</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Pages</a>
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
