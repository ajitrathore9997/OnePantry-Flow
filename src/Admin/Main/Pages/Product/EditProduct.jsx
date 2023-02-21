/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImageURL } from "../../../../Environment/Environment";
import { API_URL } from "../../../../Services/APIservice";
import { GetService, PostService } from "../../../../Services/ConstantService";
import defaultImage from "../../../../assets/img/thumbnail.jpg";
import "./ViewProduct.css";
import { toastEmmit } from "../../../../Helper/Toastr";

const EditProduct = () => {

  const navigate = useNavigate()
  const [savedImages,setSavedImages] = useState([])
  const [product, setProduct] = useState();
  const { id } = useParams();
  const [miniImages, setMiniImages] = useState([]);
  const [showImage, setShowImage] = useState(defaultImage);
  const [categoryList, setCategoryList] = useState([]);
  const [category, setCategory] = useState();
  const [subCategory, setSubCategory] = useState();
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [data, setData] = useState({})

  const getProduct = async () => {
    const data = {
      product_id: id,
    };

    PostService(API_URL.GET_PRODUCT_DETAILS, data).then(
      (res) => {
        setProduct(res.data.data);
        var temp = [];
        for (let i = 0; i < res.data.data.product.length; i++) {

          temp.push(ImageURL + res.data.data.product[i].image);

        }
        setMiniImages(temp);
        temp = [];
        for (let i = 0; i < res.data.data.product.length; i++) {

          temp.push(  res.data.data.product[i].image);

        }

        setSavedImages(temp)
        setData({
          product_id: res?.data?.data?._id,
          name: res?.data?.data?.name,
          selling_price: res?.data?.data?.selling_price,
          shiping_charge: res?.data?.data?.shiping_charge,
          quantity: res?.data?.data?.quantity,
          description: res?.data?.data?.description
        })

        if (res.data.data.product.length)
          setShowImage(ImageURL + res.data.data.product[0]?.image);

        setCategory(res?.data?.data?.category_id?._id);

        getSubCategoryList(res?.data?.data?.category_id?._id)
        setSubCategory(res?.data?.data?.sub_category_id?._id);
      },
      (err) => {
        toastEmmit(err.message, 'error')
      }
    );
  };


  const getCategoryList = async () => {
    GetService(API_URL.CATEGORY_LIST_WITHOUT_PAGINATION).then(
      (res) => {
        setCategoryList(res.data.data);
      },
      (err) => {
        toastEmmit(err.message, 'error')
      }
    );
  };

  useEffect(() => {
    getProduct();
    getCategoryList();
  }, []);

  const getSubCategoryList = async (e) => {
    const x = {
      category_id: e,
    };

    PostService(API_URL.SUB_CATEGORY_LIST_OF_CATEGORY, x).then(
      (res) => {
        setSubCategoryList(res?.data?.data);
  
      },
      (err) => {
        toastEmmit(err.message, 'error')
      }
    );
  }


  const onImageUpload = (e) => {
    setShowImage(window.URL.createObjectURL(e.target.files[0]));
    const length = e.target.files.length;
    const temp = [];
    for (let i = 0; i < length; i++) {
      temp.push(window.URL.createObjectURL(e.target.files[i]));
    }
    setSavedImages(e.target.files)


    setMiniImages(temp);
  };

  const removeImage = (i) => {
    setMiniImages((miniImages) => miniImages.filter((im) => im !== i));
    if (showImage === i) {
      setShowImage(defaultImage);
    }
  };


  const handleMouseOver = (i, j) => {

    setShowImage(i)
    const elem = document.getElementById(j);
    elem.classList.add("highlight2");

  };

  const handleMouseOut = (i) => {
    const elem = document.getElementById(i);
    elem.classList.remove("highlight2");
  };

  const OnSelectCategory = (e) => {
    console.log(e)
    setCategory(e)
    getSubCategoryList(e)
  };

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formdata = new FormData()

    formdata.append("name", data.name)
    formdata.append("selling_price", data.selling_price)
    formdata.append("shiping_charge", data.shiping_charge)
    formdata.append("quantity", data.quantity)
    formdata.append("description", data.description)
    formdata.append("product_id",data.product_id)
    formdata.append("category_id",category)
    formdata.append("sub_category_id",subCategory)
 
    for(let i=0;i<savedImages.length;i++){
      formdata.append("image",savedImages[i])
    }
    
    PostService(API_URL.UPDATE_PRODUCT,formdata).then((res) => {

      console.log(res.data)
      if(res.data.status === true){
        toastEmmit("Product Updated","success")
        navigate('/panel/product')
      }
    },
    (err) => { 
      toastEmmit(err.response.data?.message,"error")  
    })


  }

  const changeData = (value, key) => {
    const temp = data
    temp[key] = value
    setData(temp)
  }

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Edit Product</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <span className="breadcrumb-item">
                  <Link to="/panel/dashboard" >Dashboard</Link>
                </span>
                <span className="breadcrumb-item">
                  <Link to="/panel/product" >Product's List</Link>
                </span>
                <span className="breadcrumb-item active" />Edit Product
              </ol>
            </div>
          </div>
        </div>
      </section>


      <div className="container-fluid p-2">
        <div className="card p-3">
          <div className="ng-star-inserted">
            <form className="ng-untouched ng-pristine ng-invalid"  >
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
                        placeholder="Product Name"
                        defaultValue={product?.name}
                        className="form-control ng-untouched ng-pristine ng-valid"
                        onChange={(e) => { changeData(e.target.value, 'name') }}

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
                        value={category}
                        onChange={(e) => {
                          OnSelectCategory(e.target.value);
                        }}
                        className="form-select"
                      >
                        <option>Select</option>
                        {categoryList.map((category, key) => (
                          <option key={key} value={category?._id}>
                            {category?.category_name}
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
                        onChange={(e) => {
                          setSubCategory(e.target.value);
                        }}
                        className="form-select"
                      >
                        <option>Select</option>
                        {subCategoryList.map((subCategory, key) => (
                          <option key={key} value={subCategory._id}>
                            {subCategory.sub_category_name}
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
                        onChange={(e) => { changeData(e.target.value, 'selling_price') }}
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
                          onChange={(e) => { changeData(e.target.value, 'shiping_charge') }}
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
                          onChange={(e) => { changeData(e.target.value, 'quantity') }}
                          className="form-control ng-untouched ng-pristine ng-valid"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="form-group">
                      <label htmlFor="inputfName" className="form-label">
                        Description 
                      </label>
                      <textarea
                        name=""
                        placeholder="Product Name"
                        defaultValue={product?.description}
                        onChange={(e) => { changeData(e.target.value, 'description') }}
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
                          {miniImages &&
                            miniImages.map((i, j) => {
                              return (
                                <div key={j} className="mx-auto my-1 ng-star-inserted">
                                  <img
                                    className="imageBoxSmall highlight p-1"
                                    id={"images" + j}
                                    onMouseOut={() =>
                                      handleMouseOut("images" + j)
                                    }
                                    onMouseOver={() =>
                                      handleMouseOver(i, "images" + j)
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
                  <button type="button" className="btn btn-primary w-100" onClick={(e) => {
                    console.log('onsubmit')
                    handleSubmit(e)
                  }}>
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
