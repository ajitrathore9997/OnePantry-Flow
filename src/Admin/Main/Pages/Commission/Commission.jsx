/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { API_URL } from '../../../../Services/APIservice';
import { PostService } from '../../../../Services/ConstantService'; 
import Pagination from "../../../../Helper/Pagination";
import { toastEmmit } from '../../../../Helper/Toastr';
import FadeLoader from "react-spinners/FadeLoader";

const Commission = () => {

  const [search, setSearch] = useState("")
  const [commissionList, setCommissionList] = useState()
  const [edit, setEdit] = useState('')
  const [commissionValue, setCommissionValue] = useState()
  const [loading, setLoading] = useState(true)

  //pagination states 
  const [commissionLimit,setCommissionLimit] = useState(10)
  const [currentPage,setCurrentPage] = useState(0)
  const [total,setTotal] = useState()
  const [totalPages,setTotalPages] = useState()


  const getCommissionList = async () => {
    setLoading(true)
    const data = {
      search_key: search,
    }
    PostService(API_URL.GET_COMMISSION_LIST, data).then((res) => {
      console.log(res.data)
      if (res.data?.status === true) {
        setCommissionList(res.data?.data?.search_data)
        setTotal(res.data?.data?.total)
        setTotalPages(res.data?.data?.total_pages)

      }
      setLoading(false)
    }, (err) => {
      console.log(err)
      toastEmmit(err.data?.message,'error')
      setLoading(false)
    })

  }

  const handleSubmit = async (commissionId) => {

    console.log(commissionValue)
      const data = {
        id: commissionId,
        commission: commissionValue
      }

      PostService(API_URL.EDIT_COMMISSION_LIST,data).then((res) => {
        
        if(res.data?.status === true){
          getCommissionList()
          toastEmmit(res.data?.message,'success')
        }

      },
      (err) => {
        console.log(err)
        toastEmmit(err.data?.message,'error')
      })

  }
  useEffect(() => {
    getCommissionList()
  }, [search,currentPage])

  const handlePageClick = (e) => {
    setCurrentPage(e.selected)
    // getCommissionList()
  }

  return (
    <div>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">Commission List</h1>
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

                <li className="breadcrumb-item active">Commission List</li>
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
                  <div
                    className="row mb-4 mt-1"
                    style={{ justifyContent: "right" }}
                  >
                    <div className="col-md-6">
                      <nav className="navbar">
                        <input
                          type="text"
                          name="firstnamesearch"
                          placeholder="search by keyword"
                          className="form-control ng-pristine ng-valid ng-touched"
                          onChange={(e) => {
                            setSearch(e.target.value);
                          }}
                        />
                      </nav>
                    </div>
                  </div>

                  <div className="card-body table-responsive">
                    {!loading && <table className="table table-hover text-nowrap table-border ">
                      <thead>
                        <tr>
                          <th className="text-center">S.No</th>
                          <th className="text-center">Category</th>
                          <th className="text-center">Commission <span className='text-danger'>%</span></th>
                          <th className="text-center">Action</th> 

                        </tr>
                      </thead>
                      <tbody>
                        {commissionList?.map((commission, i) => {
                          return <tr key={i}>
                            <td className="text-center">{i + 1}</td>
                            <td className="text-center">{commission.category_name}</td>
                            {commission._id !== edit && <td className="text-center">{commission.commission ? commission.commission : 0}</td>}
                            {commission._id === edit && <td className='text-center'><input onChange={(e) => {
                              setCommissionValue(e.target.value)
                            }} className='text-center' type='number' defaultValue={commission.commission}></input></td>}

                            <td className="text-center"><a title="Update" className="mx-2 table-icon">
                              {commission._id !== edit && <span
                                className="text-dark fas fa-pen cursor"
                                onClick={() => { setEdit(commission._id) }}
                              ></span>}
                              {commission._id === edit && <button className='btn btn-success btn-sm '
                                onClick={() => {
                                  setEdit("")
                                  handleSubmit(commission._id)
                                }
                                }>
                                save</button>}

                            </a></td> 

                          </tr>
                        })}
                        {commissionList?.length === 0 && (
                          <tr>
                            <h6> No Data Found </h6>
                          </tr>
                        )}
                      </tbody>
                    </table>}

                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <FadeLoader speedMultiplier={2} loading={loading} />
                    </div>
                  </div>

                  <Pagination
                    counting={commissionLimit * currentPage}
                    totaldata={total}
                    pagecount={totalPages}
                    onChangePage={handlePageClick}
                  ></Pagination>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Commission