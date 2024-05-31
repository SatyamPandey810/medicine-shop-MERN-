import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, json } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

export default function Signup() {
    const [showpassword, setShowpassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    let { name, email, password, confirmPassword } = data

    const togglePasswordVisibility = () => {
        setShowpassword(!showpassword);
    };
    const togglePasswordVisibility2 = () => {
        setshowConfirmPassword(!showConfirmPassword);
    };

    const inputChange = (event) => {
        setData((prevValue) => ({
            ...prevValue,
            [event.target.name]: event.target.value
        }))
    }


    const submit = async (event) => {
        event.preventDefault();
        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json()
            toast(dataApi.message)
            console.log(dataApi);
        } else {
            console.log('please check password and confirm password');
        }



    }
    return (
        <div>
            <section className="login-block">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Sign Now</h2>
                            <form className="login-form" onSubmit={submit}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail" className="text-uppercase fw-bold fs-6">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your name"
                                        onChange={inputChange}
                                        name='name'
                                        value={data.name}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase fw-bold fs-6">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
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
                                        placeholder="Password"
                                        id="exampleInputPassword1"
                                        onChange={inputChange}
                                        name='password'
                                        value={data.password}
                                        required
                                    />
                                    <span className="password-toggle-icon" onClick={togglePasswordVisibility}>
                                        <FontAwesomeIcon icon={showpassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>
                                <div className="form-group position-relative">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase fw-bold fs-6">Confirm password</label>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        className="form-control"
                                        placeholder="Confirm password"
                                        id="exampleInputPassword"
                                        onChange={inputChange}
                                        name='confirmPassword'
                                        value={data.confirmPassword}
                                        required
                                    />
                                    <span className="password-toggle-icon" onClick={togglePasswordVisibility2}>
                                        <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
                                    </span>
                                </div>


                                <div className="form-check d-flex justify-content-center">
                                    <button className="btn btn-primary fw-bold">Sign Up</button>
                                </div>
                            </form>
                            <div className='text-center mt-4'>
                                <p>I have an account <Link to={'/login'}><span>Login</span></Link></p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </div>
    )
}
