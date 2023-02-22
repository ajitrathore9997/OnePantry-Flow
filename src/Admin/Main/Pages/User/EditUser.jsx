/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { API_URL } from '../../../../Services/APIservice'
import { PostService } from '../../../../Services/ConstantService'
import nouser from '../../../../assets/img/no_user.jpg'
import { toastEmmit } from "../../../../Helper/Toastr";
import { ImageURL } from '../../../../Environment/Environment'
import FadeLoader from "react-spinners/FadeLoader";

const EditUser = () => {

    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const [user, setUser] = useState()
    const { id } = useParams()
    const [localImgPath, setLocalImgPath] = useState(nouser)
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [phoneNumber, setPhoneNumber] = useState()
    const [image, setImage] = useState()

    const getUserData = async () => {

        const data = {
            user_id: id
        }

        PostService(API_URL.GET_USER_BY_ID, data).then((res) => {

            if (res.status === 200) {
                setUser(res.data.data)
                setFirstName(res.data.data.first_name)
                setLastName(res.data.data.last_name)
                setPhoneNumber(res.data.data.phoneNumber)
                if (res.data.data.image) {
                    setLocalImgPath(ImageURL + res.data.data.image)
                    console.log('localimage', localImgPath)
                }
                console.log(user)
                    
            setLoading(false)
            }
        }, (err) => {
            toastEmmit(err.data?.message, "error");
            setLoading(false)
        })

    }


    useEffect(() => {
        setLoading(true)
        getUserData()
    }, [])


    const onimageUpload = (e) => {
        setImage(e.target.files[0]);
        setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));
    };


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(firstName, lastName, phoneNumber, image)

        if (!firstName)
            setFirstName(user.first_name)

        if (!lastName)
            setLastName(user.last_name)

        let formdata = new FormData();

        formdata.append("user_id", user._id)
        formdata.append("first_name", firstName);
        formdata.append("last_name", lastName)
        formdata.append("phoneNumber", phoneNumber)

        if (image)
            formdata.append("image", image)

        for (var value of formdata.values()) {
            console.log(value);
        }

        PostService(API_URL.UPDATE_USER, formdata).then((res) => {
            console.log(res)
            if (res.data.status === true) {
                toastEmmit(res?.data?.message, 'success')
                navigate('/panel/user')
            }
        },
            (err) => {
                console.log('error')
                toastEmmit(err.data?.message, 'error')
            })

    }



    return (
        <div>
            <div className="ng-star-inserted">
                <section className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="default_color">
                                    Edit User
                                </h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item">
                                        <Link to="/panel/dashboard" href="/panel/dashboard">
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item">
                                        <Link to="/panel/User" href="/panel/User">
                                            User's List
                                        </Link>
                                    </li>
                                    <li className="breadcrumb-item active">
                                        Edit
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="container p-2">
                    <div className="card p-3">

                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                        </div>

                        {!loading &&
                            <>
                                <div className="upload_profile_image d-flex">
                                    <div className="img_box">
                                        <img alt="userImage" height={120} width={120} className="profile_img rounded-circle" src={localImgPath} />
                                    </div>
                                    <div className="btn_box mx-3 mx-md-3">
                                        <label className="form-label">
                                            Change Profile Picture
                                        </label>
                                        <span className="btn btn-primary mainBtn btn-block btn-file">
                                            Select Image
                                            <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { onimageUpload(e) }} />
                                        </span>
                                    </div>
                                </div>
                                <div className="ng-star-inserted">
                                    <form className="ng-untouched ng-pristine ng-invalid" onSubmit={(e) => handleSubmit(e)}>
                                        <div className="row">
                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="inputfName" className="form-label">
                                                        FirstName
                                                        <sup className="error">
                                                            *
                                                        </sup>
                                                    </label>
                                                    <input type="text" formcontrolname="first_name" defaultValue={user && user.first_name} id="inputfName" placeholder="First Name" className="form-control ng-untouched ng-pristine ng-valid"
                                                        onChange={(e) => { setFirstName(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="inputlName" className="form-label">
                                                        Last Name
                                                        <sup className="error">
                                                            *
                                                        </sup>
                                                    </label>
                                                    <input type="text" formcontrolname="last_name" id="inputlName" defaultValue={user && user.last_name} placeholder="Last Name" className="form-control ng-untouched ng-pristine ng-valid"
                                                        onChange={(e) => { setLastName(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mt-3">
                                                <div className="form-group">
                                                    <label htmlFor="inputPhone" className="form-label">
                                                        Phone Number
                                                        <sup className="error">
                                                            *
                                                        </sup>
                                                    </label>
                                                    <input type="number" formcontrolname="phoneNumber" id="inputPhone" defaultValue={user && user.phoneNumber} placeholder="Phone Number" className="form-control ng-untouched ng-pristine ng-invalid"
                                                        onChange={(e) => { setPhoneNumber(e.target.value) }} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="mt-4">
                                                    <button type="submit" className="btn btn-primary" >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default EditUser