/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import FadeLoader from "react-spinners/FadeLoader";
import Pagination from "../../../../Helper/Pagination";
import { format, parseISO } from "date-fns";

const UserOrderMngt = () => {

    const [loading, setLoading] = useState(true);
    const { id } = useParams()
    const [OrderList, setOrderList] = useState();

    const [OrderLimit, setOrderLimit] = useState(10);
    const [total, setTotal] = useState();
    const [totalPages, setTotalPages] = useState();
    const [S_No_Count, setCount] = useState(1);
    const [search_key, setsearch_key] = useState("");
    const [currentPage, setCurrentPage] = useState(0);
    const [status, setStatus] = useState();

    useEffect(() => {
        // const Ddate = new Date("2023-02-22T07:09:42.229Z").toLocaleDateString();
        // console.log(Ddate);
        getOrderList();
      }, [search_key, currentPage, status]);

    const getOrderList = () => {
        setLoading(true);

        const param = {
            limit: 10,
            page: currentPage,
            sorting: "sortingKey|desc",
            search_key: search_key,
            type: status,
            user_id: id
        };

        PostService(API_URL.GET_ORDER_LIST, param).then(
            (res) => {
                console.log(res);

                setOrderList(res.data.data.search_data);
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
      setCurrentPage(e - 1);
      };

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Order List By Seller</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <Link to="/panel/dashboard" className="breadcrumb-item" style={{ textDecoration: 'none' }}>
                                    Dashboard
                                </Link >
                                <Link to="/panel/user" className="breadcrumb-item" style={{ textDecoration: 'none' }}>
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
                  <div className="col-md-3 ms-auto  pt-2">
                    <div>
                      <label htmlFor="progress">Status</label>
                    </div>
                    <select
                      id="progress"
                      className="form-select float-right mb-3"
                      aria-label="Default select example"
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Current</option>
                      <option value="2">Past</option>
                      <option value="3">Cancel</option>
                       {/* <option value="3">Shipped</option> 
                       <option value="4">Delivered</option> 
                       <option value="5">Cancelled</option> 
                       <option value="6">Return</option> 
                       <option value="7">Refund</option>  */}
                    </select>
                  </div>

                  <div className="card-body table-responsive">
                    <table className="table table-hover text-nowrap table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Buyer</th>
                          <th className="text-center">Commission <span className="text-success">$</span> </th>
                          <th className="text-center">Total Bill  <span className="text-success">$</span> </th>
                          <th className="text-center">Created At</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {OrderList &&
                          OrderList.map((order, i) => {
                            return (
                              <tr key={i} className="ng-star-inserted">
                                <td className="text-center">{i + 1}</td>
                                <td className="text-center">{"N/A"}</td>
                                <td className="text-center ">
                                  {order.commission || "N/A"}
                                </td>
                                <td className="text-center">{order.price}</td>
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
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

        </div>
    )
}

export default UserOrderMngt