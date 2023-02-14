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



const Dashboard = () => {

  useEffect(() => {
    $('#example').DataTable();
  }, []);

  const [allUsers, setAllUsers] = useState("");
  const [allActiveUsers, setActiveUsers] = useState("");
  const [sellers, setSellers] = useState("");
  const [user, setUser] = useState("");
  const [allUsersDetails, setAllUsersDetails] = useState([]);


  const token = localStorage.getItem('userToken');
  useEffect(() => {
    getDashboardData();
    getUsersData();
  }, []);

  const getDashboardData = () => {
    axios.get('http://54.201.160.69:3282/api/v1/admin/dashboardcount', {
      headers: {
        Authorization: token
      },
    })
      .then(function (response) {
        setAllUsers(response.data.data.alluser);
        setActiveUsers(response.data.data.all_active);
        setSellers(response.data.data.seller);
        setUser(response.data.data.user);
      })
      .catch(function (error) {

      });
  }
  const config = {
    headers: { Authorization: token }
  };

  const getUsersData = () => {
    axios.post('http://54.201.160.69:3282/api/v1/admin/listOfusers', {},
      config)
      .then(function (response) {
        setAllUsersDetails(response.data.data.search_data);
      })
      .catch(function (error) {

      });
  }


  return (
    <div>
      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">Dashboard</h1>
              </div>{/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  {/* <li className="breadcrumb-item"><a href="#">Home</a></li> */}
                  <li className="breadcrumb-item active">Dashboard</li>
                </ol>
              </div>{/* /.col */}
            </div>{/* /.row */}
          </div>{/* /.container-fluid */}
        </div>
        {/* /.content-header */}
        {/* Main content */}
        <section className="content">
          <div className="container-fluid">
            {/* Small boxes (Stat box) */}
            <div className="row">
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-info">
                  <div className="inner">
                    <h3>{allUsers}</h3>
                    <p>All Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-success">
                  <div className="inner">
                    <h3>{allActiveUsers}</h3>
                    <p>Active Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-stats-bars" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                {/* small box */}
                <div className="small-box bg-warning">
                  <div className="inner">
                    <h3>{sellers}</h3>
                    <p>Seller</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-person-add" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
              {/* ./col */}
              <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                  <div className="inner">
                    <h3>{user}</h3>
                    <p>Users</p>
                  </div>
                  <div className="icon">
                    <i className="ion ion-pie-graph" />
                  </div>
                  <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                </div>
              </div>
            </div>
            {/* Dashboard Start */}
            <table id="example" class="display">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsersDetails.map((user, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{user.first_name}</td>
                    <td>{user.email}</td>
                    <td>Status</td>
                    <td>Role</td>
                    <td>Action</td>
                  </tr>
                ))}
                {/* <tr>
                  <td>Tiger Nixon</td>
                  <td>System Architect</td>
                  <td>Edinburgh</td>
                  <td>61</td>
                  <td>2011/04/25</td>
                  <td>$320,800</td>
                </tr>
                <tr>
                  <td>Garrett Winters</td>
                  <td>Accountant</td>
                  <td>Tokyo</td>
                  <td>63</td>
                  <td>2011/07/25</td>
                  <td>$170,750</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>

  )

}

export default Dashboard