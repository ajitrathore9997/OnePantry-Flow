import React from "react";
import { useState } from "react";
import { Link,useNavigate } from 'react-router-dom'
import { toastEmmit } from "../../../../../Helper/Toastr";
import { API_URL } from "../../../../../Services/APIservice";
import { PostService } from "../../../../../Services/ConstantService";


export default function ChangePassword() {

  const navigate = useNavigate()

  const [oldPassword, setOldPassword] = useState()
  const [newPassword, setNewPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const [oldPass, setOldPass] = useState()
  const [newPass, setNewPass] = useState(true)
  const [confPass, setConfPass] = useState()
  const [showErr, setShowErr] = useState()
  const [showHideOld, setShowHideOld] = useState(true)
  const [showHideConf,setShowHideConf] = useState(true)
  const [showHideNew,setShowHideNew] = useState(true)

      

  const changeOldPassword = (e) => {
    setOldPassword(e)

    if (showErr) {
      if (e === "") {
        setOldPass("Old Password is required")
        return
      }

      setOldPass()
    }

  }


  const changeNewPassword = (e) => {
    setNewPassword(e)
    if (showErr) {
      if (e.length < 6) {
        setNewPass("Password should be atleast 6 characters long")
        return
      }

      setNewPass()
    }
  }

  const changeConfirmPassword = (e) => {
   
    setConfirmPassword(e)
    if (showErr) {
      if (e !== newPassword) {
        setConfPass("Password Mismatch ! Recheck")
        
      }
      else
      setConfPass()
    }
    
  }


  const checkBlank = () => {
    let val = false
    if (!oldPassword) {
      setOldPass("Old Password is required")
      val = true
    }

    if (!newPassword) {
      setNewPass("New Password is required")
      val = true
    }

    if (!confirmPassword) {
      setConfPass("Confirm Password is required")
      val = true
    }
    return val
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setShowErr(true)

    if (checkBlank())
      return

    if (confirmPassword !== newPassword) {
      setConfPass("Password Mismatch ! Recheck")
      return
    }

    if(newPassword.length <6)
    {
      setNewPass("Password should be atleast 6 characters long")
      return
    }

    if (oldPassword === newPassword) {
      toastEmmit('New password and Old password are same', 'error')
      return
    }

    const data = {
      "old_password": oldPassword,
      "password": newPassword
    }

    PostService(API_URL.CHANGE_PASSWORD,data).then((res)=>{
      console.log(res.data)
      toastEmmit(res.data.message,'success')
      navigate('/panel/dashboard')
    }, (err) => {
      console.log(err)
      toastEmmit(err.message,'error')
    })

  }

  return (
    <div>
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Change Password</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to="/panel/dashboard" style={{ textDecoration: 'none' }} >
                    Dashboard
                  </Link>
                </li>
                <li className="breadcrumb-item active">Change Password</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="container p-2">

        <div className="card p-3">
          <div  >
            <form onSubmit={(e) => { handleSubmit(e) }} >
              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="old_password" className="form-label">
                      Old Password
                    </label>
                    <div className="input-group">
                      <input
                        formcontrolname="old_password"
                        placeholder="Old Password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        type={showHideOld? "password":"text"}
                        onChange={(e) => { changeOldPassword(e.target.value) }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span  onClick={() => {
                            setShowHideOld(!showHideOld);
                          }}
                          className={ showHideOld? "fas fa-eye ng-star-inserted":"fas fa-eye-slash ng-star-inserted"}></span>
                        </div>
                      </div>
                    </div>
                    {oldPass && <span className="text-danger text-bold small-font-size">{oldPass}</span>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="old_password" className="form-label">
                      New Password
                    </label>
                    <div className="input-group">
                      <input
                        formcontrolname="password"
                        placeholder="New Password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        type={showHideNew? "password":"text"}
                        onChange={(e) => { changeNewPassword(e.target.value) }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span  onClick={() => {
                            setShowHideNew(!showHideNew);
                          }}
                          className={ showHideNew? "fas fa-eye ng-star-inserted":"fas fa-eye-slash ng-star-inserted"}></span>
                        </div>
                      </div>
                    </div>
                    {newPass && <span className="text-danger text-bold small-font-size">{newPass}</span>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 mt-3">
                  <div className="form-group">
                    <label htmlFor="c_pass" className="form-label">
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <input
                        formcontrolname="confirm_password"
                        placeholder="Confirm Password"
                        className="form-control ng-untouched ng-pristine ng-invalid"
                        type={showHideConf? "password":"text"}
                        onChange={(e) => { changeConfirmPassword(e.target.value) }}
                      />
                      <div className="input-group-append">
                        <div className="input-group-text">
                          <span 
                           onClick={() => {
                            setShowHideConf(!showHideConf);
                          }}
                          className={ showHideConf? "fas fa-eye ng-star-inserted":"fas fa-eye-slash ng-star-inserted"}></span>
                        </div>
                      </div>
                    </div>
                    {confPass && <span className="text-danger text-bold small-font-size">{confPass}</span>}
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-12">
                  <button
                    type="submit"
                    className="btn btn-primary px-2 mt-3 w-100"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}