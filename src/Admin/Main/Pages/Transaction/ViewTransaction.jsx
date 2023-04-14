import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { API_URL } from '../../../../Services/APIservice'
import { PostService } from '../../../../Services/ConstantService'
import { FadeLoader } from 'react-spinners'
import { format, parseISO } from "date-fns";

const ViewTransaction = () => {

    const [transaction, setTransaction] = useState()
    const [loading, setLoading] = useState(true)
    const { id } = useParams()

    const getTransactionDetails = async () => {

        const data = {
            transaction_id: id
        }

        PostService(API_URL.GET_TRANSACTION_DETAIL, data).then((res) => {
            console.log(res)
            setTransaction(res.data?.data)
            setLoading(false)
        }, (err) => {
            console.log(err)
        })

    }

    useEffect(() => {
        getTransactionDetails()
    }, [])

    return (
        <div>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1 className="default_color">View Transaction</h1>
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
                                <Link
                                    to="/panel/transactions"
                                    className="breadcrumb-item"
                                    style={{ textDecoration: "none" }}
                                >
                                    Transactions
                                </Link>
                                <li className="breadcrumb-item active">View</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>


            <div className="card m-2">
                {!loading &&
                    <>
                        <div className="card-header p-4">
                            <div className="float-left col-5">
                                <h4>
                                    <strong> {transaction?.type === "sale"?'Seller':'Buyer'}</strong> Detail
                                </h4>
                                <div  >
                                    <strong> Name: </strong> {transaction?.type === "sale" ?transaction?.Main_order_detail?.sub_order_detail[0]?.seller_detail?.userName : transaction?.buyer_detail?.userName}
                                </div>
                                <div>
                                    <strong> Email:</strong> {transaction?.type === "sale" ?transaction?.Main_order_detail?.sub_order_detail[0]?.seller_detail?.email : transaction?.buyer_detail?.email}
                                </div>
                                {/* <div>
                            <strong>
                                Address:</strong> Address</div> */}
                            </div>
                            <div className="float-right col-5 offset-2">
                                <div className="float-left">
                                    <h4>
                                        <strong>Payment</strong> Detail
                                    </h4>
                                    <div>
                                        <strong>Date: </strong>{format(
                                            parseISO(transaction.createdAt),
                                            "dd/MM/yyyy"
                                        )}
                                    </div>
                                    <div>
                                        <strong>Payment Amount: </strong > $ {transaction?.total_amount}
                                    </div>
                                    <div>
                                        <strong> Payment Mode:</strong> {transaction?.payment_mode}
                                    </div>
                                    <div>
                                        <strong>Transaction Id: </strong> {transaction?.transactionId}
                                    </div>
                                    <div>
                                        <strong>Transaction Type: </strong> {transaction?.type}
                                    </div>
                                    <div>
                                        <strong>Transaction Status: </strong> {transaction?.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">

                            <div className="table-responsive-sm">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th className="text-center">S.No.</th>
                                            <th className='text-center'>Product Name</th>
                                            {/* <th className='text-center'>Seller Name</th> */}
                                            <th className="text-center">Quantity</th>
                                            <th className="text-center">Price $</th>
                                            <th className="text-center">Total $</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transaction?.Main_order_detail
                                            ?.sub_order_detail?.map((product, i) => <tr key={i}>
                                                <td className="text-center">{i + 1}</td>
                                                <td className="text-center strong">{product?.product_detail?.name}</td>
                                                {/* <td className="text-center strong">{product?.seller_detail?.userName}</td> */}
                                                <td className="text-center">{product?.quantity}</td>
                                                <td className="text-center">{product?.price}</td>
                                                <td className="text-center">{product?.quantity * product?.price}</td>
                                            </tr>)}
                                    </tbody>
                                </table>

                            </div>
                            <div className="row mb-5">
                                {/* <div className=" col-5 ">
                                    <div className="float-left">
                                        <h4>
                                            <strong>Payment</strong> Detail
                                        </h4>
                                        <div>
                                            <strong>Date:</strong>{format(
                                                parseISO(transaction.createdAt),
                                                "dd/MM/yyyy"
                                            )}
                                        </div>
                                        <div>
                                            <strong>Payment Amount: </strong > $ {transaction?.total_amount}
                                        </div>
                                        <div>
                                            <strong> Payment Mode:</strong> {transaction?.payment_mode}
                                        </div>
                                        <div>
                                            <strong>Transaction Id: </strong> {transaction?.transactionId}
                                        </div>
                                        <div>
                                            <strong>Transaction Type: </strong> {transaction?.type}
                                        </div>
                                        <div>
                                            <strong>Transaction Status: </strong> {transaction?.status}
                                        </div>
                                    </div>
                                </div> */}
                                <div className="col-lg-4 col-sm-5 ml-auto">
                                    <table className="table table-clear">
                                        <tbody>
                                            <tr>
                                                <td className="left">
                                                    <strong className="text-dark">Payment Amount :</strong>
                                                </td>
                                                <td className="center">
                                                    <strong className="text-dark">${transaction?.total_amount}</strong>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>



                        </div>
                    </>
                }

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <FadeLoader speedMultiplier={2} loading={loading} />
                </div>

            </div>


        </div>
    )
}

export default ViewTransaction