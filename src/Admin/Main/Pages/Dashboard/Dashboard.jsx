/* eslint-disable jsx-a11y/anchor-is-valid */

import React from "react";
import { useState } from "react";
import { API_URL } from "../../../../Services/APIservice";
import { GetService, PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState();
  const [DashboardCounts, setCounts] = useState();

  const getUserList = async () => {
    setLoading(true);
    const data = {
      limit: 10,
      sorting: "sortingKey|desc",
      page: 0,
    };

    PostService(API_URL.GET_ALL_USER, data).then(
      (res) => {
        if (res.data.status === true) {
          setUserData(res.data.data.search_data); 
        }
        
      },
      (err) => {
        toastEmmit(err.data?.message, "error");
        setLoading(false);
      }
    );
  };

  const getDashboardCounts = async () => {
    setLoading(true);
    GetService(API_URL.DASHBOARD_COUNT).then(
      (res) => {
        if (res.data.status === true) {
          setCounts(res?.data?.data);
          // console.log(DashboardCounts) 
        }
      },
      (err) => {
        toastEmmit(err.data?.message, "error");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getUserList();
    getDashboardCounts();
  }, []);

  useEffect(() => {
    if (loading) {
      document.getElementById("data").classList.add("load");

      document.getElementById("loader").classList.add("dashboard-loader");
    } else {
      document.getElementById("data").classList.remove("load");
      document.getElementById("loader").classList.remove("dashboard-loader");
    }
  }, [loading]);


  useEffect(()=>{
    if(DashboardCounts && userData){
      setLoading(false)
    }
  },[DashboardCounts, userData])

  return (
    <>
      <div>
        <div className="load" id="loader">
          <FadeLoader loading={loading} />
        </div>
      </div>
      <div className="" id="data">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0">Dashboard</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <section className="content">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{DashboardCounts?.alluser}</h3>
                    <p>All Users</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-users" />
                  </div>
                  <Link to="/panel/user" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{DashboardCounts?.all_active}</h3>
                    <p>Active Users</p>
                  </div>
                  <div className="icon">
                    <i className="fa fa-user-tie" />
                  </div>
                  <Link to="/panel/user/active" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{DashboardCounts?.product}</h3>
                    <p>Total Products</p>
                  </div>
                  <div className="icon">
                    <i className="fas fa-shopping-cart" />
                  </div>
                  <Link to="/panel/product" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{DashboardCounts?.order}</h3>
                    <p>Total Orders</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <Link to="/panel/order" className="small-box-footer">
                    More info <i className="fas fa-arrow-circle-right" />
                  </Link>
                </div>
              </div>
            </div>

            <section className="content  d-flex justify-content-center">
              <div className="container-fluid">
                <div className="row">
                  <div className="card wrap cddr2">
                    <div className="card-body">
                      <h2 className="default_color mb-4">Latest Users</h2>

                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center">S.No</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Email</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData &&
                            userData.map((user, i) => {
                              return (
                                <tr key={user._id} className="ng-star-inserted">
                                  <td className="text-center">{i + 1}</td>
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

                                  <td className="text-center justify-content-center">
                                    <span
                                      title="View"
                                      className="mx-2 table-icon"
                                    >
                                      <Link
                                        to={"/panel/user/view/" + user._id}
                                        className="text-warning fas fa-eye"
                                      ></Link>
                                    </span>
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
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </>
  );
}
