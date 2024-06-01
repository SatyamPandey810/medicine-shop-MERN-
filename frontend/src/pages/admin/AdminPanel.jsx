import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKeyboard } from '@fortawesome/free-solid-svg-icons';

export default function AdminPanel() {

    return (
        <div>
            <div className="container-fluid position-relative d-flex p-0">
                <div className="sidebar pe-4 pb-3">
                    <nav className="navbar bg-secondary navbar-dark">
                        <a href="index.html" className="navbar-brand mx-4 mb-3">
                            <h3 className="text-primary"><i className="fa fa-user-edit me-2"></i>Admin panel</h3>
                        </a>
                        <div className="d-flex align-items-center ms-4 mb-4">
                            <div className="position-relative">
                                <img className="rounded-circle" src="img/user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
                                <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1"></div>
                            </div>
                            <div className="ms-3">
                                <h6 className="mb-0">Jhon Doe</h6>
                                <span>Admin</span>
                            </div>
                        </div>
                        <div className="navbar-nav w-100">
                            <a href="index.html" className="nav-item nav-link text-light"><i className="fa fa-tachometer-alt me-2"></i><span className='mx-2'>Dashboard</span></a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown"><i className="fa fa-laptop me-2"></i>Elements</a>
                                <div className="dropdown-menu bg-transparent border-0">
                                    <a href="button.html" className="dropdown-item text-light">Buttons</a>
                                    <a href="typography.html" className="dropdown-item text-light">Typography</a>
                                    <a href="element.html" className="dropdown-item text-light">Other Elements</a>
                                </div>
                            </div>
                            <a href="widget.html" className="nav-item nav-link text-light"><i className="fa fa-th me-2"></i>Widgets</a>
                            <a href="form.html" className="nav-item nav-link text-light"><i className="fa fa-keyboard me-2"></i>Forms</a>
                            <a href="table.html" className="nav-item nav-link text-light"><i className="fa fa-table me-2"></i>Tables</a>
                            <a href="chart.html" className="nav-item nav-link text-light"><i className="fa fa-chart-bar me-2"></i>Charts</a>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle text-light" data-bs-toggle="dropdown"><i className="far fa-file-alt me-2"></i>Pages</a>
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

                <div className="content">
                    <nav className="navbar bg-secondary navbar-expand navbar-dark sticky-top px-4 py-0 d-flex justify-content-between">
                        <a href="index.html" className="navbar-brand d-flex d-lg-none me-4">
                            <h2 className="text-primary mb-0"><i className="fa fa-user-edit"></i></h2>
                        </a>
                       
                        <form className="d-none d-md-flex mx-4">
                            <input className="form-control bg-dark border-0" type="search" placeholder="Search" />
                        </form>
                        <div className="navbar-nav align-items-center ms-auto">
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-envelope me-lg-2"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Message</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                                    
                                 
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <i className="fa fa-bell me-lg-2"></i>
                                    <span className="d-none d-lg-inline-flex text-light">Notificatin</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Profile updated</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">New user added</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item">
                                        <h6 className="fw-normal mb-0">Password changed</h6>
                                        <small>15 minutes ago</small>
                                    </a>
                                    <hr className="dropdown-divider" />
                                    <a href="#" className="dropdown-item text-center">See all notifications</a>
                                </div>
                            </div>
                            <div className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" data-bs-toggle="dropdown">
                                    <img className="rounded-circle me-lg-2" src="img/user.jpg" alt="" style={{ width: "40px", height: "40px" }} />
                                    <span className="d-none d-lg-inline-flex">John Doe</span>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                                    <a href="#" className="dropdown-item">My Profile</a>
                                    <a href="#" className="dropdown-item">Settings</a>
                                    <a href="#" className="dropdown-item">Log Out</a>
                                </div>
                            </div>
                        </div>
                    </nav>

                  


                    <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
                </div>
            </div>
        </div>
    )
}
