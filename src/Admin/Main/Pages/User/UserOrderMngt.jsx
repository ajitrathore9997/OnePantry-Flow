/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserOrderMngt = () => {

    const [orders,setOrders] = useState()

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">View Order</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <Link to="/panel/dashboard" className="breadcrumb-item" style={{textDecoration:'none'}}> 
                                    Dashboard
                                </Link >
                                <Link to="/panel/user" className="breadcrumb-item" style={{textDecoration:'none'}}> 
                                    User's List
                                </Link >
                                <li className="breadcrumb-item active">View Order</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>

            <section className="content  d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card wrap cddr2">
                                <div className="card-body">
                                    <div className="row mb-4 mt-1" style={{justifyContent:'right'}}>

                                        <div className="col-md-6">
                                            <nav className="navbar">
                                                <input
                                                    type="text"
                                                    name="firstnamesearch"
                                                    placeholder="search by keyword"
                                                    className="form-control ng-pristine ng-valid ng-touched"
                                                    

                                                />
                                            </nav>
                                        </div>
                                    </div>

                                    
                                        <div className="card-body table-responsive">
                                            <table className="table table-hover text-nowrap table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">S.No</th>
                                                        <th className="text-center">Seller</th>
                                                        <th className="text-center">Buyer</th>
                                                        <th className="text-center">Quantity $</th>
                                                        <th className="text-center">Total Bill</th>
                                                        <th className="text-center">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>


                                                     
                                                         
                                          <tr><h6> No Data Found </h6></tr>
                         
                                                </tbody>
                                            </table>
                                        </div>
                                     

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default UserOrderMngt