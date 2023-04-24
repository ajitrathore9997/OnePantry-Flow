/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Pagination from "../../../../Helper/Pagination";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { format, parseISO } from "date-fns";

const Transaction = () => {
  const [loading, setLoading] = useState(true);
  const [transactionList, setTransactionList] = useState();

  //Pagination States
  const [currentPage, setCurrentPage] = useState(0);
  const [transactionLimit, setTransactionLimit] = useState(10);
  const [total, setTotal] = useState();
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    getTransactionList();
  }, [currentPage]);

  const getTransactionList = () => {
    setLoading(true);
    const data = {
      limit: transactionLimit,
      page: currentPage,
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
    setCurrentPage(e.selected);
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
                  <div className="row mb-3">
                    <div className="col-md-6 offset-md-6">
                      {/* <div className="d-flex justify-content-end">
                                                <div className="me-3">
                                                    <label >From </label>
                                                    <input type="date" className="form-control ng-untouched ng-pristine ng-valid" max="2023-02-24" />
                                                </div>
                                                <div>
                                                    <label>To </label>
                                                    <input type="date" className="form-control ng-untouched ng-pristine ng-valid" min="" max="2023-02-24" />
                                                </div>
                                            </div> */}
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
                            <th className="text-center">Amount $</th>
                            <th className="text-center">Payment Mode</th>
                            <th className="text-center">Transaction Id</th>
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
                                  <td className="text-center">
                                    {transaction?.transactionId}{" "}
                                  </td>
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
