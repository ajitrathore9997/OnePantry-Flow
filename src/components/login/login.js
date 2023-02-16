import React from 'react'
import loginCss from "./login.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

const Login = () => {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [bgColor, setToastBgColor] = useState('');
    const [toastMsg, setToastMsg] = useState('');
    const navigate = useNavigate();
    const [username, setNameValue] = useState("");
    const [password, setPasswordValue] = useState("");
    const setName = (e) => {
        setNameValue(e.target.value)
    }

    const setPassword = (e) => {
        setPasswordValue(e.target.value)
    }
    const login = (e) => {
        e.preventDefault();

        if ('' == username) {
            setToastBgColor('danger');
            setToastMsg('Please enter Username');
            toggleShowA();
            return false;
        }
        if ('' == password) {
            setToastBgColor('danger');
            setToastMsg('Please enter Password');
            toggleShowA();
            return false;
        }

        // const isFormValid = formValidation();
        // if (isFormValid != true) {
        //     return false;
        // }
        axios.post('http://54.201.160.69:3282/api/v1/admin/signIn', {
            email: username,
            password: password
        })
            .then(function (response) {
                const response_status = response.data.status;
                if (response_status == true) {
                    localStorage.setItem('userToken', response.data.data.token);
                    setToastBgColor('success');
                    setToastMsg('Logged In Successfully');
                    toggleShowA();
                    setTimeout(() => {
                        navigate("/");
                    }, 2000)
                }
                else {

                }
            })
            .catch(function (error) {
            });
    }

    const handleForgotPassword = () => {
        navigate("/forgot_password");
    }

    // const formValidation = () => {
    //     if ('' == username) {
    //         setValidationUsername("invalid");
    //         return false;
    //     }
    //     else {
    //         setValidationUsername("");
    //     }
    //     if ('' == password) {
    //         setValidationPassword("invalid");
    //         return false;
    //     }
    //     else {
    //         setValidationPassword("");
    //     }
    //     return true;
    // }

    const default_background_color = { 'backgroundColor': '#2675ff', 'border': '#2675ff', 'color': '#fff' }
    const default_color = { 'color': '#2675ff', 'fontSize': '15px', 'cursor': 'pointer' }
    const cursor = { 'cursor': 'pointer' }
    return (
        <>
            <ToastContainer position="top-end" className="p-3" delay={3000} autohide>
                <Toast show={showA} onClose={toggleShowA} bg={bgColor} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMsg}</Toast.Body>
                </Toast>
            </ToastContainer>
            <div className={`${loginCss.wrapper} ${loginCss.first}`}>
                <div id={loginCss.formContent}>

                    <div className={`${loginCss.fadeIn} ${loginCss.first}`}>
                        {/* <img src="https://t3.ftcdn.net/jpg/03/03/71/14/360_F_303711499_7o9BGpaDFaJJiOS2RLTY8i9xICgorT3o.jpg" id="icon" alt="User Icon" style={{ width: "100px", height: "100px", padding: "2%" }} /> */}
                        <h3 className='mt-4'><b>OnePantry</b></h3>
                        <h6 style={{ 'color': 'grey' }}>Sign in to start your session</h6>
                    </div>

                    <div id="login">
                        {/* <h3 className="text-center text-white">Login form</h3> */}
                        <div className="container">
                            <div
                                id="login-row"
                                className="row justify-content-center align-items-center"
                            >
                                <div id="login-column" className="col-md-10">
                                    <div id="login-box" className="col-md-12">
                                        <form id="login-form" className="form" action="" method="post">
                                            {/* <h3 className="text-center text-info">Login</h3> */}
                                            <div className="form-group mt-4">
                                                {/* <label htmlFor="username" className="text-info">
                                                    Username:
                                                </label>
                                                <br /> */}
                                                <input
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    className="form-control"
                                                    placeholder='Username'
                                                    onChange={(e) => setName(e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                {/* <label htmlFor="password" className="text-info">
                                                    Password:
                                                </label>
                                                <br /> */}
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    className="form-control"
                                                    placeholder='Password'
                                                    onChange={(e) => setPassword(e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <span>
                                                            <input id="remember-me" name="remember-me" type="checkbox" />
                                                        </span>&nbsp;
                                                        <span><b>Remember me</b></span>
                                                    </div>
                                                    <div className='col-md-6'>
                                                        <button className="btn btn-info btn-md" style={default_background_color} onClick={(e) => login(e)}>Sign In</button>
                                                    </div>
                                                </div>
                                                <div className='row'>
                                                    <div className='col-md-6'>
                                                        <a onClick={() => handleForgotPassword()} style={default_color}>

                                                        </a>
                                                    </div>
                                                    <div className='col-md-6'>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div id={loginCss.formFooter}>
                        <a className={loginCss.underlineHover} onClick={() => handleForgotPassword()} style={cursor}>
                            Forgot Password?
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login