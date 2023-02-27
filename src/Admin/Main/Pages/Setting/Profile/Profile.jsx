/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { APIBaseURL, ImageURL } from "../../../../../Environment/Environment";
import { Link,useNavigate } from 'react-router-dom'
import { GetService, PostService } from "../../../../../Services/ConstantService";
import nouser from '../../../../../assets/img/no_user.jpg'
import { toastEmmit } from "../../../../../Helper/Toastr";
import { API_URL } from "../../../../../Services/APIservice";
import { FadeLoader } from "react-spinners";


export default function Profile({sendAdminDetails}) {

  const [error,setError] = useState(false)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [localImgPath, setLocalImgPath] = useState(nouser)
  const [user, setUser] = useState();
  const [userName, setUserName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [image, setImage] = useState();

  const handleSubmit = async (e) => {

    e.preventDefault()
     
    console.log(userName, phoneNumber);

    console.log(image);

    if(!userName){
      setError(true)
      return
    } 

    let formdata = new FormData();

    formdata.append("userName",userName)
    formdata.append("phoneNumber",phoneNumber)
    if (image)
         formdata.append("image", image)

    PostService(API_URL.ADMIN_UPDATE,formdata).then((res) => {
      console.log(res)
      if (res.data.status === true) {
          toastEmmit(res?.data?.message, 'success')
          sendAdminDetails()
          navigate('/panel/dashboard')
      }
  },
      (err) => { 
          toastEmmit(err.response.data?.message, 'error')
      })

  };



  const getUserDetails = async () => {

    setLoading(true)
    GetService(API_URL.ADMIN_DETAIL).then((res) => {

      if (res.data?.status === true) {
        setUser(res.data.data)
        setUserName(res.data.data.userName)
        setPhoneNumber(res.data.data.phoneNumber)
        if (res.data.data.image) {
          setLocalImgPath(ImageURL + res.data.data.image)
        }
      } 

      setLoading(false)

    }, (err) => {

      toastEmmit(err.data?.message,'error')
      console.log(err.response.data)
      setLoading(false)

    })

  }; 

  useEffect(() => {

    getUserDetails();

  }, []);




  const onimageUpload = (e) => {
    
    setImage(e.target.files[0]);
    setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));

  };



  return (
    <div>
      <app-add-user className="ng-star-inserted">
        <section className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="default_color">Profile Settings</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <Link to="/panel/dashboard" style={{ textDecoration: 'none' }}>
                      Dashboard
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Profile Settings</li>
                </ol>
              </div>
            </div>
          </div>
        </section>
        <div className="container p-2">
          <div className="card p-3">
        <div  style={{ display: 'flex', justifyContent: 'center' }}>
                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                        </div>
        {!loading &&  <>
            <div className="upload_profile_image d-flex">
              <div className="img_box ">
                <img
                  alt="userImage"
                  height={100}
                  className="profile_img rounded-circle"
                  src={localImgPath}
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <div className="btn_box mx-3 col-md-3">
                <label className="form-label">Change Profile Picture</label>
                <span className="btn btn-primary mainBtn btn-block btn-file">
                  Select Image
                  <input type="file" accept=".jpg,.jpeg,.png" onChange={(e) => { onimageUpload(e) }} />
                </span>
              </div>
            </div>
            <div className="ng-star-inserted">
              <form 
                className="ng-untouched ng-pristine ng-invalid"
                onSubmit={(e) => handleSubmit(e)}
              >
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfName" className="form-label">
                        UserName
                        <sup className="error">*</sup>
                      </label>
                      <input
                        type="text"
                        formcontrolname="user name"
                        id="inputfName"
                        placeholder="user name"
                        defaultValue={user && user.userName}
                        className="form-control ng-untouched ng-pristine ng-valid"
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                      {error && !userName && <div className="error">UserName is required</div> }
                    </div>
                  </div>
                  <div className="col-md-6 mt-3">
                    <div className="form-group">
                      <label htmlFor="inputlName" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        formcontrolname="phone number"
                        id="inputlName"
                        placeholder="phone number"
                        defaultValue={user && user.phoneNumber}
                        className="form-control ng-untouched ng-pristine ng-valid"
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mt-4">
                      <button
                        type="submit"
                        style={{ padding: "5px 50px" }}
                        className="btn btn-primary"
                         
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </ >}
          </div>
        </div>
      </app-add-user>
    </div>
  );
}