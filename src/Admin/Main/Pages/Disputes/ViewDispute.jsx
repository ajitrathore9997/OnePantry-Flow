/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { toastEmmit } from "../../../../Helper/Toastr";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";

const ViewDispute = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [dispute, setDispute] = useState();

  const getDispute = async () => {
    setLoading(true);
    const data = {
      dispute_id: id,
    };

    PostService(API_URL.GET_DISPUTE_DETAIL, data).then(
      (res) => {
        console.log(res);
        if(res.data.status === true){
          setDispute(res.data);
        }else{
          toastEmmit(res?.data?.message, "error");
        }
        setLoading(false);
      } 
    );
  };

  useEffect(() => {
    getDispute();
  }, []);

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">View Dispute</h1>
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
                  to="/panel/disputes"
                  className="breadcrumb-item"
                  style={{ textDecoration: "none" }}
                >
                  Disputes
                </Link>
                <li className="breadcrumb-item active">View Dispute</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="content  d-flex justify-content-center">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                {!loading && (
                  <>
                    <div className="card-header">
                      <div className="row p-4 d-flex ">
                        <div className="col-md-4">
                          <h4>
                            <strong>Buyer Detail</strong> 
                          </h4>
                          <div>
                            <strong>Name :</strong>{" "}
                            {dispute?.data?.buyer?.userName}
                          </div>
                          <div>
                            <strong> Email :</strong>{" "}
                            {dispute?.data?.buyer?.email}
                          </div>
                          <div>
                            <strong>Status : </strong> {dispute?.data?.status}
                          </div>
                        </div>
                        <div className="col-md-4">
                          <h4>
                            <strong>Seller Detail</strong> 
                          </h4>
                          <div>
                            <strong>Name :</strong>{" "}
                            {dispute?.data?.seller?.userName}
                          </div>
                          <div>
                            <strong> Email :</strong>{" "}
                            {dispute?.data?.seller?.email}
                          </div>
                        </div>

                        <div className="col-md-4">
                          <h4>
                            <strong> Product Detail</strong> 
                          </h4>
                          <div>
                            <strong>Name :</strong>{" "}
                            {dispute?.data?.products?.name}
                          </div>
                          <div>
                            <strong> Price :</strong>{" "}
                            {dispute?.data?.products?.selling_price}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="float-left mb-3 mx-5 p-4">
                      <strong>Message :</strong> {dispute?.data?.reason}
                    </div>
                  </>
                )}

                {loading && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <FadeLoader speedMultiplier={2} loading={loading} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewDispute;
