/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import FadeLoader from "react-spinners/FadeLoader";
import Pagination from "../../../../Helper/Pagination";
import { format, parseISO } from "date-fns";
import { useRef } from "react";

export default function Order() {
  const [OrderList, setOrderList] = useState();
  const [seller, setSeller] = useState();
  const [OrderLimit, setOrderLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState();
  const [status, setStatus] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState("sortingKey|desc");
  const sort = useRef(false);
  const Commissionsort = useRef(false);
  const Billsort = useRef(false);

  useEffect(() => {
    // const Ddate = new Date("2023-02-22T07:09:42.229Z").toLocaleDateString();
    // console.log(Ddate);
    getOrderList();
  }, [search, currentPage, status, sorting]);

  const getOrderList = () => {
    setLoading(true);

    const param = {
      limit: OrderLimit,
      page: currentPage,
      sorting: sorting,
      search_key: search,
      type: status,
    };

    PostService(API_URL.GET_ORDER_LIST, param).then(
      (res) => {
        console.log(res);

        setOrderList(res.data.data.search_data);
        setSeller(res.data.data.search_data);
        // setStatus(res.data.data.search_data)
        setTotalPages(res.data.data.total_pages);
        setTotal(res.data.data.total);
        setCount(res.data.data.page * param.limit);
        setLoading(false);
      },
      (err) => {
        if (err) {
          console.log(err.response.data);
          toastEmmit(err.response.data?.message, "error");
          setLoading(false);
        }
      }
    );
  };

  const handlePageClick = (e) => {
    // setCurrentPage(e.selected);
    setCurrentPage(e - 1);
  };

  function changeStatus(e) {
    setStatus(e);
    setCurrentPage(0);
  }

  const changeSorting = () => {
    sort.current = !sort.current;
    if (sort.current) {
      setSorting("sortingKey|asc");
    } else {
      setSorting("sortingKey|desc");
    }
  };

  const commissionSort = () => {
    Commissionsort.current = !Commissionsort.current;
    if (Commissionsort.current) {
      setSorting("commission|asc");
    } else {
      setSorting("commission|desc");
    }
  };

  const billSort = () => {
    Billsort.current = !Billsort.current;
    if (Billsort.current) {
      setSorting("amount|asc");
    } else {
      setSorting("amount|desc");
    }
  };

  return ( 
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Orders</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/panel/dashboard"}>Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Orders</li>
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
                    <div className="col-md-3 pt-2">
                      {/* <div>
                      <label htmlFor="progress">Status</label>
                    </div> */}
                      <select
                        id="progress"
                        className="form-select float-right mb-3"
                        aria-label="Default select example"
                        onChange={(e) => changeStatus(e.target.value)}
                      >
                        <option value="">Select Status</option>
                        <option value="1">Current</option>
                        <option value="2">Past</option>
                        <option value="3">Cancel</option>
                        {/* <option value="3">Shipped</option> */}
                        {/* <option value="4">Delivered</option> */}
                        {/* <option value="5">Cancelled</option> */}
                        {/* <option value="6">Return</option> */}
                        {/* <option value="7">Refund</option> */}
                      </select>
                    </div>
                    <div className="col-md-4 ms-auto">
                      <nav className="navbar">
                        <input
                          type="text"
                          name="firstnamesearch"
                          placeholder="search by keyword"
                          className="form-control ng-pristine ng-valid ng-touched"
                          onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(0);
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
                            <th className="text-center">Buyer</th>
                            <th
                              className="text-center"
                              onClick={() => {
                                commissionSort();
                              }}
                            >
                              Commission ${" "}
                              <span>
                                {Commissionsort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                            </th>
                            <th className="text-center"
                             onClick={() => {
                              billSort();
                            }} >
                              Total Bill ${" "}
                              <span>
                                {Billsort.current ? (
                                  <i className="fa fa-sort-up"></i>
                                ) : (
                                  <i className="fa fa-sort-down"></i>
                                )}
                              </span>
                              </th>
                            <th className="text-center">Created At</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {OrderList &&
                            OrderList.map((order, i) => {
                              return (
                                <tr key={i} className="ng-star-inserted">
                                  <td className="text-center">
                                    {i + currentPage * OrderLimit + 1}
                                  </td>
                                  <td className="text-center">
                                    {order?.buyerDetail?.userName || "N/A"}
                                  </td>
                                  <td className="text-center ">
                                    {order.commission || "N/A"}
                                  </td>
                                  <td className="text-center">
                                    {order.amount || "N/A"}
                                  </td>
                                  <td className="text-center">
                                    {format(
                                      parseISO(order.createdAt),
                                      "dd/MM/yyyy"
                                    )}
                                  </td>
                                  <td className="text-center justify-content-center">
                                    <span
                                      title="View"
                                      className="mx-2 table-icon"
                                    >
                                      <Link
                                        to={"/panel/order/view/" + order._id}
                                        className="text-warning fas fa-eye"
                                      ></Link>
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          {OrderList && OrderList.length === 0 && (
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
                    counting={OrderLimit * currentPage}
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
    </>
  );
}
