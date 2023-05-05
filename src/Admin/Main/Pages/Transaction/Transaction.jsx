/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Pagination from "../../../../Helper/Pagination";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { format, parseISO } from "date-fns";

const Transaction = () => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [transactionList, setTransactionList] = useState();

  //Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [transactionLimit, setTransactionLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState();


  const Pricesort = useRef(false);
  const [sorting, setSorting] = useState("sortingKey|desc");
  const [status, setstatus] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    getTransactionList();
  }, [currentPage, search, sorting, status]);

  const getTransactionList = () => {
    setLoading(true);
    const data = {
      limit: transactionLimit,
      page: currentPage,
      sorting: sorting,
      search_key: search,
      status: status,
      type: type
    };

    PostService(API_URL.GET_TRANSACTION_LIST, data).then(
      (res) => {
        console.log(res);
        setTransactionList(res.data?.data?.search_data);
        setTotal(res.data?.data?.total);
        setTotalPages(res.data?.data?.total_pages);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  };

  const handlePageClick = (e) => {
    setCurrentPage(e - 1);
  };

    const OnStatusFilter = (e) => {
    // console.log(e); 
    setCurrentPage(0);
    setstatus(e);
  };

  const OnTypeFilter = (e) => {
    // console.log(e); 
    setCurrentPage(0);
    setType(e);
  };

  const PriceSorting = () => {
    Pricesort.current = !Pricesort.current;
    if (Pricesort.current) {
      setSorting("total_amount|asc");
    } else {
      setSorting("total_amount|desc");
    }
  };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Transactions</h1>
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
                <li className="breadcrumb-item active">Transactions</li>
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
                  <div className="row mb-3 align-items-center">
                    <div className="col-md-2">
                    <select
                        className="form-select form-select-md cursor"
                        onChange={(e) => {
                          OnStatusFilter(e.target.value);
                        }}
                      >
                        <option value=""> Select Status</option>
                        <option value="succeeded">Complete</option>
                        <option value="unsucceeded">Incomplete</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                    <select
                        className="form-select form-select-md cursor"
                        onChange={(e) => {
                          OnTypeFilter(e.target.value);
                        }}
                      >
                        <option value=""> Select Type</option>
                        <option value="sale">Sale</option>
                        <option value="purchase">Purchase</option>
                      </select>
                    </div>
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
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
                    {!loading && (
                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center">S.No</th>
                            {/* {/ {/ <th className="text-center">Seller</th> /} /} */}
                            <th className="text-center">User</th>
                            <th className="text-center">Type</th>
                            <th className="text-center">Status</th>
                            <th
                              className="text-center"
                              onClick={() => {
                                PriceSorting();
                              }}
                            >
                              Amount ${" "}
                              <span>
                                {Pricesort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th className="text-center">Payment Mode</th>
                            {/* <th className="text-center">Transaction Id</th> */}
                            <th className="text-center">Created At</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transactionList &&
                            transactionList.map((transaction, i) => {
                              return (
                                <tr key={i}>
                                  <td className="text-center">{i + (currentPage * transactionLimit) + 1}</td>
                                  <td className="text-center">
                                    {transaction?.type === "purchase"?transaction?.buyer?.userName:transaction?.seller?.userName}
                                  </td>

                                  <td className="text-center">
                                    {transaction.type}
                                  </td>
                                  <td className="text-center">
                                    {transaction.status === "succeeded" && (
                                      <span className="fw-bold badge mx-1 p-1 badge-success">
                                        Completed
                                      </span>
                                    )}
                                    {transaction.status !== "succeeded" && (
                                      <span class="fw-bold badge mx-1 p-1 badge-danger">
                                        Failed
                                      </span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <span className="error">
                                      {transaction.total_amount}
                                    </span>
                                  </td>
                                  <td className="text-center">
                                    {transaction.payment_mode  && (
                                      <span className="fw-bold badge mx-1 p-1 badge-primary">
                                        {transaction.payment_mode}
                                      </span>
                                    )}
                                    {/* {/ {/ <span className="fw-bold badge mx-1 p-1 badge-info">Wallet</span> /} /} */}
                                  </td>
                                  {/* <td className="text-center">
                                    {transaction?.transactionId}{" "}
                                  </td> */}
                                  <td className="text-center">
                                    {" "}
                                    {format(
                                      parseISO(transaction.createdAt),
                                      "dd/MM/yyyy"
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Link
                                      className="text-warning fas fa-eye"
                                      to={
                                        "/panel/transactions/view/" +
                                        transaction?._id
                                      }
                                    ></Link>
                                  </td>
                                </tr>
                              );
                            })}
                          {transactionList && transactionList.length === 0 && (
                            <tr>
                              <h6> No Data Found </h6>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}

                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={2} loading={loading} />
                    </div>
                  </div>

                  <Pagination
                    counting={transactionLimit * currentPage}
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
    </div>
  );
};

export default Transaction;
