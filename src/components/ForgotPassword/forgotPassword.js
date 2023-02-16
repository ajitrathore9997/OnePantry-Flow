import React from 'react'
import loginCss from "./forgot.module.css"
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

const ForgotPassword = () => {
    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const navigate = useNavigate();
    const [userEmail, setEmailValue] = useState("");
    const setEmail = (e) => {
        setEmailValue(e.target.value)
    }

    const [bgColor, setToastBgColor] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // alert(userEmail);
        // toggleShowA();
        // return false;
        axios.post('http://54.201.160.69:3282/api/v1/admin/forgetpassword', {
            email: userEmail,
        })
            .then(function (response) {
                console.log(response.data.status);
                const response_status = response.data.status;
                if (response_status == true) {
                    setToastBgColor('success');
                    setToastMsg('Your password is send on email successfully');
                    toggleShowA();
                }
                else {

                }
            })
            .catch(function (error) {
                console.log(error.response.status);
                if (401 == error.response.status) {
                    setToastBgColor('danger');
                    setToastMsg('Invalid Credentials');
                    toggleShowA();
                }
            });
    }
    const handleLogin = () => {
        navigate("/login");
    }
    const default_background_color = { 'backgroundColor': '#2675ff', 'border': '#2675ff', 'color': '#fff' }
    const default_color = { 'color': '#2675ff', 'fontSize': '15px', 'cursor': 'pointer' }
    const cursor = { 'cursor': 'pointer' }
    return (
        <>
            <ToastContainer position="top-end" className="p-3" delay={3000} autohide>
                <Toast show={showA} onClose={toggleShowA} bg={bgColor}>
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
                        <h6 style={{ 'color': 'grey' }}>Please enter registered Email Id</h6>
                    </div>

                    <div id="login">
                        {/* <h3 className="text-center text-white">Login form</h3> */}
                        <div className="container">
                            <div
                                id="login-row"
                                className="row justify-content-center align-items-center"
                            >
                                <div id="login-column" className="col-md-12">
                                    <div id="login-box" className="col-md-12">
                                        <form id="login-form" className="form" action="" method="post">
                                            <div className="form-group mt-4">
                                                <input
                                                    type="email"
                                                    name="userEmail"
                                                    id="userEmail"
                                                    className="form-control"
                                                    placeholder='Email Id'
                                                    onChange={(e) => setEmail(e)}
                                                />
                                            </div>

                                            <div className="form-group">
                                                <div className='row'>
                                                    <div className='col-md-12'>
                                                        <button className="btn btn-info btn-md" style={default_background_color} onClick={(e) => handleForgotPassword(e)}>Reset</button>
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
                        <a className={loginCss.underlineHover} onClick={() => handleLogin()} style={cursor}>
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword