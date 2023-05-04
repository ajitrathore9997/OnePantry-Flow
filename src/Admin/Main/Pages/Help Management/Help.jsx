import React from "react";
import { Link } from "react-router-dom";
import Pagination from "../../../../Helper/Pagination";
import { useEffect } from "react";
import { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { PostService } from "../../../../Services/ConstantService";
import { API_URL } from "../../../../Services/APIservice";
import { toastEmmit } from "../../../../Helper/Toastr";
import { format, parseISO } from "date-fns";

const Help = () => {
  const [HelpList, setHelpList] = useState();
  const [TotalPageCount, SetTotalPageCount] = useState();
  const [TotalCount, SetTotalCount] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [search_key, setsearch_key] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(false);

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");

  const [selectedData, setSelectedData] = useState();

  useEffect(() => {
    getHelpList();
  },[search_key, currentPage]);

  const getHelpList = () => {
    setLoading(true);
    const param = {
      limit: 10,
      page: currentPage,
      sorting: "sortingKey|desc",
      search_key: search_key,
    };

    PostService(API_URL.GET_HELP_LIST, param).then(
      (res) => {
        console.log(res);
        setHelpList(res?.data?.data?.search_data);
        SetTotalPageCount(res?.data?.data?.total_pages);
        SetTotalCount(res?.data?.data?.total);
        setCount(res?.data?.data?.page * param.limit);
        setLoading(false);
      },
      (err) => {
        if (err) {
          console.log(err.data);
          toastEmmit(err.data?.message, "error");
          setLoading(false);
        }
      }
    );
  };

  const handlePageClick = (e) => {
    setCurrentPage(e - 1);
  };

  const search = (e) => {
    setsearch_key(e);
  };

  // function resetFunc() {
  //   // setSelectedData();
  //   setTitle("");
  //   setDescription("");
  //   setError(false);
  // }

  function resetdata() {
    // setSelectedData();
    setTitle("");
    setDescription("");
    setError(false);
  }

  const Addsubmit = (e) => {
    e.preventDefault(); 

    if (!Title || !Description) {
      setError(true);
      return;
    }
 
    const dataObj={
      title:Title,
      description:Description
    }
    PostService(API_URL.ADD_HELP, dataObj).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          document.getElementById("closeModal").click();
          getHelpList()
        } 
      },
      (err) => {
        console.log(err.response.data);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  const changeStatus = (id) => {
    const data = {
      helpId: id,
    };

    PostService(API_URL.CHANGE_HELP_STATUS, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          getHelpList();
        }else{
          toastEmmit(res?.data?.message, "error");
        }
      }
    );
  };

  function deleteHelp() {
    const data = {
      helpId: selectedData,
    };
    PostService(API_URL.DELETE_HELP, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          document.getElementById("DeleteModal").click();
        }
        getHelpList();
      },
      (err) => {
        console.log(err);
        toastEmmit(err.data?.message, "error");
      }
    );
  }

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
                        onClick={resetdata}
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
                        <tbody>
                          {HelpList?.map((data, i) => (
                            <tr key={i} className="text-center">
                              <td>{i + S_No_Count + 1}</td>
                              <td>
                                {data?.title
                                  ? data?.title
                                  : "N/A"}
                              </td> 
                              <td className="text-center">
                                <span
                                  className={
                                    data?.isActive
                                      ? "fw-bold badge p-2 badge-success"
                                      : "fw-bold badge p-2 badge-danger"
                                  }
                                > 
                                  {data?.isActive ? "Active" : "Deactive"}
                                </span>
                              </td>
                              <td>{format(parseISO(data?.createdAt),
                                      "dd/MM/yyyy"
                                    )}</td>
                              <td>
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

                                <span
                                  title="View"
                                  style={{ cursor: "pointer" }}
                                  className="mx-2"
                                  data-toggle="modal"
                                  data-target="#ViewModal"
                                  onClick={() => setSelectedData(data)}
                                >
                                  <i className="text-warning fas fa-eye"></i>
                                </span>

                                <span
                                  title="Delete"
                                  style={{ cursor: "pointer" }}
                                  className="mx-2"
                                  data-toggle="modal"
                                  data-target="#DeleteModal"
                                  onClick={() => setSelectedData(data?._id)}
                                >
                                  <i className="text-danger fas fa-trash"></i>
                                </span>

                                <span
                                  title="Edit"
                                  style={{ cursor: "pointer" }}
                                  className="mx-2"
                                  data-toggle="modal"
                                  data-target="#EditModal"
                                  onClick={() => setSelectedData(data)}
                                >
                                  <i className="text-dark fas fa-pen"></i>{" "}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {/* <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
                    </div> */}
                    <div className="mt-4">
                      <Pagination
                      counting={S_No_Count}
                      totaldata={TotalCount}
                      pagecount={TotalPageCount}
                      onChangePage={handlePageClick}
                      activePage={currentPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* // Add Modal Starts----------------- */}
      <div
        className="modal fade"
        id="AddModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Add Help
              </h4>
              <button
                type="button"
                className="btn-close"
                required
                data-dismiss="modal"
                aria-label="Close"
                // onClick={resetFunc}
              ></button>
            </div>
            <form onSubmit={(e) => Addsubmit(e)}>
              <div className="modal-body">
                <div className="form-group">
                  <label>
                    Title <sup className="error">*</sup>
                  </label>
                  <input
                    type="text"
                    name="Title"
                    value={Title}
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                  />
                  {Error && !Title && (
                    <div className="error">Title is required</div>
                  )}
                </div>
                <div className="form-group">
                  <label>
                    Description <sup className="error">*</sup>
                  </label>
                  <CKEditor 
                  editor={ClassicEditor}
                    data={Description}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({data });
                      setDescription(data)
                    }} />
                     {Error && !Description && (
                    <div className="error">Description is required</div>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="closeModal"
                  data-dismiss="modal"
                  // onClick={resetFunc}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

          {/* / DELETE MODAL Start-------------------- / */}
          <div
        className="modal fade"
        id="DeleteModal"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Help !
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
            <div className="modal-body">
              <h6> Are you sure you want to delete this Help ? </h6>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                id="DeleteModal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteHelp();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* / DELETE MODAL- End ------------------- / */}

      {/* / <!-- View Modal Start --> / */}

      <div
        className="modal fade"
        id="ViewModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h5 className="modal-title" id="exampleModalLabel">
                View Help !
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
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">
                    <label> Title :</label> 
                    <span className="h5"> {selectedData?.title} </span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    {/* {/ <h5> Status: { selectedData?.isActive ? 'Active' : 'Deactive'}</h5>  /} */}
                    <label>Status : </label> 
                    <span
                      className={
                        selectedData?.isActive
                          ? "text-success h5"
                          : "text-danger h5"
                      }
                    > 
                      {selectedData?.isActive ? "Active" : "Deactive"}
                    </span>
                  </div>
                </div>

                <div className="col-md-12">
                <div className="mb-3">
                  <label className="label-form mb-0">Description :</label>
                  <div dangerouslySetInnerHTML={{ __html: selectedData?.description }}></div>
                </div>
                <hr/>
              </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* / View Modal End  / */}                 









    </div>
  );
};

export default Help;
