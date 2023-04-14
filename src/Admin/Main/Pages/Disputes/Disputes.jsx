import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { format, parseISO } from "date-fns";
import Pagination from "../../../../Helper/Pagination";
import { FadeLoader } from "react-spinners";

const Disputes = () => {
  const [disputeList, setDisputeList] = useState();
  const [disputeAction, setDisputeAction] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState()
  const [total, setTotal] = useState();
  const [totalPages, setTotalPages] = useState();
  const [disputeLimit, setDisputeLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const getDisputeList = async () => {
    setLoading(true);

    const data = {
      limit: disputeLimit,
      page: currentPage,
      type: parseInt(sort),
    };

    PostService(API_URL.GET_DISPUTE_LIST, data).then(
      (res) => {
        console.log(res);
        setDisputeList(res.data?.data?.search_data);
        setTotal(res.data?.data?.total);
        setTotalPages(res.data?.data?.total_pages);
        setLoading(false);
      },
      (err) => {
        console.log(err);
        toastEmmit(err.response.data?.message, "error");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getDisputeList();
  }, [currentPage, search, sort]);

  const handlePageClick = async (e) => {
    setCurrentPage(e.selected);
  };

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Disputes</h1>
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
                <li className="breadcrumb-item active">Disputes</li>
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
                              setSort(e.target.value);
                            }}
                          >
                            <option value="">Sort-by</option>
                            <option value="1">Pending</option>
                            <option value="2">Resolved</option>
                            <option value="3">Rejected</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    {!loading && (
                      <table className="table table-hover text-nowrap table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Buyer</th>
                            <th className="text-center">Seller</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created At</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disputeList &&
                            disputeList.map((dispute, i) => {
                              return (
                                <tr key={i}>
                                  <td className="text-center">{i + 1}</td>
                                  <td className="text-center">
                                    {dispute?.buyer?.userName}
                                  </td>
                                  <td className="text-center">
                                    {dispute?.seller?.userName}
                                  </td>
                                  <td className="text-center">
                                    {dispute?.status === "pending" && (
                                      <span className="fw-bold badge p-2 bg-warning">
                                        Pending
                                      </span>
                                    )}
                                  </td>
                                  <td className="text-center">
                                    {format(
                                      parseISO(dispute?.createdAt),
                                      "dd/MM/yyyy"
                                    )}
                                  </td>
                                  <td className="text-center">
                                    <Link
                                      className="text-warning fas fa-eye"
                                      to={
                                        "/panel/disputes/view/" + dispute?._id
                                      }
                                    ></Link>

                                    <button
                                      title="Resolve"
                                      className="mx-3 table-icon btn btn-success btn-sm"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      onClick={() => {
                                        setDisputeAction({
                                          id: dispute?._id,
                                          action: "Resolve",
                                        });
                                      }}
                                    >
                                      Resolve
                                    </button>

                                    <button
                                      title="Reject"
                                      data-toggle="modal"
                                      data-target="#exampleModal"
                                      className="mx-2 table-icon btn btn-danger btn-sm"
                                      onClick={() => {
                                        setDisputeAction({
                                          id: dispute?._id,
                                          action: "Reject",
                                        });
                                      }}
                                    >
                                      Reject
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          {disputeList?.length === 0 && (
                            <tr>
                              <h6> No Data Found </h6>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    )}

                    {loading && (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <FadeLoader speedMultiplier={2} loading={loading} />
                      </div>
                    )}
                  </div>

                  <Pagination
                    counting={disputeLimit * currentPage}
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
                {disputeAction?.action} Dispute !
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
              <h6>
                {" "}
                Are you sure you want to {disputeAction?.action} this Dispute ?{" "}
              </h6>
            </div>
            <div className="modal-footer justify-content-center">
              <button
                type="button"
                className={
                  disputeAction?.action === "Resolve"
                    ? "btn btn-success "
                    : "btn btn-danger"
                }
                data-dismiss="modal"
                onClick={() => {}}
              >
                {disputeAction?.action}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Disputes;
