import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import DataTable, { createTheme } from "react-data-table-component";
import MiniChart from "react-mini-chart";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Toast from 'react-bootstrap/Toast';
import { ToastContainer } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';



const ViewProducts = () => {
  const [deleteUserId, setUserIdDelete] = useState('');
  const [showDeleteModal, setConfirmDelete] = useState(false);
  const handleConfirmDeleteClose = () => setConfirmDelete(false);
  const handleConfirmDeleteOpen = () => setConfirmDelete(true);


  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState();
  const [bgColor, setToastBgColor] = useState('');
  const [toastMsg, setToastMsg] = useState('');
  const [showA, setShowA] = useState(false);
  const toggleShowA = () => setShowA(!showA);
  const navigate = useNavigate();

  createTheme("solarized", {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
      // fontSize: '30px',
      // fontWeight: 'bold'
    },
    background: {
      default: "#002b36"
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF"
    },
    divider: {
      default: "#073642"
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)"
    }
  });

  const [allUsers, setAllUsers] = useState("");
  const [allActiveUsers, setActiveUsers] = useState("");
  const [sellers, setSellers] = useState("");
  const [user, setUser] = useState("");
  const [searchedKeyword, setSearchKeyword] = useState("");

  const [userDetails, setUsersDetails] = useState([]);


  const token = localStorage.getItem('userToken');
  useEffect(() => {
    getProductList();
  }, []);
  const config = {
    headers: { Authorization: token }
  };

  const getProductList = () => {
    var segment_str = window.location.pathname;
    var segment_array = segment_str.split('/');
    var user_id = segment_array.pop();
    axios.post('http://54.201.160.69:3282/api/v1/admin/prodList', {
      user_id: user_id
    },
      config)
      .then(function (response) {
        setUsersDetails(response.data.data.search_data)

      })
      .catch(function (error) {

      });
  }

  const columns = [
    {
      name: 'S.No.',
      cell: (row, index) => index + 1,
    },
    {
      name: "Product",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Category",
      selector: (row) => row.category_id.category_name,

    },
    {
      name: "Price $",
      selector: (row) => row.selling_price,

    },
    {
      name: "Status",
      selector: (row) =>
        row.isActive === true ?
          <Button variant="success" size="sm">Active</Button>
          :
          <Button variant="danger" size="sm">Inactive</Button>
      ,
    },
    // {
    //   name: "Action",
    //   cell: (row) =>
    //     <>
    //       <Form.Check type="switch" id="custom-switch" checked={row.isActive} onClick={handleUserStatusChange} value={JSON.stringify(row)} />&nbsp;
    //       <span class="text-warning fas fa-eye" onClick={handleRowClicked} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>&nbsp;&nbsp;
    //       <span class="text-dark fas fa-pencil-alt" onClick={handleUserEdit} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>&nbsp;&nbsp;
    //       <span class="text-danger fas fa-trash-alt" onClick={handleUserDelete} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>
    //     </>
    // }
  ];
  const handleViewProdut = () => {
    navigate("/view_products");
  }
  const handleViewOrder = () => {
    navigate("/view_order");
  }

  const handleUserStatusChange = (row) => {
    const data = JSON.parse(row.target.value);
    handleUserStatus(data);
  }

  const handleUserDelete = (row) => {
    const data = JSON.parse(row.target.id);
    const user_id = data._id;
    setUserIdDelete(user_id);
    handleConfirmDeleteOpen();
  }

  const handleDelete = () => {
    const user_id = deleteUserId;
    axios.post('http://54.201.160.69:3282/api/v1/admin/deleteofuser', {
      user_id: user_id,
    }, config)
      .then(function (response) {
        console.log(response);
        const response_status = response.data.status;
        if (response_status == true) {
          getProductList();
          setToastBgColor('success');
          setToastMsg(response.data.message);
          toggleShowA();
          getProductList();
        }
        else {

        }
      })
      .catch(function (error) {
      });
    // alert(user_id);
    //handleShow();
  }

  const handleRowClicked = (row) => {

    const data = JSON.parse(row.target.id);
    const name = data.first_name + " " + data.last_name;
    setUsername(name);
    const email = data.email;
    setUserEmail(email);
    const role = data.role.name;
    setUserRole(role);
    var status = data.isActive;
    if (status == true)
      status = "Active";
    else
      status = "Inactive";
    setUserStatus(status);
    handleShow();
  };
  const handleUserStatus = (data) => {
    console.log(data);
    const userId = data._id;
    axios.post('http://54.201.160.69:3282/api/v1/admin/statusofuser', {
      user_id: userId,
    }, config)
      .then(function (response) {
        console.log(response);
        const response_status = response.data.status;
        if (response_status == true) {
          getProductList();
          setToastBgColor('success');
          setToastMsg(response.data.message);
          toggleShowA();

        }
        else {

        }
      })
      .catch(function (error) {
      });
  }

  const handleUserEdit = (row) => {
    const data = JSON.parse(row.target.id);

    navigate("/user_edit/" + data._id);
  }

  const handleSearch = (e, sort = '') => {
    var keyword = e.target.value;
    setSearchKeyword(keyword);

    axios.post('http://54.201.160.69:3282/api/v1/admin/prodList', {
      limit: '',
      sorting: '',
      page: '',
      search_key: keyword,
      type: ''
    }, config)
      .then(function (response) {
        console.log(response);
        const response_status = response.data.status;
        setUsersDetails(response.data.data.search_data)
      })
      .catch(function (error) {
      });
  }

  const handleSort = (row) => {

    axios.post('http://54.201.160.69:3282/api/v1/admin/listOfusers', {
      limit: '',
      sorting: row.target.value,
      page: '',
      search_key: searchedKeyword,
      type: ''
    }, config)
      .then(function (response) {
        setUsersDetails(response.data.data.search_data)
      })
      .catch(function (error) {
      });

  }
  return (
    <div>


      <div className="modal show" style={{ display: 'block', position: 'initial' }} >
        <Modal show={showDeleteModal} onHide={handleConfirmDeleteClose}>
          <Modal.Header closeButton>
            <Modal.Title><b>Delete User</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-2">
              <div className="col-sm-12">
                <li className="breadcrumb-item active"><b>Are you sure you want to delete this User ?</b></li>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="modal show" style={{ display: 'block', position: 'initial' }} >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title><b>User Details</b></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row mb-2">
              <div className="col-sm-4">
                <li className="breadcrumb-item active"><b>Username</b></li>
              </div>
              <div className="col-sm-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">{userName}</li>
                </ol>
              </div>
              <div className="col-sm-4">
                <li className="breadcrumb-item active"><b>Email</b></li>
              </div>
              <div className="col-sm-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">{userEmail}</li>
                </ol>
              </div>
              <div className="col-sm-4">
                <li className="breadcrumb-item active"><b>Role</b></li>
              </div>
              <div className="col-sm-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">{userRole}</li>
                </ol>
              </div>
              <div className="col-sm-4">
                <li className="breadcrumb-item active"><b>Status</b></li>
              </div>
              <div className="col-sm-8">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active">{userStatus}</li>
                </ol>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </div>

      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <ToastContainer position="top-end" className="p-3" delay={3000} autohide>
              <Toast show={showA} onClose={toggleShowA} bg={bgColor} delay={2000} autohide>
                <Toast.Header>
                  <strong className="me-auto">Success</strong>
                </Toast.Header>
                <Toast.Body>{toastMsg}</Toast.Body>
              </Toast>
            </ToastContainer>
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">View Product</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a>Home</a></li>
                  <li className="breadcrumb-item ">View Product</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <Card>
            <Card.Body>
              <div className="row">
                <div className="col-sm-3">
                  {/* <Form.Select aria-label="Default select example" onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="sortingKey|asc">Ascending</option>
                    <option value="sortingKey|desc">Descending</option>
                  </Form.Select> */}
                </div>
                <div className="col-sm-5">

                </div>
                <div className="col-sm-4">
                  <div className="form-group m-0" style={{ 'textAlign': 'right' }}>
                    <input
                      style={{ 'textAlign': 'left' }}
                      type="text"
                      name="keyword"
                      id="keyword"
                      className="form-control"
                      placeholder='Enter keyword to search'
                      onChange={(e) => handleSearch(e)}
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
          {/* Dashboard Start Updated */}
          <DataTable
            sortServer={false}
            sortIcon
            defaultSortAsc={true}
            noTableHead={false}
            striped={true}
            highlightOnHover={true}
            columns={columns}
            data={userDetails}
            defaultSortFieldId
            pagination={5}
            onRowClicked={handleRowClicked}
            fixedHeaderScrollHeight="300px" />
          {/* <MiniChart dataSet={[0, -20, 343, 49.3, -100, 200, 78]} /> */}
          {/* Dashboard End Updated */}
        </section>
      </div >
    </div >

  )

}

export default ViewProducts