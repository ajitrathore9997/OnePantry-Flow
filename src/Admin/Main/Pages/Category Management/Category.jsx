import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import { AddCategory } from "./AddCategory";
import { EditCategory } from "./EditCategory";
import { ImageURL } from "../../../../Environment/Environment";
import defaultImg from "../../../../assets/img/thumbnail.jpg";
import Pagination from "../../../../Helper/Pagination";
 

export const Category = () => {
  const [CategoryList, setCategoryList] = useState();
  const [TotalPageCount, SetTotalPageCount] = useState();
  const [TotalCount, SetTotalCount] = useState();
  const [S_No_Count, setCount] = useState(1);
  const [search_key, setsearch_key] = useState("");
  const [currentPage, setCurrentPage] = useState(0);


  const [selectedData, setSelectedData] = useState()
  useEffect(() => {
    getCategoryList();
  }, [search_key,currentPage]);

  const getCategoryList = () => {
    const param = {
      limit: 10,
      page: currentPage,
      sorting: "sortingKey|desc",
      search_key: search_key,
    };

    PostService(API_URL.GET_CATEGORY_LIST, param).then(
      (res) => {
        console.log(res);

        setCategoryList(res.data.data.search_data);
        SetTotalPageCount(res.data.data.total_pages);
        SetTotalCount(res.data.data.total);
        setCount(res.data.data.page * param.limit);
      },
      (err) => {
        if (err) {
          console.log(err.response.data);
          toastEmmit(err.response.data?.message, "error");
        }
      }
    );
  };

  function deleteCategory() {
    const data = {
      category_id: selectedData,
    };

    PostService(API_URL.DELETE_CATEGORY, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          document.getElementById('DeleteModal').click();
        }
        getCategoryList();
      },
      (err) => {
        console.log(err);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  }

  const changeStatus = (id) => {
    const data = {
      category_id: id,
    };

    PostService(API_URL.CHANGE_CATEGORY_STATUS, data).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
        }
        getCategoryList();
      },
      (err) => {
        console.log(err);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };
  
  const handlePageClick = (e) => {
    console.log(e.selected)
    setCurrentPage(e.selected)
    // getCategoryList()
}

const search = (e)=>{
  setsearch_key(e)

}

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color"> Category List</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                   <Link to={'/panel/dashboard'}> Dashboard </Link>
                </li>
                <li className="breadcrumb-item active">Category List</li>
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
                        &nbsp;Add Category
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
                          onChange={(e)=>search(e.target.value)}
                        />
                      </nav>
                    </div>
                  </div>
                  <div className="card-body table-responsive">
                    <table className="table table-hover table-bordered">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CategoryList?.map((data, i) => (
                          <tr key={i} className="text-center">
                            <td>{i + S_No_Count + 1}</td>
                            <td>
                              {data?.category_name
                                ? data?.category_name
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

                              <span class="form-switch pt-1 " title={data.isActive ? 'Deactive' : 'Active'}>
                                <input class="form-check-input checkbox" style={{ cursor: "pointer" }} type="checkbox" role="switch" checked={data?.isActive}
                                  onChange={() => changeStatus(data?._id)} />
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
                    <div className="mt-4">
                    <Pagination counting={S_No_Count}  totaldata={TotalCount} pagecount={TotalPageCount} onChangePage={handlePageClick} />
                    </div>

                    <AddCategory getlist={getCategoryList} />
                    <EditCategory getlist={getCategoryList} selectedData={selectedData} setSelectedData={setSelectedData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* DELETE MODAL-------------------- */}
      <div className="modal fade"
        id="DeleteModal" role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Delete Category !
              </h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" >
              <h6> Are you sure you want to delete this Category ? </h6>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" id='DeleteModal' >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteCategory();
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

      <div className="modal fade" id="ViewModal" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
            <h5 className="modal-title" id="exampleModalLabel">
                View Category !
              </h5> 
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="mb-3">  
                    <label> Name of Category :</label> <span className="h5"> {selectedData?.category_name} </span>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="mb-3">

                    {/* <h5> Status: { selectedData?.isActive ? 'Active' : 'Deactive'}</h5>  */}
                    <label>Status : </label> <span className={selectedData?.isActive ? 'text-success h5' : 'text-danger h5' }> {selectedData?.isActive ? 'Active' : 'Deactive' }</span>
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
                  <img src={selectedData?.image ? ImageURL+selectedData?.image : defaultImg} alt="" className="categoryImage"/>
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
