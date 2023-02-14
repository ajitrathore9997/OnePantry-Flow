import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from "yup";


const ChangePassword = () => {
    const default_background_color = { 'backgroundColor': '#2675ff', 'border': '#2675ff' }
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const token = localStorage.getItem('userToken');
    const handlePasswordChange = () => {
        const config = {
            headers: { Authorization: token }
        };

        axios.post('http://54.201.160.69:3282/api/v1/admin/changepassword', {
            password: newPassword,
            old_password: oldPassword
        }, config)
            .then(function (response) {
                alert("Success");
            })
            .catch(function (error) {
                alert("Failure");
            });
    }

    return (
        <>
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <section>
                            <div className="container-fluid">
                                <div className="row mb-2">
                                    <div className="col-sm-6">
                                        <h1>Change Password</h1>
                                    </div>
                                    <div className="col-sm-6">
                                        <ol className="breadcrumb float-sm-right">
                                            <li className="breadcrumb-item">
                                                <a href="#">Home</a>
                                            </li>
                                            <li className="breadcrumb-item active">Change Password</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="content mt-5">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="tab-content">
                                                    <div className="active tab-pane" id="settings">
                                                        <form className="form-horizontal">
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="inputNewPassword"
                                                                    className="col-sm-2 col-form-label"
                                                                >Old Password</label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'text-align': 'left' }}
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="inputOldPassword"
                                                                        placeholder="Old Password"
                                                                        onChange={(e) => setOldPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="inputNewPassword"
                                                                    className="col-sm-2 col-form-label"
                                                                >
                                                                    New Password
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'text-align': 'left' }}
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="inputNewPassword"
                                                                        placeholder="New Password"
                                                                        onChange={(e) => setNewPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label
                                                                    htmlFor="inputConfirmPassword"
                                                                    className="col-sm-2 col-form-label"
                                                                >
                                                                    Confirm Password
                                                                </label>
                                                                <div className="col-sm-4">
                                                                    <input
                                                                        style={{ 'text-align': 'left' }}
                                                                        type="password"
                                                                        className="form-control"
                                                                        id="inputConfirmPassword"
                                                                        placeholder="Confirm Password"
                                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row mt-4">
                                                                <div className="mt-4 col-sm-3">
                                                                    <button
                                                                        onClick={() => handlePasswordChange()}
                                                                        type="button" className="btn btn-block btn-danger" style={default_background_color}>
                                                                        Change Password
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

export default ChangePassword