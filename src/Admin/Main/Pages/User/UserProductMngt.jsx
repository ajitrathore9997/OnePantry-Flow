/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../../../Services/APIservice'
import { toastEmmit } from "../../../../Helper/Toastr";
import { PostService } from '../../../../Services/ConstantService'
import { useEffect } from 'react';

const UserProductMngt = () => {

    const [search, setSearch] = useState()
    const [productList, setProductList] = useState()

    const { id } = useParams()

    const getProductList = async () => {

        const data = {
            "search_key": search,
            "user_id": id
        }

        PostService(API_URL.USER_PRODUCT_LIST, data).then((res) => {
            console.log(res.data)
            if (res.data.status === true) {
                setProductList(res.data.data.search_data);

            }
        }, (err) => {
            console.log(err.response.data)
            toastEmmit(err.response.data?.message, 'error')
        })
    }

    useEffect(() => {
        getProductList()
    }, [search])


    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Product List By Seller</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <Link to="/panel/dashboard" className="breadcrumb-item" style={{textDecoration:'none'}}>
                                    Dashboard
                                </Link >
                                <Link to="/panel/user" className="breadcrumb-item" style={{textDecoration:'none'}}>
                                    User's List
                                </Link >
                                <li className="breadcrumb-item active">Product List By Seller</li>
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
                                                    onChange={(e) => { setSearch(e.target.value) }}

                                                />
                                            </nav>
                                        </div>
                                    </div>

                                    
                                        <div className="card-body table-responsive">
                                            <table className="table table-hover text-nowrap table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th className="text-center">S.No</th>
                                                        <th className="text-center">Product</th>
                                                        <th className="text-center">Category</th>
                                                        <th className="text-center">Price $</th>
                                                        <th className="text-center">Status</th>
                                                        <th className="text-center">Action</th>

                                                    </tr>
                                                </thead>
                                                <tbody>


                                                    {productList &&
                                                        productList.map((product, i) => {
                                                            return (
                                                                <tr className="ng-star-inserted">
                                                                    <td className="text-center">{i + 1}</td>
                                                                    <td className="text-center">
                                                                        {product.name}
                                                                    </td>
                                                                    <td className="text-center">{product.category_id.category_name}</td>
                                                                    <td className="text-center text-danger">
                                                                        <strong>  {product.selling_price}</strong>
                                                                    </td>
                                                                    <td className="text-center">
                                                                        {product.isActive && (
                                                                            <span className="fw-bold badge p-2 badge-success">
                                                                                Active
                                                                            </span>
                                                                        )}
                                                                        {!product.isActive && (
                                                                            <span 
                                                                                className="fw-bold badge p-2 badge-danger"
                                                                            >
                                                                                Deactive
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td className="text-center">
                                                                        <Link
                                                                            title="View"
                                                                            className="mx-2 table-icon"
                                                                            to={"/panel/user/product-by-seller/view/"}
                                                                        >
                                                                            <span className="text-warning fas fa-eye"></span>
                                                                        </Link>
                                                                    </td>

                                                                </tr>
                                                            );
                                                        })}
                                                        {
                                        productList && productList.length === 0 && <tr><h6> No Data Found </h6></tr>
                                    }
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

export default UserProductMngt