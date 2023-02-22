/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import Pagination from "../../../../Helper/Pagination";
import FadeLoader from "react-spinners/FadeLoader";

export const User = () => {
  const [userData, setUserData] = useState();
  const [totalPages, setTotalPages] = useState();
  const [total, setTotal] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [id, setId] = useState();
  const [userLimit, setUserLimit] = useState(10);
  const [sorting, setSorting] = useState("sortingKey|desc");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true)

  const getUserList = async () => {
    setLoading(true)
    const data = {
      limit: userLimit,
      sorting: sorting,
      page: currentPage,
      search_key: search,
      // type: "user",
    };

    PostService(API_URL.GET_ALL_USER, data).then(
      (res) => {
        if (res.data.status === true) {
          setUserData(res.data.data.search_data);
          setTotalPages(res.data.data.total_pages);
          setTotal(res.data.data.total);
          setLoading(false)

        }
        if (userData) {
          setLoading(false)
        }
      },
      (err) => {
        toastEmmit(err.data?.message, "error");
        setLoading(false)
      }
    );
  };

  // useEffect(() => {
  //     getUserList();
  // }, []);

  useEffect(() => { 
    getUserList();
  }, [search]);

  const deleteUser = async (userId) => {
    const data = {
      user_id: userId,
    };

    PostService(API_URL.DELETE_USER, data).then(
      (res) => {
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getUserList();
      },
      (err) => {
        toastEmmit(err.data?.message, "error");
      }
    );
  };

  const changeStatus = async (userId) => {
    const data = {
      user_id: userId,
    };

    PostService(API_URL.CHANGE_USER_STATUS, data).then(
      (res) => {
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getUserList();
      },
      (err) => {
        toastEmmit(err.data?.message, "error");
      }
    );
  };

  const changeSorting = (sort) => {
    
    setSorting(sort);
    getUserList();
  };

  const handlePageClick = (e) => {
    setCurrentPage(e.selected);
    getUserList();
  };

  return (
    <>

      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Users List</h1>
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
                <li className="breadcrumb-item active">Users list</li>
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
                  <div className="row mb-4 mt-1">
                    <div className="col-md-6 pt-2">
                      <div className="w-50">
                        <div className="input-group">
                          <span className="input-group-text bg-dark">
                            <i className="fas fa-filter"></i>
                          </span>
                          <select
                            className="form-select form-select-md cursor"
                            onChange={(e) => {
                              changeSorting(e.target.value);
                            }}
                          >
                            <option defaultValue="sortingKey|asc">
                              Sort-by
                            </option>
                            <option value="sortingKey|asc">
                              Ascending Order
                            </option>
                            <option value="sortingKey|desc">
                              Descending Order
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
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
                    {!loading && 
                    <table className="table table-hover text-nowrap table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Email</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Role</th>
                          <th className="text-center">View Product</th>
                          <th className="text-center">View Order</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userData &&
                          userData.map((user, i) => {
                            return (
                              <tr className="ng-star-inserted">
                                <td className="text-center">
                                  {i + currentPage * userLimit + 1}
                                </td>
                                <td className="text-center">
                                  {user.first_name} {user.last_name}
                                </td>
                                <td className="text-center">{user.email}</td>
                                <td className="text-center">
                                  {user.isActive && (
                                    <span className="fw-bold badge p-2 badge-success">
                                      Active
                                    </span>
                                  )}
                                  {!user.isActive && (
                                    <span className="fw-bold badge p-2 badge-danger">
                                      Deactive
                                    </span>
                                  )}
                                </td>
                                <td className="text-center">
                                  <span className="fw-bold badge mx-1 p-2 badge-dark">
                                    {user.role.name}
                                  </span>
                                </td>
                                <td className="text-center">
                                  <Link
                                    title="View"
                                    className="mx-2 table-icon"
                                    to={
                                      "/panel/user/product-by-seller/view/" +
                                      user._id
                                    }
                                  >
                                    <span className="text-warning fas fa-eye"></span>
                                  </Link>
                                </td>
                                <td className="text-center">
                                  <Link
                                    title="View"
                                    className="mx-2 table-icon"
                                    to={"/panel/User/order/view/" + user._id}
                                  >
                                    <span className="text-warning fas fa-eye"></span>
                                  </Link>
                                </td>
                                <td className="text-center justify-content-center">
                                  {user.isActive && (
                                    <span
                                      className="form-switch pt-1"
                                      title="Deactivate"
                                    >
                                      <input
                                        id="toggle-trigger"
                                        type="checkbox"
                                        checked
                                        className=" form-check-input checkbox cursor"
                                        data-toggle="toggle"
                                        onClick={() => {
                                          changeStatus(user._id);
                                        }}
                                      ></input>
                                    </span>
                                  )}
                                  {!user.isActive && (
                                    <span
                                      className="form-switch pt-1"
                                      title="Activate"
                                    >
                                      <input
                                        id="toggle-trigger"
                                        type="checkbox"
                                        className=" form-check-input checkbox cursor"
                                        data-toggle="toggle"
                                        onClick={() => {
                                          changeStatus(user._id);
                                        }}
                                      ></input>
                                    </span>
                                  )}
                                  <a title="Update" className="mx-2 table-icon">
                                    <Link
                                      to={"/panel/user/edit/" + user._id}
                                      className="text-dark fas fa-pen"
                                    ></Link>
                                  </a>
                                  <a title="View" className="mx-2 table-icon">
                                    <Link
                                      to={"/panel/user/view/" + user._id}
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
                                      className="text-danger fas fa-trash cursor"
                                      onClick={() => {
                                        setId(user._id);
                                      }}
                                    ></span>
                                  </a>
                                </td>
                              </tr>
                            );
                          })}
                        {userData && userData.length === 0 && (
                          <tr>
                            <h6> No Data Found </h6>
                          </tr>
                        )}
                      </tbody>

                    </table>}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
                    </div>

                  </div>

                  <Pagination
                    counting={userLimit * currentPage}
                    totaldata={total}
                    pagecount={totalPages}
                    onChangePage={handlePageClick}
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
                Delete User !
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
              <h6> Are you sure you want to delete this User ? </h6>
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
                  deleteUser(id)
;
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
