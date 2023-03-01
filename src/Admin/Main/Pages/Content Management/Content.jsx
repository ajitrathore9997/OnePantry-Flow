import React from 'react'
import { Link } from 'react-router-dom' 

const Content = () => {
 
    return (
        <div>
            <section className="content-header">

                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Content List</h1>
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
                                <li className="breadcrumb-item active">Content</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>


            <section className="content  d-flex justify-content-center">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card wrap cddr2">
                                <div className="card-body">
                                    <div className="row mb-3">
                                        <div className="col-md-6 offset-md-6">
                                            {/* <div className="d-flex justify-content-end">
                                                <div className="me-3">
                                                    <label >From </label>
                                                    <input type="date" className="form-control ng-untouched ng-pristine ng-valid" max="2023-02-24" />
                                                </div>
                                                <div>
                                                    <label>To </label>
                                                    <input type="date" className="form-control ng-untouched ng-pristine ng-valid" min="" max="2023-02-24" />
                                                </div>
                                            </div> */}
  
                                            
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive">

                                        <table className="table table-hover text-nowrap table-border">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">#</th>
                                                    {/* <th className="text-center">Seller</th> */}
                                                    <th className="text-center">Title</th>
                                                    <th className="text-center">Action</th>
                                                    {/* <th className="text-center">Action</th> */}
                                                </tr>
                                            </thead>
                                            <tbody>

                                                <tr>
                                                    <td className="text-center">1</td>
                                                    <td className="text-center">Terms and condition</td>
                                                    <td className="text-center">
                                                        <Link
                                                            title="View"
                                                            style={{ cursor: "pointer" }}
                                                            className="mx-2"
                                                            data-toggle="modal"
                                                            data-target="#ViewModal"
                                                            to={'view/id'}
                                                        >
                                                            <i className="text-warning fas fa-eye"></i>
                                                        </Link>

                                                        <span title="Update" className="mx-2 table-icon">
                                                            <Link
                                                                to={"/panel/content/edit/id"}
                                                                className="text-dark fas fa-pen"
                                                            ></Link>
                                                        </span>


                                                    </td>
                                                </tr>
                                            </tbody>

                                        </table>

                                        {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                                        </div> */}

                                    </div>

                                    {/* <Pagination
                                        counting={transactionLimit * currentPage}
                                        totaldata={total}
                                        pagecount={totalPages}
                                        onChangePage={handlePageClick}
                                    ></Pagination> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
 

            </section>
        </div>
    )
}

export default Content
