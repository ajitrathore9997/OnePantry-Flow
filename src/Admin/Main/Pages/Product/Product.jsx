/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
const Product = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [sorting, setSorting] = useState("sortingKey|desc");
  const [userLimit, setUserLimit] = useState(10);
  const [productList, setProductList] = useState();

  const getProducts = async () => {
    const data = {
      limit: userLimit,
      sorting: sorting,
      page: currentPage,
      search_key: search,
    };

    PostService(API_URL.GET_PRODUCT_LIST, data).then(
      (res) => {
        setProductList(res.data.data.search_data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  const changeStatus = (productId) => {
    const data = {
      product_id: productId,
    };

    PostService(API_URL.CHANGE_PRODUCT_STATUS, data).then(
      (res) => {
        getProducts();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Product List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <Link
                  to="/panel/dashboard"
                  className="breadcrumb-item"
                  style={{ textDecoration: "none" }}
                >
                  Dashboard
                </Link>

                <li className="breadcrumb-item active">Product List</li>
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
                  <div
                    className="row mb-4 mt-1"
                    style={{ justifyContent: "right" }}
                  >
                    <div className="col-md-6">
                      <nav className="navbar">
                        <input
                          type="text"
                          name="firstnamesearch"
                          placeholder="search by keyword"
                          className="form-control ng-pristine ng-valid ng-touched"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
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
                                <td className="text-center">{product.name}</td>
                                <td className="text-center">
                                  {product.category_id.category_name}
                                </td>
                                <td className="text-center text-danger">
                                  <strong> {product.selling_price}</strong>
                                </td>
                                <td className="text-center">
                                  {product.isActive && (
                                    <span className="fw-bold badge p-2 badge-success">
                                      Active
                                    </span>
                                  )}
                                  {!product.isActive && (
                                    <span className="fw-bold badge p-2 badge-danger">
                                      Deactive
                                    </span>
                                  )}
                                </td>
                                <td className="text-center justify-content-center">
                                  {product.isActive && (
                                    <span
                                      className="form-switch pt-1"
                                      title="Deactive"
                                    >
                                      <input
                                        id="toggle-trigger"
                                        checked
                                        type="checkbox"
                                        className=" form-check-input checkbox"
                                        data-toggle="toggle"
                                        onClick={() => {
                                          changeStatus(product._id);
                                        }}
                                      ></input>
                                    </span>
                                  )}
                                  {!product.isActive && (
                                    <span
                                      className="form-switch pt-1"
                                      title="Active"
                                    >
                                      <input
                                        id="toggle-trigger"
                                        type="checkbox"
                                        className=" form-check-input checkbox"
                                        data-toggle="toggle"
                                        onClick={() => {
                                          changeStatus(product._id);
                                        }}
                                      ></input>
                                    </span>
                                  )}
                                  <a title="Update" className="mx-2 table-icon">
                                    <Link
                                      to={"/panel/product/edit/" + product._id}
                                      className="text-dark fas fa-pen"
                                    ></Link>
                                  </a>
                                  <a title="View" className="mx-2 table-icon">
                                    <Link
                                      to={"/panel/product/view/" + product._id}
                                      className="text-warning fas fa-eye"
                                    ></Link>
                                  </a>
                                  <a
                                    title="Delete"
                                    className="mx-2 table-icon"
                                    data-toggle="modal"
                                    data-target="#exampleModal"
                                  >
                                    <span
                                      className="text-danger fas fa-trash"
                                      onClick={() => {}}
                                    ></span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        {productList && productList.length === 0 && (
                          <tr>
                            <h6> No Data Found </h6>
                          </tr>
                        )}
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
  );
};

export default Product;
