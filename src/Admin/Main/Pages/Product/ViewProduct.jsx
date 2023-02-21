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

const ViewProduct = () => {
  const { id } = useParams();
  const [image, setImage] = useState();
  const [product, setProduct] = useState();

  const getProduct = async () => {
    const data = {
      product_id: id,
    };

    PostService(API_URL.GET_PRODUCT_DETAILS, data).then(
      (res) => {
        setProduct(res.data.data);
        setImage(res.data.data.product[0].image);
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
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
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="default_color">View Product</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <a class="breadcrumb-item">
                  <Link to="/panel/dashboard">Dashboard</Link>
                </a>
                <a class="breadcrumb-item">
                  <Link to="/panel/product">Product's List</Link>
                </a>
                <Link class="breadcrumb-item active">View Product</Link>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="card p-3">
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
                        className="imageBoxSmall highlight p-1 m-2 "
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
                  $
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
                    {product?.isAvailable && (
                      <span style={{ color: "green" }}>Available</span>
                    )}
                    {!product?.isAvailable && (
                      <span style={{ color: "red" }}>Unavailable</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
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
                  Selling Price
                </div>
                <div className="col-md-9 col-12 h6">
                  <div className="row ms-2">
                    <span>{product?.selling_price}</span>
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
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
