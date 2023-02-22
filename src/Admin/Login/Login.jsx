/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { APIBaseURL } from "../../Environment/Environment";
import { API_URL } from "../../Services/APIservice";
import axios from "axios";
import "../../App.css";
import { toastEmmit } from "../../Helper/Toastr";
import LogoImg from "../../assets/img/logo.png";

export default function Login() {
  let navigate = useNavigate();

  useEffect(() => {
    const Udata = JSON.parse(localStorage.getItem("userdata"));
    // console.log(Udata)
    if (Udata) {
      setRememberMe(true);
      setFormData(Udata);
    }

    if (localStorage.getItem("token")) {
      navigate("/panel/dashboard");
    } else {
      navigate("/login");
    }
  }, []);

  let [FormData, setFormData] = useState({
    email: "",
    password: "",
  });

  let [ShowHide, setType] = useState(true);

  let [RememberMe, setRememberMe] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();

    if (RememberMe === true) {
      localStorage.setItem("userdata", JSON.stringify(FormData));
    } else {
      localStorage.removeItem("userdata");
    }

    // const URL = APIBaseURL + "admin/signIn";

    // console.log(FormData)
    await axios.post(API_URL.ADMIN_LOGIN, FormData).then(
      (res) => {
        // console.log(res)

        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          // console.log(res.data.data.token)
          localStorage.setItem("token", res.data.data.token);
          // TOKEN = res.data.data.token
          // setToken(res.data.data.token);
          navigate("/panel/dashboard");
          window.location.reload();
        }
      },
      (err) => {
        console.log(err.response.data);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  return (
    <>
      <div className="login-page">
        <div className="login-box">
          <div className="login-logo">
          <img src={LogoImg} alt="Logo" className="brand-image img-circle elevation-3" style={{height:'150px'}} /> 
          {/* <b>OnePantry </b> */}
          </div>
          <div className="card">
            <div className="card-body login-card-body">
              {/* <div className="login-logo">
                <img
                  src={LogoImg}
                  alt="Logo"
                  className="brand-image img-circle elevation-3"
                  style={{ height: "150px" }}
                />
              </div> */}
              <p className="login-box-msg">Sign in to start your session</p>
              <form
                onSubmit={(e) => {
                  submitForm(e);
                }}
              >
                <div className="input-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    required
                    name="email"
                    value={FormData.email}
                    onChange={(e) =>
                      setFormData({ ...FormData, email: e.target.value })
                    }
                    placeholder="Email"
                  />
                  {/* setFormData({...FormData,[e.target.name]:e.target.value})} */}
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-envelope" />
                    </div>
                  </div>
                </div>
                <div className="input-group mb-3">
                  <input
                    type={ShowHide ? "password" : "text"}
                    className="form-control"
                    required
                    name="password"
                    value={FormData.password}
                    onChange={(e) =>
                      setFormData({ ...FormData, password: e.target.value })
                    }
                    placeholder="Password"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text cursor">
                      <span
                        onClick={() => {
                          setType(!ShowHide);
                        }}
                        className={ShowHide ? "fas fa-eye" : "fas fa-eye-slash"}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-8">
                    <div className="icheck-primary">
                      <input
                        type="checkbox"
                        id="remember"
                        checked={RememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      <label htmlFor="remember">Remember Me</label>
                    </div>
                  </div>
                  <div className="col-4">
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign In
                    </button>
                  </div>
                </div>
              </form>

              <p className="mb-4">
                {/* <Link href="#">Forgot password ?</Link> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
