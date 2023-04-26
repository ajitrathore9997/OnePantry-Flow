import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";
import { useEffect } from "react";
import { PostService } from "../../../../Services/ConstantService";
import { API_URL } from "../../../../Services/APIservice";
import { ImageURL } from "../../../../Environment/Environment";
import { toastEmmit } from "../../../../Helper/Toastr";
import FadeLoader from "react-spinners/FadeLoader";

const EditContent = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const { id } = useParams();

  const [ContentData, setContentData] = useState("");

  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [email, setemail] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  const [contentImage, setcontentImage] = useState("");
  const [ImgPath, setLocalImgPath] = useState("");

  useEffect(() => {
    // console.log(id);
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const data = {
      content_id: id,
    };
    PostService(API_URL.GET_CONTENT_BY_ID, data).then((res) => {
      console.log(res);
      if (res.data.status === true) {
        setContentData(res?.data?.data);
        setTitle(res?.data?.data?.title);
        setDescription(res?.data?.data?.description);
        setemail(res?.data?.data?.email);
        setphoneNumber(res?.data?.data?.phoneNumber);
        setaddress(res?.data?.data?.address);
        setcontentImage(res?.data?.data?.image);
        setLocalImgPath(ImageURL + res?.data?.data?.image);
        setLoading(false);
      } else {
        toastEmmit(res.data.message, "error");
        setLoading(false);
      }
      console.log(ContentData);
    });
  };

  const onimageUpload = (e) => {
    setcontentImage(e.target.files[0]);
    setLocalImgPath(window.URL.createObjectURL(e.target.files[0]));
  };

  const submit = (e) => {
      e.preventDefault();
      
      if (!Title || !Description) {
          setError(true);
          return;
        }
        setLoading(true);
        
    let formdata = new FormData();
    formdata.append("content_id", id);
    formdata.append("title", Title);
    formdata.append("description", Description);
    formdata.append("content_type", ContentData?.content_type);
    if (ContentData?.content_type === "Contact_us") {
      formdata.append("email", email);
      formdata.append("phoneNumber", phoneNumber);
      formdata.append("address", address);
    }
    formdata.append("image", contentImage);

    for (const value of formdata.values()) {
      console.log(value);
    }

      PostService(API_URL.EDIT_CONTENT, formdata).then(
        (res) => {
            if(res?.data?.status === true){
                toastEmmit(res?.data?.message, "success");
                navigate('/panel/content')
                setLoading(false);
            }  
        },
        (err) => {
          console.log(err.response.data);
          toastEmmit(err.response.data?.message, "error");
          setLoading(false);
        }
      );
  };

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Edit Content </h1>
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

                <Link
                  to="/panel/content"
                  className="breadcrumb-item"
                  style={{ textDecoration: "none" }}
                >
                  Content's List
                </Link>

                <li className="breadcrumb-item active">Edit Content</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content d-flex justify-content-center">
        <div className="container-fluid">
          <div className=" ">
            <div className="card">
              <div style={{ display: "flex", justifyContent: "center" }}>
                <FadeLoader speedMultiplier={0.5} loading={loading} />
              </div>
              {!loading && (
                <div className="card-body">
                  <div className="row mt-3">
                    <div className="col-md-7 mx-5">
                      <div className="form-group">
                        <label>
                          Title<sup className="error">*</sup>
                        </label>
                        <input
                          type="text"
                          value={Title}
                          placeholder="Content Title"
                          className="form-control"
                          onChange={(e) => setTitle(e.target.value)}
                        />
                        {error && !Title && (
                          <div className="error">Title is required</div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>
                          Description<sup className="error">*</sup>
                        </label>
                        <CKEditor
                          editor={ClassicEditor}
                          data={Description}
                          onReady={(editor) => {
                            // You can store the "editor" and use when it is needed.
                          }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            //   console.log(data);
                            setDescription(data);
                          }}
                        />
                        {error && !Description && (
                          <div className="error">Description is required</div>
                        )}
                      </div>

                        {ContentData?.content_type === "Contact_us" && 
                      <div className="row">
                        <div className="col-md-6 form-group">
                          <label>Email</label>
                          <input
                            type="email"
                            value={email}
                            placeholder="Email"
                            className="form-control"
                            onChange={(e) => setemail(e.target.value)}
                          />
                          {/* {error && !Title && <div className="error">Title is required</div> } */}
                        </div>

                        <div className="col-md-6 form-group">
                          <label>Contact Number</label>
                          <input
                            type="number"
                            value={phoneNumber}
                            placeholder="Contact Number"
                            className="form-control"
                            onChange={(e) => setphoneNumber(e.target.value)}
                          />
                          {/* {error && !Title && <div className="error">Title is required</div> } */}
                        </div>

                        <div className="form-group">
                          <label>Address</label>
                          <textarea
                            className="form-control"
                            cols="1"
                            rows="2"
                            value={address}
                            placeholder="Address"
                            onChange={(e) => setaddress(e.target.value)}
                          ></textarea>
                          {/* {error && !Title && <div className="error">Title is required</div> } */}
                        </div>
                      </div> }
                    </div>

                    <div className="col-md-3 text-center">
                      <div className="col-md-12">
                        <img src={ImgPath} alt="..." className="contentImage" />
                      </div>
                      <div className="col-md-8 offset-md-2 mt-3">
                        {/* <label>Select Image</label> */}
                        <span className="btn btn-primary mainBtn btn-block btn-file">
                          Select Image
                          <input
                            type="file"
                            name="image"
                            accept=".jpg,.jpeg,.png"
                            onChange={(e) => onimageUpload(e)}
                          />
                        </span>
                        {/* {error && !catImage && <div className="error">Image should be selected</div>} */}
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary ms-5 mt-5"
                    onClick={(e) => submit(e)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditContent;
