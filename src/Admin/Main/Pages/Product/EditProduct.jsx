/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ImageURL } from "../../../../Environment/Environment";
import { API_URL } from "../../../../Services/APIservice";
import { GetService, PostService } from "../../../../Services/ConstantService";
import defaultImage from "../../../../assets/img/thumbnail.jpg";
import "./ViewProduct.css";

const EditProduct = () => {
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [showImage, setShowImage] = useState(defaultImage);
  const [categoryList, setCategoryList] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subCategoryList, setSubCategoryList] = useState();

  const getProduct = async () => {
    const data = {
      product_id: id,
    };

    PostService(API_URL.GET_PRODUCT_DETAILS, data).then(
      (res) => {
        setProduct(res.data.data);

        for (let i = 0; i < res.data.data.product.length; i++) {
          const temp = images;
          temp.push(ImageURL + res.data.data.product[i].image);
          setImages(temp);
        }
        if (res.data.data.product.length)
          setShowImage(ImageURL + res.data.data.product[0]?.image);

        setSelectedCat(res?.data?.data?.category_id?._id);

        setSubCategory(res?.data?.data?.sub_category_id?._id);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const getCategoryList = async () => {
    GetService(API_URL.CATEGORY_LIST_WITHOUT_PAGINATION).then(
      (res) => {
        setCategoryList(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    getProduct();
    getCategoryList();
  }, []);

  const onImageUpload = (e) => {
    setShowImage(window.URL.createObjectURL(e.target.files[0]));
    const length = e.target.files.length;
    const temp = [];
    for (let i = 0; i < length; i++) {
      temp.push(window.URL.createObjectURL(e.target.files[i]));
    }
    setImages(temp);
  };

  const removeImage = (i) => {
    setImages((images) => images.filter((im) => im !== i));
    if (showImage === i) {
      setShowImage(defaultImage);
    }
  };

  const handleMouseOver = (i) => {
    const elem = document.getElementById(i._id);
    elem.classList.add("highlight2");
  };

  const handleMouseOut = (i) => {
    const elem = document.getElementById(i._id);
    elem.classList.remove("highlight2");
  };

  const OnSelectCategory = (e) => {
    const data = {
      category_id: e,
    };

    PostService(API_URL.SUB_CATEGORY_LIST_OF_CATEGORY, data).then(
      (res) => {
        setSubCategoryList(res.data.data);
        console.log(res.data.data);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <div>
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">
              <h1 class="default_color">Edit Product</h1>
            </div>

            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <a class="breadcrumb-item">
                  <Link to="/panel/dashboard">Dashboard</Link>
                </a>
                <a class="breadcrumb-item">
                  <Link to="/panel/product">Product's List</Link>
                </a>
                <Link class="breadcrumb-item active">Edit Product</Link>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <div className="container-fluid p-2">
        <div className="card p-3">
          <div className="ng-star-inserted">
            <form className="ng-untouched ng-pristine ng-invalid">
              <div className="row">
                <div className="col-md-6">
                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfName" className="form-label">
                        Product Name
                        <sup className="error">*</sup>
                      </label>
                      <input
                        type="text"
                        id="inputfName"
                        placeholder="Product Name"
                        defaultValue={product?.name}
                        className="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="mb-3">
                      <label htmlFor="title" className="label-form">
                        Select category
                        <sup className="error">*</sup>
                      </label>
                      <select
                        value={selectedCat}
                        onClick={(e) => {
                          OnSelectCategory(e.target.value);
                        }}
                        className="form-select"
                      >
                        <option>Select</option>
                        {categoryList?.map((category) => (
                          <option value={category._id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfcategory" className="form-label">
                        Select Sub Category
                        <sup className="error">*</sup>
                      </label>
                      <select
                        value={subCategory}
                        onClick={(e) => {
                          setSubCategory(e.target.value);
                        }}
                        className="form-select"
                      >
                        {console.log(subCategory)}
                        {categoryList?.map((category) => (
                          <option value={category._id}>
                            {category.category_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfcategory" className="form-label">
                        Price
                        <sup className="error">*</sup>
                      </label>
                      <input
                        type="number"
                        defaultValue={product?.selling_price}
                        id
                        className="form-control ng-untouched ng-pristine ng-valid"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="mt-3 col-6">
                      <div className="form-group">
                        <label htmlFor="actual_price" className="form-label">
                          Shipping Charge
                          <sup className="error">*</sup>
                        </label>
                        <input
                          type="number"
                          defaultValue={product?.shiping_charge}
                          className="form-control ng-untouched ng-pristine ng-invalid"
                        />
                      </div>
                    </div>
                    <div className="mt-3 col-6">
                      <div className="form-group">
                        <label htmlFor="quantity" className="form-label">
                          Quantity
                          <sup className="error">*</sup>
                        </label>
                        <input
                          type="number"
                          defaultValue={product?.quantity}
                          className="form-control ng-untouched ng-pristine ng-valid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfName" className="form-label">
                        Description
                        <sup className="error">*</sup>
                      </label>
                      <textarea
                        name=""
                        placeholder="Product Name"
                        defaultValue={product?.description}
                        className="form-control ng-untouched ng-pristine ng-valid"
                        cols="1"
                        rows="2"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-md-6 mb-2">
                      <div className="d-flex flex-column justify-content-center">
                        <div className="mx-auto">
                          <img
                            alt="productImage"
                            className="imageBox p-2"
                            src={showImage}
                          />
                        </div>
                        <div className="d-flex flex-wrap mt-3 justify-content-center">
                          {images &&
                            images.map((i, j) => {
                              return (
                                <div className="mx-auto my-1 ng-star-inserted">
                                  <img
                                    className="imageBoxSmall highlight p-1"
                                    id={"images" + j}
                                    onMouseOut={() =>
                                      handleMouseOut("images" + j)
                                    }
                                    onMouseOver={() =>
                                      handleMouseOver("images" + j)
                                    }
                                    src={i}
                                  />
                                  <span className="removeImage">
                                    <i
                                      className="fas fa-times"
                                      onClick={() => {
                                        removeImage(i);
                                      }}
                                    ></i>
                                  </span>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                      <div className="button mt-3">
                        <div className="btn_box text-center mx-md-3">
                          <label className="form-label">Select Image</label>
                          <span className="btn btn-primary mainBtn btn-file ms-2">
                            Browse
                            <input
                              type="file"
                              accept=".jpg,.jpeg,.png"
                              multiple
                              onChange={(e) => {
                                onImageUpload(e);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-md-3 col-12 m-auto">
                  <button type="button" className="btn btn-primary w-100">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
