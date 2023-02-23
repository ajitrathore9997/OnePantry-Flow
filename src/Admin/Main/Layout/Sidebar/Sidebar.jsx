/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Sidebar/Sidebar.css";
// import avatrImg from "../../../../assets/img/avatar.png";
import no_user from "../../../../assets/img/no_user.jpg";
import LogoImg from "../../../../assets/img/logo.png";
import { GetService } from "../../../../Services/ConstantService";
import { API_URL } from "../../../../Services/APIservice";
import { ImageURL } from "../../../../Environment/Environment";

export default function Sidebar({adminDetail}) {
  const navigate = useNavigate();

  function Signout() {
    console.log("first");
    localStorage.removeItem("token");
    navigate("/login");
  }

  const [AdminData , setAdminData] = useState();

  useEffect(()=>{
    GetService(API_URL.ADMIN_DETAIL).then((res)=>{
      // console.log(res)
      if(res.data?.status === true){
        setAdminData(res?.data?.data)
      }
    })
  },[adminDetail])




  return (
    <>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <a className="brand-link text-center">
          <img
            src={LogoImg}
            alt="Logo"
            className="brand-image img-circle elevation-3"
            style={{ float: "none" }}
          />
          <span className="brand-text font-weight-light"></span>
        </a>
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img
                src={(AdminData?.image) ? (ImageURL + AdminData?.image) : no_user}
                className="img-circle elevation-2"
                alt="User"
              />
            </div>
            <div className="info">
              <a className="d-block">{AdminData?.userName || 'Admin'}</a>
            </div>
          </div>

          <nav className="mt-2" id="accordionExample">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <NavLink to={"/panel/dashboard"} className="nav-link">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard </p>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to={"/panel/user"} className="nav-link">
                  <i className="nav-icon fas fa-user-shield iconsize" />
                  <p>User Management</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseCategory"
                  aria-expanded="false"
                  aria-controls="collapseCategory"
                >
                  <i className="fas fa-sitemap iconsize nav-icon"></i>
                  <p>
                    Category Management
                    <i className="fas fa-angle-left right rotate"></i>
                  </p>
                </a>
                <ul
                  className="nav accordion-collapse collapse"
                  id="collapseCategory"
                  data-bs-parent="#accordionExample"
                >
                  <li className="nav-item">
                    <NavLink to={"/panel/category"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Categories</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to={"/panel/sub-category"} className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p>Sub Category</p>
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item">
                <NavLink to={"/panel/product"} className="nav-link">
                  <i className="fas fa-shopping-bag iconsize nav-icon" />
                  <p>Product Management</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/panel/order"} className="nav-link">
                  <i className="fas fa-chart-line iconsize nav-icon" />
                  <p>Order Management</p>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={"/panel/commission"} className="nav-link">
                  <i className="nav-icon fas fa-dollar-sign iconsize" />
                  <p>Commission</p>
                </NavLink>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link collapsed"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapsefour"
                  aria-expanded="false"
                  aria-controls="collapsefour"
                >
                  <i className="fas fa-cog iconsize nav-icon"></i>
                  <p>
                    Settings<i className="fas fa-angle-left right rotate"></i>
                  </p>
                </a>
                <ul
                  className="nav accordion-collapse collapse"
                  id="collapsefour"
                  data-bs-parent="#accordionExample"
                >
                  <li className="nav-item">
                    <NavLink to={"/panel/profile"} className="nav-link cursor">
                      <i className="fas fa-edit nav-icon" />
                      <p>Profile Setting</p>
                    </NavLink>
                  </li>

                  <li className="nav-item">
                    <NavLink to={"/panel/change-password"} className="nav-link">
                      <i className="fas fa-key nav-icon" />
                      <p>Change Password</p>
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link cursor" onClick={Signout}>
                      <i className="fas fa-sign-out-alt nav-icon"></i>
                      <p>Sign Out</p>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
