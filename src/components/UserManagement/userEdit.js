import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';

const UserEdit = () => {

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);
    const [bgColor, setToastBgColor] = useState('');
    const [toastMsg, setToastMsg] = useState('');

    const default_background_color = { 'backgroundColor': '#2675ff', 'border': '#2675ff' }
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userPhoneNumber, setPhoneNumber] = useState('')
    const [userId, setUserId] = useState('')

    const token = localStorage.getItem('userToken');
    useEffect(() => {
        getUserDetails();
    }, []);


    const config = {
        headers: { Authorization: token }
    };

    const getUserDetails = () => {

        var segment_str = window.location.pathname;
        var segment_array = segment_str.split('/');
        var user_id = segment_array.pop();

        axios.post('http://54.201.160.69:3282/api/v1/admin/detailofuser', {
            user_id: user_id,
        },
            config)
            .then(function (response) {
                console.log("response.data.data", response.data);
                setUserFirstName(response.data.data.first_name);
                setUserLastName(response.data.data.last_name);
                setPhoneNumber(response.data.data.phoneNumber);
                setUserId(response.data.data._id);
            })
            .catch(function (error) {
                // alert('error', error)
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ('' == userFirstName) {
            setToastBgColor('danger');
            setToastMsg('First Name is mandatory');
            toggleShowA();
            return false;
        }
        if ('' == userLastName) {
            setToastBgColor('danger');
            setToastMsg('Last Name is mandatory');
            toggleShowA();
            return false;
        }
        if ('' == userPhoneNumber) {
            setToastBgColor('danger');
            setToastMsg('Phone number cannot be empty');
            toggleShowA();
            return false;
        }
        axios.post('http://54.201.160.69:3282/api/v1/admin/updateofuser', {
            user_id: userId,
            first_name: userFirstName,
            last_name: userLastName,
            phoneNumber: userPhoneNumber
        }, config)
            .then(function (response) {
                console.log(response.data.status);
                const response_status = response.data.status;
                if (response_status == true) {
                    setToastBgColor('success');
                    setToastMsg('Profile updated Successfully');
                    toggleShowA();
                    // getUserDetails();
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
                            <Toast show={showA} onClose={toggleShowA} bg={bgColor} delay={2000} autohide>
                                <Toast.Header>
                                    <strong className="me-auto">Success</strong>
                                </Toast.Header>
                                <Toast.Body>{toastMsg}</Toast.Body>
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
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="active tab-pane" id="settings">
                                                        <form className="form-horizontal">
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="userFirstName"
                                                                    className="col-sm-2 col-form-label"
                                                                >
                                                                    First Name
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'textAlign': 'left' }}
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="userFirstName"
                                                                        placeholder="First Name"
                                                                        value={userFirstName}
                                                                        onChange={(e) => setUserFirstName(e.target.value)}
                                                                    />
                                                                </div>
                                                                <label
                                                                    htmlFor="userLastName"
                                                                    className="col-sm-2 col-form-label"
                                                                >
                                                                    Last Name
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'textAlign': 'left' }}
                                                                        type="text"
                                                                        className="form-control"
                                                                        id="userLastName"
                                                                        placeholder="First Name"
                                                                        value={userLastName}
                                                                        onChange={(e) => setUserLastName(e.target.value)}
                                                                    />
                                                                </div>
                                                                <label
                                                                    htmlFor="userPhoneNumber"
                                                                    className="col-sm-2 col-form-label"
                                                                >
                                                                    Phone Number
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'textAlign': 'left' }}
                                                                        type="number"
                                                                        className="form-control"
                                                                        id="userPhoneNumber"
                                                                        placeholder="Phone Number"
                                                                        value={userPhoneNumber}
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

export default UserEdit