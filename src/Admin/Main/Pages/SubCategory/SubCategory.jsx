/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { GetService, PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import { ImageURL } from "../../../../Environment/Environment";
import Pagination from "../../../../Helper/Pagination";
import defaultImg from "../../../../assets/img/thumbnail.jpg";
import FadeLoader from "react-spinners/FadeLoader";

export const SubCategory = () => {
  const [error, setError] = useState(false);
  const [Sub_CategoryList, setSub_CategoryList] = useState();
  const [TotalPageCount, SetTotalPageCount] = useState();
  const [TotalCount, SetTotalCount] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [search_key, setsearch_key] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const [selectedData, setSelectedData] = useState();

  const [CatList, setCatList] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSub_CategoryList();
    CategoryList();
  }, [search_key, currentPage]);

  const getSub_CategoryList = () => {
    setLoading(true);
    const param = {
      limit: 10,
      page: currentPage,
      sorting: "sortingKey|desc",
      search_key: search_key,
    };

    PostService(API_URL.GET_SUB_CATEGORY_LIST, param).then(
      (res) => {
        console.log(res);

        setSub_CategoryList(res.data.data.search_data);
        SetTotalPageCount(res.data.data.total_pages);
        SetTotalCount(res.data.data.total);
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

  function deleteSub_Category() {
    const data = {
      sub_category_id: selectedData,
    };

    PostService(API_URL.DELETE_Sub_CATEGORY, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          document.getElementById("DeleteModal").click();
        }
        getSub_CategoryList();
      },
      (err) => {
        console.log(err);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  }

  const changeStatus = (id) => {
    const data = {
      sub_category_id: id,
    };

    PostService(API_URL.CHANGE_SUB_CATEGORY_STATUS, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getSub_CategoryList();
      },
      (err) => {
        console.log(err);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  const handlePageClick = (e) => {
    setCurrentPage(e - 1);
  };

  const search = (e) => {
    setsearch_key(e);
  };

  // For ADD SUB-CATEGORY SECTION ----

  const [Sub_catName, setsub_catname] = useState("");
  const [selected_Cat, Setselected_Cat] = useState("");
  const [Sub_catImage, setsub_catImage] = useState("");
  const [ImgPath, setLocalImgPath] = useState(defaultImg);

  useEffect(() => {
    // console.log("data selected", selectedData);
    setsub_catname(selectedData?.sub_category_name);
    Setselected_Cat(selectedData?.category_id);
    setsub_catImage(selectedData?.image);
    setLocalImgPath(
      selectedData?.image ? ImageURL + selectedData?.image : defaultImg
    );
  }, [selectedData]);

  const onimageUpload = (e) => {
    setsub_catImage(e.target.files[0]);
    setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));
  };

  const submit = (e) => {
    e.preventDefault();

    if (!Sub_catName || !selected_Cat || !Sub_catImage) {
      setError(true);
      return;
    }
    let formdata = new FormData();
    formdata.append("sub_category_name", Sub_catName);
    formdata.append("category_id", selected_Cat);
    formdata.append("image", Sub_catImage || "");
    if (selectedData) {
      formdata.append("sub_category_id", selectedData?._id);
    }
    // for (var value of formdata.values()) {
    //   console.log(value);
    // }
    // console.log(formdata);

    const Set_URL = selectedData
      ? API_URL.EDIT_SUB_CATEGORY
      : API_URL.ADD_SUB_CATEGORY;

    PostService(Set_URL, formdata).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          resetFunc();
          getSub_CategoryList();
          document.getElementById("closeModal").click();
        }
      },
      (err) => {
        console.log(err.response.data);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  function CategoryList() {
    GetService(API_URL.CATEGORY_LIST_WITHOUT_PAGINATION).then((res) => {
      console.log(res);
      if (res.data.status === true) {
        setCatList(res?.data?.data);
        // console.log(CatList);
      }
    });
  }

  function resetFunc() {
    setError(false);
    setSelectedData("");
    setsub_catname("");
    Setselected_Cat("");
    setsub_catImage("");
    setLocalImgPath(defaultImg);
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color"> Sub-Category List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <Link to={"/panel/dashboard"}> Dashboard </Link>
                </li>
                <li className="breadcrumb-item active">Sub-Category List</li>
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
                        onClick={resetFunc}
                      >
                        <i className="fas fa-plus" />
                        &nbsp;Add Sub-Category
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
                            <th className="text-center">Sub-Category</th>
                            <th className="text-center">Category</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Sub_CategoryList?.map((data, i) => (
                            <tr key={i} className="text-center">
                              <td>{i + S_No_Count + 1}</td>
                              <td>
                                {data?.sub_category_name
                                  ? data?.sub_category_name
                                  : "N/A"}
                              </td>
                              <td>
                                {data?.category?.category_name
                                  ? data?.category?.category_name
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
                                  {" "}
                                  {data?.isActive ? "Active" : "Deactive"}
                                </span>
                              </td>

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
                                  data-target="#AddModal"
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
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <FadeLoader speedMultiplier={0.5} loading={loading} />
                    </div>
                    <div className="mt-4">
                      <Pagination
                        counting={S_No_Count}
                        totaldata={TotalCount}
                        pagecount={TotalPageCount}
                        onChangePage={handlePageClick}
                        activePage={currentPage}
                      />
                    </div>

                    {/* <AddCategory getlist={getSub_CategoryList} />
                    <EditCategory getlist={getSub_CategoryList} selectedData={selectedData} setSelectedData={setSelectedData} /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADD MODAL START -----------------*/}

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
                {selectedData ? "Edit Sub-Category !" : "Add Sub-Category !"}
              </h4>
              <button
                type="button"
                className="btn-close"
                required
                data-dismiss="modal"
                aria-label="Close"
                onClick={resetFunc}
              ></button>
            </div>
            <form onSubmit={(e) => submit(e)}>
              <div className="modal-body">
                <div className="form-group">
                  <label>Name of Sub-Category</label>
                  <input
                    type="text"
                    name="name"
                    value={Sub_catName}
                    className="form-control"
                    onChange={(e) => setsub_catname(e.target.value)}
                    placeholder="Name"
                  />
                  {error && !Sub_catName && (
                    <div className="error">Name is required</div>
                  )}
                </div>

                <div className="form-group">
                  <label>Select Category</label>
                  <select
                    className="form-select"
                    onChange={(e) => Setselected_Cat(e.target.value)}
                    value={selected_Cat}
                  >
                    <option value="">Select</option> 
                    {/* <option>Select</option> */}
                    {CatList.map((e, key) => {
                      return (
                        <option key={key} value={e._id}>
                          {e.category_name}
                        </option>
                      );
                    })}
                  </select>
                  {error && !selected_Cat && (
                    <div className="error">Please select Category</div>
                  )}
                </div>

                <div className="mt-3">
                  <label>Select Image</label>

                  <div className="row d-flex align-items-start">
                    <div className="col-md-5 col-6">
                      <span className="btn btn-primary mainBtn btn-block btn-file">
                        Select Image
                        <input
                          type="file"
                          name="image"
                          accept=".jpg,.jpeg,.png"
                          onChange={(e) => onimageUpload(e)}
                        />
                      </span>
                      {error && !Sub_catImage && (
                        <div className="error">Image is required</div>
                      )}
                    </div>
                    <div className="col-md-7 col-6">
                      <img src={ImgPath} alt="..." className="categoryImage" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  id="closeModal"
                  data-dismiss="modal"
                  onClick={resetFunc}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  {selectedData ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* ADD MODAL END -------------------- */}

      {/* DELETE MODAL-------------------- */}
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
                Delete Sub-Category !
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
              <h6> Are you sure you want to delete this Sub-Category ? </h6>
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
                  deleteSub_Category();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* DELETE MODAL- End ------------------- */}

      {/* <!-- View Category Modal Start --> */}

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
                View Sub-Category !
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
                    <label>Sub-Category Name :</label>{" "}
                    <span className="h5">
                      {" "}
                      {selectedData?.sub_category_name}{" "}
                    </span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    <label>Category Name :</label>{" "}
                    <span className="h5">
                      {" "}
                      {selectedData?.category?.category_name}{" "}
                    </span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">
                    {/* <h5> Status: { selectedData?.isActive ? 'Active' : 'Deactive'}</h5>  */}
                    <label>Status : </label>{" "}
                    <span
                      className={
                        selectedData?.isActive
                          ? "text-success h5"
                          : "text-danger h5"
                      }
                    >
                      {" "}
                      {selectedData?.isActive ? "Active" : "Deactive"}
                    </span>
                  </div>
                </div>

                {/* <div class="col-md-12">
                <div class="mb-3">
                  <label for="description" class="label-form mb-0">Description :</label>
                  {{ dataObj?.description}}
                </div>
                <hr>
              </div> */}

                <div className="col-md-12 text-center">
                  <div className="mb-3">
                    <img
                      src={
                        selectedData?.image
                          ? ImageURL + selectedData?.image
                          : defaultImg
                      }
                      alt=""
                      className="categoryImage"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* View Category Modal End  */}
    </>
  );
};
