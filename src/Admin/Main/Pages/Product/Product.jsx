/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../../Helper/Pagination";
import { API_URL } from "../../../../Services/APIservice";
import { GetService, PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import FadeLoader from "react-spinners/FadeLoader";
import Dropdown from "react-bootstrap/Dropdown";
// import Pagination from "react-js-pagination";

const Product = () => {
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("sortingKey|desc");
  const [productList, setProductList] = useState();
  const [categoryList, setCategoryList] = useState([]);
  const [productId, setProductId] = useState();
  const [loading, setLoading] = useState(true);
  // const [sort, setsort] = useState(false);

  //Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [productLimit, setProductLimit] = useState(10);
  const [totalPages, setTotalPages] = useState();

  const [category, setcategory] = useState("");
  const [status, setstatus] = useState("");

  const sort = useRef(false);
  const Productsort = useRef(false);
  const Categorysort = useRef(false);
  const Pricesort = useRef(false);

  const pageRef = useRef(null);

  const getProducts = async () => {
    setLoading(true);
    const data = {
      limit: productLimit,
      sorting: sorting,
      page: currentPage,
      search_key: search,
      status: status,
      category_id: category,
    };

    PostService(API_URL.GET_PRODUCT_LIST, data).then((res) => {
      console.log(res);
      if (res?.data?.status === true) {
        // toastEmmit(res.data.message , 'success')
        setProductList(res.data.data.search_data);
        setTotalPages(res.data.data.total_pages);
        setTotal(res.data.data.total);
        setLoading(false);
      } else {
        toastEmmit("server error", "error");
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    getProducts();
  }, [search, currentPage, sorting, category, status]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = async () => {
    GetService(API_URL.CATEGORY_LIST_WITHOUT_PAGINATION).then(
      (res) => {
        setCategoryList(res.data.data);
      },
      (err) => {
        toastEmmit(err.message, "error");
      }
    );
  };

  const changeStatus = (productId) => {
    const data = {
      product_id: productId,
    };

    PostService(API_URL.CHANGE_PRODUCT_STATUS, data).then(
      (res) => {
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getProducts();
      },
      (err) => {
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  const handlePageClick = (e) => {
    // console.log("..........", e);
    setCurrentPage(e - 1);
    // setCurrentPage(e.selected);
     
  };

  const deleteProduct = async (id) => {
    const data = {
      product_id: id,
    };

    PostService(API_URL.DELETE_PRODUCT, data).then(
      (res) => {
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getProducts();
      },
      (err) => {
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  const OnStatusFilter = (e) => {
    // console.log(e); 
    setCurrentPage(0);
    setstatus(e);
  };

  const OnCategoryFilter = (e) => {
    // console.log(e); 
    setCurrentPage(0);
    setcategory(e);
  };

  const changeSorting = () => {
    // setsort(!sort)
    sort.current = !sort.current;
    // console.log(sort)
    if (sort.current) {
      setSorting("sortingKey|asc");
    } else {
      setSorting("sortingKey|desc");
    }
    // console.log(sort.target.value)
    // setSorting(sort);
    // getUserList();
  };
  const ProductSorting = () => {
    Productsort.current = !Productsort.current;
    if (Productsort.current) {
      setSorting("name|asc");
    } else {
      setSorting("name|desc");
    }
  };
  const CategorySorting = () => {
    Categorysort.current = !Categorysort.current;
    if (Categorysort.current) {
      setSorting("category_id.category_name|asc");
    } else {
      setSorting("category_id.category_name|desc");
    }
  };
  const PriceSorting = () => {
    Pricesort.current = !Pricesort.current;
    if (Pricesort.current) {
      setSorting("selling_price|asc");
    } else {
      setSorting("selling_price|desc");
    }
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
                  <div className="row">
                    {/* <div className="col-md-2 pt-2"> 
                    <div className="input-group">
                    <span className="input-group-text bg-dark">
                            <i className="fas fa-filter"></i>
                          </span>
                          <select
                            className="form-select form-select-md cursor"
                             
                          >
                            <option selected hidden disabled value="">
                              Sort-by
                            </option> 
                            <option value="sortingKey|asc">
                              Ascending
                            </option>
                            <option value="sortingKey|desc">
                              Descending
                            </option>
                          </select>
                          </div>
                    </div> */}

                    <div className="col-md-2 pt-2">
                      <select
                        className="form-select form-select-md cursor"
                        onChange={(e) => {
                          OnStatusFilter(e.target.value);
                        }}
                      >
                        <option value=""> Select Status</option>
                        <option value="active">Active</option>
                        <option value="deactive">Deactive</option>
                      </select>
                      {/* <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        Status
      </Dropdown.Toggle>

      <Dropdown.Menu onClick={OnStatusFilter}>
        <Dropdown.Item value='eee' eventKey={'active'} >Active</Dropdown.Item>
        <Dropdown.Item  eventKey={'deactive'}>Deactive</Dropdown.Item> 
      </Dropdown.Menu>
    </Dropdown> */}
                    </div>

                    <div className="col-md-3 pt-2">
                      <select
                        className="form-select"
                        onChange={(e) => {
                          OnCategoryFilter(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        {categoryList?.map((category, key) => (
                          <option key={key} value={category?._id}>
                            {category?.category_name}
                          </option>
                        ))}
                      </select>
                      {/* <select
                        className="form-select form-select-md cursor"
                        onChange={(e) => {
                          OnCategoryFilter(e.target.value);
                        }}
                      >
                        <option value="">Select Category</option>
                        <option value="Spices">Spices</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                      </select> */}
                    </div>
                    <div className="col-md-2"></div>

                    <div className="col-md-5">
                      <nav className="navbar">
                        <input
                          type="text"
                          name="firstnamesearch"
                          placeholder="search by keyword"
                          className="form-control ng-pristine ng-valid ng-touched"
                          onChange={(e) => {
                            setSearch(e.target.value);setCurrentPage(0);
                          }}
                        />
                      </nav>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    {!loading && (
                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th
                              className="text-center"
                              onClick={() => {
                                changeSorting();
                              }}
                            >
                              S.No{" "}
                              <span>
                                {sort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th
                              className="text-center"
                              onClick={() => {
                                ProductSorting();
                              }}
                            >
                              Product{" "}
                              <span>
                                {Productsort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th
                              className="text-center"
                              onClick={() => {
                                CategorySorting();
                              }}
                            >
                              Category{" "}
                              <span>
                                {Categorysort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th
                              className="text-center"
                              onClick={() => {
                                PriceSorting();
                              }}
                            >
                              Price ${" "}
                              <span>
                                {Pricesort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Seller</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productList &&
                            productList.map((product, i) => {
                              return (
                                <tr key={i} className="ng-star-inserted">
                                  <td className="text-center">
                                    {i + currentPage * productLimit + 1}
                                  </td>
                                  <td className="text-center">
                                    {product.name}
                                  </td>
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
                                  <td className="text-center">
                                    <span
                                      title="Seller Profile"
                                      className="mx-2 table-icon"
                                    >
                                      <Link
                                        to={
                                          "/panel/user/view/" +
                                          product?.seller?._id
                                        }
                                        className="text-warning fas fa-eye"
                                      ></Link>
                                    </span>
                                  </td>
                                  <td className="text-center justify-content-center">
                                    {product.isActive && (
                                      <span
                                        className="form-switch pt-1"
                                        title="Deactive"
                                      >
                                        <input
                                          id="toggle-trigger"
                                          type="checkbox"
                                          checked
                                          className=" form-check-input checkbox cursor"
                                          data-toggle="toggle"
                                          onChange={() => {
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
                                          className=" form-check-input checkbox cursor"
                                          data-toggle="toggle"
                                          onClick={() => {
                                            changeStatus(product._id);
                                          }}
                                        ></input>
                                      </span>
                                    )}
                                    <span
                                      title="Update"
                                      className="mx-2 table-icon"
                                    >
                                      <Link
                                        to={
                                          "/panel/product/edit/" + product._id
                                        }
                                        className="text-dark fas fa-pen"
                                      ></Link>
                                    </span>
                                    <span
                                      title="View"
                                      className="mx-2 table-icon"
                                    >
                                      <Link
                                        to={
                                          "/panel/product/view/" + product._id
                                        }
                                        className="text-warning fas fa-eye"
                                      ></Link>
                                    </span>
                                    <span
                                      title="Delete"
                                      className="mx-2 table-icon"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                    >
                                      <span
                                        className="text-danger fas fa-trash cursor"
                                        onClick={() => {
                                          setProductId(product._id);
                                        }}
                                      ></span>
                                    </span>
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
                    )}

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
                    </div>
                  </div>

                  <Pagination
                    counting={productLimit * currentPage}
                    totaldata={total}
                    pagecount={totalPages}
                    onChangePage={handlePageClick}
                    activePage={currentPage}
                  ></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Product !
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={{ textAlign: "left" }}>
              <h6> Are you sure you want to delete this Product ? </h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={() => {
                  deleteProduct(productId);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
