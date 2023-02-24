/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import "./category.css";
import defaultImg from "../../../../assets/img/thumbnail.jpg";
// import { ImageURL } from "../../../../Environment/Environment";

export const AddCategory = (props) => {
  // console.log("category calling ", props);
  const { getlist, selectedData, setSelectedData } = props;
  const [error,setError] = useState(false)
  const [catName, setcatname] = useState("");
  const [catImage, setcatImage] = useState("");
  const [ImgPath, setLocalImgPath] = useState(defaultImg);
  // console.log(ImgPath);
  // const onNameInputChange = (e) => {
  //   // console.log(e.target.value)
  //   setcatname(e.target.value);
  // };

  const onimageUpload = (e) => {
    setcatImage(e.target.files[0]);
    setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));
  };

  const submit = (e) => {
    e.preventDefault();

    if(!catName || !catImage){
      setError(true)
      return
    }

    let formdata = new FormData();
    formdata.append("category_name", catName);
    formdata.append("image", catImage);
    // for (var value of formdata.values()) {
    //   console.log(value);
    // }
    console.log(formdata);

    PostService(API_URL.ADD_CATEGORY, formdata).then(
      (res) => {
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          e.target.reset();
          setLocalImgPath(defaultImg);
          props.getlist();
          document.getElementById("closeModal").click();
        }
        //  navigate('/panel/category')
        //  getCategoryList()
      },
      (err) => {
        console.log(err.response.data);
        toastEmmit(err.response.data?.message, "error");
      }
    );
  };

  // useEffect(() => {
  //   setcatname(selectedData?.category_name || '')
  //   setcatImage(selectedData?.image || '')
  //   setLocalImgPath( (selectedData?.image) ? (ImageURL + selectedData?.image) : '')
  // }, [selectedData])

  function resetFunc() {
    // setSelectedData();
    setcatname("");
    setcatImage("");
    setLocalImgPath(defaultImg);
    setError(false)
  }

  return (
    <>
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
                Add Category
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
                  <label>Name of Category</label>
                  <input
                    type="text"
                    name="name"
                    value={catName}
                    className="form-control"
                    onChange={(e) => setcatname(e.target.value.trim())}
                    placeholder="Name"
                  />
                  {error && !catName && <div className="error">Category Name cannot be empty</div>}
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
                        {error && !catImage && <div className="error">Image should be selected</div>}
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
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
