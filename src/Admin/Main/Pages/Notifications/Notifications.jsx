/* eslint-disable no-unused-vars */
import React, { useState } from 'react' 
import { Link } from 'react-router-dom'
import FadeLoader from "react-spinners/FadeLoader";


const Notifications = () => {

    const [loading, setLoading] = useState(false) 

    // Pagination States
    //   const [currentPage, setCurrentPage] = useState(0)
    //   const [transactionLimit, setTransactionLimit] = useState(10)
    //   const [total, setTotal] = useState()
    //   const [totalPages, setTotalPages] = useState()

    //   useEffect(() => {
    //     get_RefundList()
    // },[currentPage])

    // const get_RefundList = () =>{
    //     setLoading(true)

    //     const data = {
    //         limit: transactionLimit,
    //         page: currentPage,
    //         sorting: "sortingKey|desc",
    //     }

    //     PostService(API_URL.GET_REFUND_LIST,data).then((res) => {
    //         console.log(res)
    //         set_refund_List(res.data?.data?.search_data)
    //         setTotal(res.data?.data?.total)
    //         setTotalPages(res.data?.data?.total_pages) 
    //         setLoading(false)
    //     },
    //     (err) => {
    //         console.log(err)
    //         setLoading(false)
    //     })
    // }

    // const handlePageClick = (e) => {
    //     setCurrentPage(e.selected)
    // }



    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">Notifications</h1>
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
                                <li className="breadcrumb-item active">Notifications</li>
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
                                    <div className="row mb-4 mt-1 ">
                                        <div className='col-md-6'></div>

                                        <div className="col-md-6 ">
                                            <nav className="navbar">
                                                <input
                                                    type="text"
                                                    name="firstnamesearch"
                                                    placeholder="search by keyword"
                                                    className="form-control ng-pristine ng-valid ng-touched"
                                                    onChange={(e) => {
                                                    }}
                                                />
                                            </nav>
                                        </div>
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6 offset-md-6">
                                            
                                        </div>
                                    </div>

                                    <div className="card-body table-responsive">

                                        {!loading && <table className="table table-hover text-nowrap table-border">
                                            <thead>
                                                <tr>
                                                    <th className="text-center">S.No.</th>
                                                    <th className="text-center">Sender</th>
                                                    <th className="text-center">Receiver</th>
                                                    <th className="text-center">Type</th>
                                                    <th className="text-center">Created At</th>
                                                    <th className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>




                                                <h6> No Data Found </h6>


                                            </tbody>

                                        </table>}

                                        {loading && <div style={{ display: 'flex', justifyContent: 'center' }}>
                                            <FadeLoader speedMultiplier={0.5} loading={loading} />
                                        </div>}

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}

export default Notifications