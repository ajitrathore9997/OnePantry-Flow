import React, { useEffect, useState } from "react";
import { ImageURL } from "../../../../Environment/Environment";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import defaultImg from "../../../../assets/img/thumbnail.jpg";

export const EditCategory = (props) => {
  // console.log("Edit category calling ", props);
  const { getlist, selectedData, setSelectedData } = props;

  const [catName, setcatname] = useState("");
  const [catImage, setcatImage] = useState("");
  const [ImgPath, setLocalImgPath] = useState("");

  useEffect(() => {
    setcatname(selectedData?.category_name);
    setcatImage(selectedData?.image);
    setLocalImgPath(
      selectedData?.image ? ImageURL + selectedData?.image : defaultImg
    );
  }, [selectedData]);

  const onimageUpload = (e) => {
    setcatImage(e.target.files[0]);
    setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));
  };

  const submit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    formdata.append("category_id", selectedData?._id);
    formdata.append("category_name", catName);
    formdata.append("image", catImage);
    // for (var value of formdata.values()) {
    //   console.log(value);
    // }
    console.log(formdata);

    PostService(API_URL.EDIT_CATEGORY, formdata).then(
      (res) => {
        document.getElementById("closeEditModal").click();
        console.log(res);
        if (res.data.status === true) {
          toastEmmit(res?.data?.message, "success");
          // e.target.reset();
          resetFunc();
          getlist();
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

  function resetFunc() {
    setSelectedData();
    setcatname("");
    setcatImage("");
    setLocalImgPath(defaultImg);
  }

  return (
    <>
      <div
        className="modal fade"
        id="EditModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="exampleModalLabel">
                Edit Category
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
                    onChange={(e) => setcatname(e.target.value)}
                    placeholder="eg: Beverages etc ...."
                  />
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
                  id="closeEditModal"
                  data-dismiss="modal"
                  onClick={resetFunc}
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
