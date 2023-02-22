/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/img-redundant-alt */
 
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImageURL } from "../../../../Environment/Environment";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import "./ViewProduct.css";
import defaultImage from "../../../../assets/img/thumbnail.jpg";
import { toastEmmit } from "../../../../Helper/Toastr";
import { FadeLoader } from "react-spinners";

const ViewProduct = () => {
  const [loading,setLoading] = useState(true)
  const { id } = useParams();
  const [image, setImage] = useState(  defaultImage);
  const [product, setProduct] = useState();

  const getProduct = async () => {
    setLoading(true)
    const data = {
      product_id: id,
    };

    PostService(API_URL.GET_PRODUCT_DETAILS, data).then(
      (res) => {
        setProduct(res.data.data);
        setImage(res.data?.data?.product[0]?.image);
        console.log(res.data.data);
        setLoading(false)
      },
      (err) => {
        toastEmmit(err.message,'error') 
        setLoading(false)
      }
    );
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleMouseOver = (i) => {
    const elem = document.getElementById(i._id);
    elem.classList.add("highlight2");
    setImage(i.image);
  };

  const handleMouseOut = (imageId) => {
    const elem = document.getElementById(imageId);
    elem.classList.remove("highlight2");
  };

  return (
    <div>
      <section className="content-header">
  <div className="container-fluid">
    <div className="row mb-2">
      <div className="col-sm-6">
        <h1 className="default_color">View Product</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">
          <span className="breadcrumb-item">
            <Link to="/panel/dashboard"  >Dashboard </Link>
          </span>
          <span className="breadcrumb-item">
            <Link to="/panel/product" >Product's List</Link>
          </span>
          <span className="breadcrumb-item active" >View Product</span>
        </ol>
      </div>
    </div>
  </div>
</section>


      <div className="card p-3">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                        </div>

        {!loading && 
        <div className="row">
          <div className="col-lg-5 col-md-6">
            <div className="d-flex align-items-center flex-column">
              <div className="col-8">
                <div className="prewImg">
                  <img
                    alt="..."
                    title="View"
                    className="imageBox"
                    style={{ cursor: "pointer" }}
                    src={ImageURL + image}
                  />
                </div>
              </div>
              <div className="col-4 d-flex">
                {product?.product.map((i) => {
                  return (
                    <>
                      <img
                        alt="No image"
                        className="imageBoxSmall highlight p-1 m-2 cursor"
                        id={i._id}
                        onMouseOver={() => handleMouseOver(i)}
                        onMouseOut={() => handleMouseOut(i._id)}
                        src={ImageURL + i.image}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-md-6">
            <span className="d-flex mt-3 mb-2">
              <h6 className="ms-1 text-muted"></h6>
            </span>
            <div>
              <h3 className="ms-1 mt-3">{product?.name}</h3>
              <h3 className="ms-1 mt-3 text-success">
                <span _ngcontent-qeb-c125 className="error fw-bold h4">
                  $ {product?.selling_price}
                </span>
              </h3>
              <div className="row mt-3 h6">
                <div className="col-md-3 col-12 text-muted fw-bold">Stock</div>
                <div className="col-md-9 col-12">
                  <div className="row ms-1">
                    {product?.in_stock && (
                      <span style={{ color: "green" }}>Available</span>
                    )}
                    {!product?.in_stock && (
                      <span style={{ color: "red" }}>Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="row mt-3 h6">
                <div className="col-md-3 col-12 text-muted fw-bold">Status</div>
                <div className="col-md-9 col-12">
                  <div className="row ms-1">
                    {product?.isActive && (
                      <span style={{ color: "green" }}>Active</span>
                    )}
                    {!product?.isActive && (
                      <span style={{ color: "red" }}>Deactive</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="row">
                <div className="col-md-3 col-12 text-muted fw-bold h6">
                  Category
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.category_id.category_name}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-12 text-muted fw-bold h6">
                  Sub-Category
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.sub_category_id.sub_category_name}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-12 text-muted fw-bold h6">
                  Quantity
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.quantity}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-12 text-muted fw-bold h6">
                  Shipping Charges
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.shiping_charge}</span>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3 col-12 text-muted fw-bold h6">
                  Description
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.description}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default ViewProduct;