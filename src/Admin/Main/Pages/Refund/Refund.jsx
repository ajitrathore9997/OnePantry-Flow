import React  from 'react'
import { Link } from 'react-router-dom'
// import { FadeLoader } from 'react-spinners'
// import Pagination from '../../../../Helper/Pagination'
// import { API_URL } from '../../../../Services/APIservice'
// import { PostService } from '../../../../Services/ConstantService'
// import { format, parseISO } from "date-fns";

const Refund = () => {

    // const [loading, setLoading] = useState(true)
    // const [refund_List, set_refund_List] = useState()

  //Pagination States
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
                            <h1 className="default_color">Refunds</h1>
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
                                <li className="breadcrumb-item active">Refunds</li>
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
                                                        <th className="text-center">User</th>
                                                        <th className="text-center">Amount</th>
                                                        <th className="text-center">Status</th> 
                                                        <th className="text-center">Created At</th>
                                                        {/* <th className="text-center">Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                     
                                                     
                                                   
                                                    
                                                            <h6> No Data Found </h6>
                                                         
                                                    
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

export default Refund
