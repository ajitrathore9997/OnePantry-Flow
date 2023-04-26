/* eslint-disable react-hooks/exhaustive-deps */
import { format, parseISO } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Pagination from "../../../../Helper/Pagination";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";

const Content = () => {
  const [ContentList, setContentList] = useState();
  const [TotalPageCount, SetTotalPageCount] = useState();
  const [TotalCount, SetTotalCount] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [search_key, setsearch_key] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    getContentList();
  }, [search_key, currentPage]);

  const getContentList = () => {
    setLoading(true);

    const param = {
      limit: 10,
      page: currentPage,
      sorting: "sortingKey|desc",
      search_key: search_key,
    };

    PostService(API_URL.GET_CONTENT_LIST, param).then((res) => {
      // console.log(res);
      if (res?.data?.status === true) {
        setContentList(res.data.data.search_data);
        SetTotalPageCount(res.data.data.total_pages);
        SetTotalCount(res.data.data.total);
        setCount(res.data.data.page * param.limit);
        setLoading(false);
      } else {
        toastEmmit(res?.data?.message, "error");
        setLoading(false);
      }
    });
  };

  const changeStatus = (id) => {
    const data = {
      content_id: id,
    };

    PostService(API_URL.CHANGE_CONTENT_STATUS, data).then((res) => {
      // console.log(res);
      if (res.data.status === true) {
        toastEmmit(res?.data?.message, "success");
        getContentList();
      } else {
        toastEmmit(res?.data?.message, "error");
      }
    });
  };

  const handlePageClick = (e) => {
    // console.log(e.selected);
    setCurrentPage(e.selected);
  };

  const search = (e) => {
    setsearch_key(e);
  };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Content List</h1>
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
                <li className="breadcrumb-item active">Content</li>
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
                      <nav className="navbar">
                        <input
                          className="form-control"
                          type="text"
                          name="firstnamesearch"
                          placeholder="Search by Keyword"
                          onChange={(e) => search(e.target.value)}
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
                            <th className="text-center">Title</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created-At</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ContentList?.map((data, i) => (
                            <tr key={i} className="text-center">
                              <td>{i + S_No_Count + 1}</td>
                              <td>{data?.title ? data?.title : "N/A"}</td>
                              <td className="text-center">
                                <span
                                  className={
                                    data?.isActive
                                      ? "fw-bold badge p-2 badge-success"
                                      : "fw-bold badge p-2 badge-danger"
                                  }
                                >
                                  {" "}
                                  {data?.isActive ? "Active" : "Deactive"}
                                </span>
                              </td>
                              <td>{format(parseISO(data?.createdAt),
                                      "dd/MM/yyyy"
                                    )}</td>
                              <td className="text-center">
                                <span
                                  className="form-switch pt-1 "
                                  title={data.isActive ? "Deactive" : "Active"}
                                >
                                  <input
                                    className="form-check-input checkbox"
                                    style={{ cursor: "pointer" }}
                                    type="checkbox"
                                    role="switch"
                                    checked={data?.isActive}
                                    onChange={() => changeStatus(data?._id)}
                                  />
                                </span>

                                <Link
                                  title="View"
                                  style={{ cursor: "pointer" }}
                                  className="mx-2"
                                  to={`view/${data?._id}`}
                                >
                                  <i className="text-warning fas fa-eye"></i>
                                </Link>
                                <Link
                                  title="Update"
                                  className="mx-2 table-icon"
                                  to={`edit/${data?._id}`}
                                >
                                  <i className="text-dark fas fa-pen"></i>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={2} loading={loading} />
                    </div>
                  </div>

                  <div className="mt-4">
                    <Pagination
                      counting={S_No_Count}
                      totaldata={TotalCount}
                      pagecount={TotalPageCount}
                      onChangePage={handlePageClick}
                    ></Pagination>
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

export default Content;
