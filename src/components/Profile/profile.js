import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

const Profile = () => {
    const default_background_color = { 'backgroundColor': '#2675ff', 'border': '#2675ff' }
    const [userName, setUserName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [userId, setUserId] = useState('')

    const [showA, setShowA] = useState(false);

    const toggleShowA = () => setShowA(!showA);

    const token = localStorage.getItem('userToken');
    useEffect(() => {
        getUserDetails();
    }, []);
    const getUserDetails = () => {
        axios.get('http://54.201.160.69:3282/api/v1/admin/userdetail', {
            headers: {
                Authorization: token
            },
            user_token: token,
        })
            .then(function (response) {
                console.log("response.data.data", response.data);
                setUserName(response.data.data.userName);
                setPhoneNumber(response.data.data.phoneNumber);
                setUserId(response.data.data._id);
            })
            .catch(function (error) {
                // alert('error', error)
            });
    }

    const config = {
        headers: { Authorization: token }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://54.201.160.69:3282/api/v1/admin/updateofuser', {
            user_id: userId,
            userName: userName,
            phoneNumber: phoneNumber
        }, config)
            .then(function (response) {
                const response_status = response.data.status;
                if (response_status == true) {
                    toggleShowA();
                }
                else {

                }
            })
            .catch(function (error) {
            });
    }

    return (
        <>

            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <ToastContainer position="top-end" className="p-3" delay={3000} autohide>
                            <Toast show={showA} onClose={toggleShowA} bg='success'>
                                <Toast.Header>
                                    <strong className="me-auto">Success</strong>
                                    {/* <small>11 mins ago</small> */}
                                </Toast.Header>
                                <Toast.Body>User details updated successfully</Toast.Body>
                            </Toast>
                        </ToastContainer>
                        <section>
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Profile Setting</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item">
                                                <a href="#">Home</a>
                                            </li>
                                            <li className="breadcrumb-item active">User Profile</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                            {/* /.container-fluid */}
                        </section>
                        {/* Main content */}
                        <section className="content mt-5">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-3">
                                        {/* Profile Image */}
                                        <div className="card card-primary card-outline">
                                            <div className="card-body box-profile">
                                                <div className="text-center">
                                                    <img
                                                        className="profile-user-img img-fluid img-circle"
                                                        src="http://54.201.160.69:3282/public/assets/user_media/1675321895612--user.jpg"
                                                        alt="User profile picture"
                                                    />
                                                </div>
                                                <h3 className="profile-username text-center">Admin</h3>
                                                {/* <p className="text-muted text-center">Software Engineer</p> */}
                                                <a href="#" className="btn btn-primary btn-block">
                                                    <b>Upload image</b>
                                                </a>
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="active tab-pane" id="settings">
                                                        <form className="form-horizontal">
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="inputName"
                                                                    className="col-sm-3 col-form-label"
                                                                >
                                                                    Username
                                                                </label>
                                                                <div className="col-sm-9">
                                                                    <input
                                                                        type="email"
                                                                        className="form-control"
                                                                        id="inputName"
                                                                        placeholder="Username"
                                                                        value={userName}
                                                                        onChange={(e) => setUserName(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="inputNumber"
                                                                    className="col-sm-3 col-form-label"
                                                                >
                                                                    Phone Number
                                                                </label>
                                                                <div className="col-sm-9">
                                                                    <input
                                                                        type="number"
                                                                        className="form-control"
                                                                        id="inputNumber"
                                                                        placeholder="Phone Number"
                                                                        value={phoneNumber}
                                                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mt-4">
                                                                <div className="offset-sm-10 col-sm-2">
                                                                    <button type="submit" className="btn btn-block btn-danger" style={default_background_color}
                                                                        onClick={(e) => handleSubmit(e)}
                                                                    >
                                                                        Submit
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                    {/* /.tab-pane */}
                                                </div>
                                                {/* /.tab-content */}
                                            </div>
                                            {/* /.card-body */}
                                        </div>
                                        {/* /.card */}
                                    </div>
                                    {/* /.col */}
                                </div>
                                {/* /.row */}
                            </div>
                            {/* /.container-fluid */}
                        </section>
                        {/* /.content */}
                    </div>
                </div>

            </div>
        </>
    )
}

export default Profile