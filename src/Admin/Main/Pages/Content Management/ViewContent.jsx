/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostService } from "../../../../Services/ConstantService";
import { API_URL } from "../../../../Services/APIservice";
import { toastEmmit } from "../../../../Helper/Toastr";
import { useEffect } from "react";
import { ImageURL } from "../../../../Environment/Environment";
import defaultImg from "../../../../assets/img/thumbnail.jpg";
import "./Content.css";

const ViewContent = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [Contentdata, setContentdata] = useState();

  const getContentData = async () => {
    // console.log(id);
    const data = {
      content_id: id,
    };

    PostService(API_URL.GET_CONTENT_BY_ID, data).then(
      (res) => {
        // console.log(res);
        if (res.status === 200) {
          setContentdata(res.data.data);
          // console.log(Contentdata);
          setLoading(false);
        }
      },
      (err) => {
        toastEmmit(err.response.data?.message, "error");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    setLoading(true);
    getContentData();
  }, []);

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">View Content</h1>
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

                <li className="breadcrumb-item active">View Content</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid p-2">
        <div className="card p-3">
          <div className="row m-3">
            <div className="col-md-9">
              <h3 className="form-label text-center mb-3">
                {Contentdata?.title}
              </h3>
              <div>
                <div
                  dangerouslySetInnerHTML={{ __html: Contentdata?.description }}
                ></div>
              </div>
              {Contentdata?.content_type === "Contact_us" && (
                <div className="mt-5">
                  <div>
                    <label>Email : </label> 
                    { Contentdata?.email}
                  </div>
                  <div>
                    <label>Contact Number : </label>
                    {Contentdata?.phoneNumber}
                  </div>
                  <div>
                    <label>Address : </label>
                    {Contentdata?.address}
                  </div>
                </div>
              )}
            </div>
            <div className="col-md-3 text-center mt-5">
              <img
                src={
                  Contentdata && Contentdata.image
                    ? ImageURL + Contentdata.image
                    : defaultImg
                }
                className="contentImage"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
