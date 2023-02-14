import React, { Component } from 'react'

export default class Menu extends Component {
  render() {
    const menu_font = { fontSize: '15px' };
    return (
      <div>
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
          {/* Brand Logo */}
          <a href="index3.html" className="brand-link">
            <img src="https://t3.ftcdn.net/jpg/03/03/71/14/360_F_303711499_7o9BGpaDFaJJiOS2RLTY8i9xICgorT3o.jpg" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
            <span className="brand-text font-weight-light">OnePantry</span>
          </a>
          {/* Sidebar */}
          <div className="sidebar">
            {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
              </div>
              <div className="info">
                <a href="#" className="d-block">Alexander Pierce</a>
              </div>
            </div> */}
            <nav className="mt-2">
              <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <li className="nav-item has-treeview menu-open">
                  <a href="/dashboard" className="nav-link active">
                    <i className="nav-icon fas fa-th" />
                    <p style={menu_font}>
                      Dashboard
                    </p>
                  </a>
                </li>
                <li className="nav-item has-treeview menu-open">
                  <a href="/dashboard" className="nav-link">
                    <i className="nav-icon fas fa-user" />
                    <p style={menu_font}>
                      User Management
                    </p>
                  </a>
                </li>
                {/* <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                    <i className="nav-icon fas fa-th" />
                    <p style={menu_font}>
                      Category Management
                      <i className="right fas fa-angle-left" />
                    </p>
                  </a>
                  <ul className="nav nav-treeview">
                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p style={menu_font}>Level 2</p>
                      </a>
                    </li>

                    <li className="nav-item">
                      <a href="#" className="nav-link">
                        <i className="far fa-circle nav-icon" />
                        <p style={menu_font}>Level 2</p>
                      </a>
                    </li>
                  </ul>
                </li> */}
                <li className="nav-item has-treeview menu-open">
                  <a href="/dashboard" className="nav-link">
                    {/* <i className="nav-icon fas fa-product-hunt" /> */}
                    <i className="nav-icon fas fa-briefcase"></i>
                    <p style={menu_font}>
                      Product Management
                    </p>
                  </a>
                </li>
                <li className="nav-item has-treeview menu-open">
                  <a href="/dashboard" className="nav-link">
                    <i className="nav-icon fas fa-briefcase"></i>
                    <p style={menu_font}>
                      Order Management
                    </p>
                  </a>
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
}
