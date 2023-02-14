import React from 'react'
import { useNavigate } from "react-router-dom";


const Menu = () => {

  const menu_font = { fontSize: '15px' };
  const navigate = useNavigate();

  const routeChange = (val) => {
    let path = val;

    navigate(path);
  }

  return (
    <div>
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        {/* Brand Logo */}
        <a href="index3.html" className="brand-link">
          <img src="http://54.201.160.69:3281/assets/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
          <span className="brand-text font-weight-light">One Pantry</span>
        </a>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
              <img src="http://54.201.160.69:3282/public/assets/user_media/1675321895612--user.jpg" className="img-circle elevation-2" alt="User Image" />
            </div>
            <div className="info">
              <a href="#" className="d-block">Admin</a>
            </div>
          </div>
          <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
              <li className="nav-item has-treeview menu-open">
                <a href="/dashboard" className="nav-link active">
                  <i className="nav-icon fas fa-tachometer-alt iconsize" />
                  <p style={menu_font}>
                    Dashboard
                  </p>
                </a>
              </li>
              {/* <li className="nav-item has-treeview menu-open"></li> */}
              <li className="nav-item has-treeview">
                <a href="/dashboard" className="nav-link">
                  <i className="nav-icon fas fa-user-shield iconsize" />
                  <p style={menu_font}>
                    User Management
                  </p>
                </a>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="fas fa-sitemap iconsize nav-icon" />
                  <p style={menu_font}>
                    Category Management
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p style={menu_font}>Categories</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="far fa-circle nav-icon" />
                      <p style={menu_font}>Sub Categories</p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item has-treeview">
                <a href="#" className="nav-link">
                  <i className="fas fa-cog iconsize nav-icon" />
                  <p style={menu_font}>
                    Setting
                    <i className="right fas fa-angle-left" />
                  </p>
                </a>
                <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a className="nav-link" onClick={() => routeChange("/profile")}>
                      <i className="fas fa-edit nav-icon" />
                      <p style={menu_font}>Profile Setting</p>
                    </a>
                  </li>

                  <li className="nav-item">
                    <a className="nav-link" onClick={() => routeChange("/change_password")}>
                      <i className="fas fa-key nav-icon" />
                      <p style={menu_font}>Change Password</p>
                    </a>
                  </li>

                  {/* <li className="nav-item">
                    <a href="#" className="nav-link">
                      <i className="fas fa-sign-out-alt nav-icon" />
                      <p style={menu_font}>Sign Out</p>
                    </a>
                  </li> */}
                </ul>
              </li>
            </ul>
          </nav>
          {/* /.sidebar-menu */}
        </div>
        {/* /.sidebar */}
      </aside >
    </div >

  )
}
export default Menu