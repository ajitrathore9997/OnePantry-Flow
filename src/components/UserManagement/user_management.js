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




const UserManagement = () => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [userName, setUsername] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userRole, setUserRole] = useState();
  const [userStatus, setUserStatus] = useState();


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
  // Testing End
  // useEffect(() => {
  //   $('#example').DataTable();
  // }, []);

  const [allUsers, setAllUsers] = useState("");
  const [allActiveUsers, setActiveUsers] = useState("");
  const [sellers, setSellers] = useState("");
  const [user, setUser] = useState("");

  const [userDetails, setUsersDetails] = useState([]);


  const token = localStorage.getItem('userToken');
  useEffect(() => {
    getUsersData();
  }, []);
  const config = {
    headers: { Authorization: token }
  };

  const getUsersData = () => {
    axios.post('http://54.201.160.69:3282/api/v1/admin/listOfusers', {},
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
      name: "Name",
      selector: (row) => row.first_name + " " + row.last_name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,

    },
    {
      name: "Status",
      // selector: (row) => row.isActive === true ? <b>Active</b> : <b>Inactive</b>,
      selector: (row) =>
        row.isActive === true ?
          <Button variant="success" size="sm">Active</Button>
          :
          <Button variant="danger" size="sm">Inactive</Button>
      ,
    },
    {
      name: "Role",
      // selector: (row) => row.role.name === 'user' ? <b>User</b> : <b>Admin</b>,
      selector: (row) =>
        row.role.name === 'user' ?
          <Button variant="secondary" size="sm">User</Button>
          :
          <Button variant="secondary" size="sm">Admin</Button>
      ,
      sortable: true
    },
    {
      name: "Action",
      // cell: (row) => <button onClick={handleRowClicked} id={row.first_name} value={JSON.stringify(row)}>View</button>
      cell: (row) =>
        <span class="text-warning fas fa-eye" onClick={handleRowClicked} id={JSON.stringify(row)}></span>

    }
    //   name: "Action",
    //   selector: (row) => row.isActive,
    //   sortable: true
    // },
  ];

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
  return (
    <div>



      <div
        className="modal show"
        style={{ display: 'block', position: 'initial' }}
      >
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
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">User Management</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item active"><a>Home</a></li>
                  <li className="breadcrumb-item ">User Management</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">


          {/* Dashboard Start Updated */}
          <DataTable columns={columns} data={userDetails} defaultSortFieldId pagination={5} onRowClicked={handleRowClicked} highlightOnHover fixedHeaderScrollHeight="300px" />
          {/* <MiniChart dataSet={[0, -20, 343, 49.3, -100, 200, 78]} /> */}
          {/* Dashboard End Updated */}
        </section>
      </div >
    </div >

  )

}

export default UserManagement