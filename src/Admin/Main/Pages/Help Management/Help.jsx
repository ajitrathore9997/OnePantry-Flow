import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../../Helper/Pagination";
import { useEffect } from "react";
import { useState } from "react";

const Help = () => {
  const [HelpList, setHelpList] = useState();
  const [TotalPageCount, SetTotalPageCount] = useState();
  const [TotalCount, SetTotalCount] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [search_key, setsearch_key] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    getHelpList();
  }, [search_key, currentPage]);

  const getHelpList = () => {
    //   setLoading(true);
    //   const param = {
    //     limit: 10,
    //     page: currentPage,
    //     sorting: "sortingKey|desc",
    //     search_key: search_key,
    //   };
  };

  const handlePageClick = (e) => {
    console.log(e.selected);
    setCurrentPage(e.selected);
    // getHelpList()
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
              <h1 className="default_color">Help Management</h1>
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
                <li className="breadcrumb-item active">Help Management</li>
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
                    <div className="col-md-6 pt-2">
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        data-toggle="modal"
                        data-target="#AddModal"
                      >
                        <i className="fas fa-plus" />
                        &nbsp;Add Help
                      </button>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-4">
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
                      <table className="table table-hover table-bordered">
                        <thead>
                          <tr>
                            <th className="text-center">S.No</th>
                            <th className="text-center">Title</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Created-at</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                      </table>
                    )}
                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
                    </div> */}
                    <div className="mt-4">
                      <Pagination
                      // counting={S_No_Count}
                      // totaldata={TotalCount}
                      // pagecount={TotalPageCount}
                      // onChangePage={handlePageClick}
                      />
                    </div>
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

export default Help;
