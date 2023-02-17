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



const Category = () => {
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
        getCategoryList();
    }, []);
    const config = {
        headers: { Authorization: token }
    };

    const getCategoryList = () => {
        axios.post('http://54.201.160.69:3282/api/v1/admin/categoriesList', {},
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
            selector: (row) => row.category_name,
            sortable: true
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
        //     name: "Role",
        //     selector: (row) =>
        //         row.role.name === 'user' ?
        //             <Button variant="secondary" size="sm">User</Button>
        //             :
        //             <Button variant="secondary" size="sm">Admin</Button>
        //     ,
        //     sortable: true
        // },
        // {
        //     name: "View Product",
        //     cell: (row) =>
        //         <>
        //             <span class="text-warning fas fa-eye" onClick={handleViewProdut} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>
        //         </>
        // },
        // {
        //     name: "View Order",
        //     cell: (row) =>
        //         <>
        //             <span class="text-warning fas fa-eye" onClick={handleViewOrder} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>
        //         </>
        // },
        {
            name: "Action",
            cell: (row) =>
                <>
                    {/* <Form.Check type="switch" id="custom-switch" checked={row.isActive} onClick={handleUserStatusChange} value={JSON.stringify(row)} />&nbsp; */}
                    <span class="text-warning fas fa-eye" onClick={handleRowClicked} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>&nbsp;&nbsp;
                    {/* <span class="text-dark fas fa-pencil-alt" onClick={handleUserEdit} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span>&nbsp;&nbsp;
                    <span class="text-danger fas fa-trash-alt" onClick={handleUserDelete} id={JSON.stringify(row)} style={{ 'cursor': 'pointer' }}></span> */}
                </>
        }
    ];
    const handleViewProdut = (row) => {
        // navigate("/view_products");

        const data = JSON.parse(row.target.id);
        navigate("/view_products/" + data._id);
    }
    const handleViewOrder = () => {
        // navigate("/view_orders");
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
                    getCategoryList();
                    setToastBgColor('success');
                    setToastMsg(response.data.message);
                    toggleShowA();
                    getCategoryList();
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
        console.log(data);
        const name = data.category_name;
        setUsername(name);
        const email = data.createdAt;
        setUserEmail(email);
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
                    getCategoryList();
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
        axios.post('http://54.201.160.69:3282/api/v1/admin/categoriesList', {
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
                        <Modal.Title><b>Category Details</b></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mb-2">
                            <div className="col-sm-4">
                                <li className="breadcrumb-item active"><b>Category Name</b></li>
                            </div>
                            <div className="col-sm-8">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">{userName}</li>
                                </ol>
                            </div>
                            <div className="col-sm-4">
                                <li className="breadcrumb-item active"><b>Created on</b></li>
                            </div>
                            <div className="col-sm-8">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">{userEmail}</li>
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
                                <h1 className="m-0 text-dark">Category</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item active"><a>Home</a></li>
                                    <li className="breadcrumb-item ">Category</li>
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

export default Category