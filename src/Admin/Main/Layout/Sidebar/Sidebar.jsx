/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import '../Sidebar/Sidebar.css'
import avatrImg from '../../../../assets/img/avatar.png'

export default function Sidebar() {
    const navigate = useNavigate()

    function Signout() {
        console.log('first')
        localStorage.removeItem('token')
        navigate('/login')
    }


    return (
        <>

            <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <a className="brand-link">
                    <img src="https://t3.ftcdn.net/jpg/03/03/71/14/360_F_303711499_7o9BGpaDFaJJiOS2RLTY8i9xICgorT3o.jpg" alt="Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />
                    <span className="brand-text font-weight-light">OnePantry</span>
                </a>
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div className="image">
                            <img src={avatrImg} className="img-circle elevation-2" alt="User" />
                        </div>
                        <div className="info">
                            <a className="d-block">Admin</a>
                        </div>
                    </div>

                    <nav className="mt-2">
                        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                            <li className="nav-item">
                                <NavLink to={'/panel/dashboard'} className="nav-link"   >
                                    <i className="nav-icon fas fa-tachometer-alt" />
                                    <p>Dashboard </p>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to={'/panel/user'} className="nav-link">
                                    <i className="nav-icon fas fa-user-shield iconsize" />
                                    <p>User Management</p>
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link">
                                    <i className="fas fa-sitemap iconsize nav-icon" />
                                    <p>
                                        Category Management
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <Link to={'/panel/category'} className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Category</p>
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/panel/sub-category'} className="nav-link">
                                            <i className="far fa-circle nav-icon" />
                                            <p>Sub-Category</p>
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink to={'/panel/product'} className="nav-link">
                                    <i className="fas fa-shopping-bag iconsize nav-icon" />
                                    <p>
                                        Product Management
                                    </p>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/panel/order'} className="nav-link">
                                    <i className="fas fa-chart-line iconsize nav-icon" />
                                    <p>
                                        Order Management
                                    </p>
                                </NavLink>
                            </li>


                            <li className="nav-item">
                                <a className="nav-link">
                                    <i className="fas fa-cog iconsize nav-icon" />
                                    <p>
                                        Setting
                                        <i className="fas fa-angle-left right" />
                                    </p>
                                </a>
                                <ul className="nav nav-treeview">
                                    <li className="nav-item">
                                        <NavLink to={'/panel/profile'} className="nav-link">
                                            <i className="fas fa-edit nav-icon" />
                                            <p>Profile Setting</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to={'/panel/change-password'} className="nav-link">
                                            <i className="fas fa-key nav-icon" />
                                            <p>Change Password</p>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link cursor" onClick={Signout}>
                                            <i className="fas fa-sign-out-alt nav-icon" />
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
    )
}
