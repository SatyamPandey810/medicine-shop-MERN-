import React, { useState } from 'react'
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'font-awesome/css/font-awesome.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export default function Login() {
    const [showpassword, setShowpassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: ''
    });
    let { email, password } = data

    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };

    const inputChange = (event) => {
        setData((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }
    const submit = (event) => {
        event.preventDefault();
    }

    console.log(data);
    return (
        <div>
            <section className="login-block">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Login Now</h2>
                            <form className="login-form" onSubmit={submit}>
                                <div className="form-group">
                                    <label for="exampleInputEmail1" className="text-uppercase fw-bold fs-6">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder=""
                                        onChange={inputChange}
                                        name='email'
                                        value={data.email}
                                        required />
                                </div>
                                <div className="form-group position-relative">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase fw-bold fs-6">Password</label>
                                    <input
                                        type={showpassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder=""
                                        id="exampleInputPassword1"
                                        onChange={inputChange}
                                        name='password'
                                        value={data.password}
                                    />
                                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>


                                <div className="form-check">
                                    <label className="form-check-label">

                                        <Link to='/login/forgotpassword' className='fw-bold fs-6'>Forgot password</Link>
                                    </label>
                                    <button type="submit" className="btn btn-primary float-right fw-bold">Login</button>
                                </div>

                            </form>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
