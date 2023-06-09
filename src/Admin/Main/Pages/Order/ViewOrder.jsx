/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { API_URL } from "../../../../Services/APIservice";
import { PostService } from "../../../../Services/ConstantService";
import { toastEmmit } from "../../../../Helper/Toastr";
import { FadeLoader } from "react-spinners";
import { format, parseISO } from "date-fns";

function ViewOrder() {
  useEffect(() => {
    getOrder();
  }, []);

  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [order, setOrder] = useState();

  const getOrder = async () => {
    setLoading(true);
    const data = {
      order_id: id,
    };

    PostService(API_URL.GET_ORDER_DETAILS, data).then(
      (res) => {
        console.log(res.data.data);
        setOrder(res?.data?.data);
        setLoading(false);
      },
      (err) => {
        toastEmmit(err.message, "error");
        setLoading(false);
      }
    );
  };

  function print() {
    window.print();
  }

  return (
    <>
      <section className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="default_color">View Order</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <span className="breadcrumb-item">
                  <Link to="/panel/dashboard">Dashboard </Link>
                </span>
                <span className="breadcrumb-item">
                  <Link to="/panel/order">Order's List</Link>
                </span>
                <span className="breadcrumb-item active">View Order</span>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <section className="content d-flex justify-content-center">
        <div className="container-fluid">
          <div className="row">
            {!loading && (
              <div className="col-12">
                <div className="card">
                  <div id="PrintInvoice">
                    <div className="card-header p-4">
                      <div className="float-left col-6">
                        <h4>
                          <strong>Buyer Detail</strong>{" "}
                          <Link
                            to={`/panel/user/view/${order?.buyerDetail?._id}`}
                            className="text-warning fas fa-eye"
                          ></Link>
                        </h4>
                        {/* <Link
                          to={`/panel/user/view/${order?.buyerDetail?._id}`}
                          style={{ color: "black" }}
                        > */}
                        <strong>Name:</strong>{" "}
                        {order?.buyerDetail?.userName || "N/A"}
                        {/* </Link> */}
                        <div>
                          <strong> Email:</strong>{" "}
                          {order?.buyerDetail?.email || "N/A"}
                        </div>
                        {/* <div>
                        <strong>Address:</strong> {order?.buyerDetail?.userName ||"N/A"}
                      </div> */}
                      </div>
                      <div className="float-right col-3">
                        <h4>
                          <strong>Payment Detail</strong>
                        </h4>
                        <div>
                          <strong>Date:</strong>{" "}
                          {format(parseISO(order?.createdAt), "dd/MM/yyyy")}
                        </div>
                        <div>
                          <strong> Payment Amount:</strong>{" "}
                          {order?.amount || "N/A"}
                        </div>
                        <div>
                          <strong> Order Id:</strong>{" "}
                          {order?.orderId || "N/A"}
                        </div>
                        <div>
                          <strong> Status:</strong>{" "}
                          <span className="text-capitalize badge p-2 badge-warning">{order?.status || "N/A"}</span>
                        </div>
                        <div>
                          {/* <strong>Transaction Id:</strong> {"N/A"} */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card m-3 ">
                    <div className="table-responsive-sm">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th className="center">#</th>
                            <th className="text-center">Product Name</th>
                            <th className="text-center">Seller Name</th>
                            {/* <th className="text-center">Description</th> */}
                            <th className="text-center">Quantity</th>
                            <th className="text-center">Selling Price $</th>
                            <th className="text-center">Shipping Price $</th>
                            <th className="text-center">Total $</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.subOrderDetail &&
                            order?.subOrderDetail.map((order, i) => {
                              return (
                                <tr key={i}>
                                  <td className="center"> {i + 1} </td>
                                  <td className="text-center strong">
                                    <Link
                                      style={{
                                        color: "black",
                                        fontWeight: "500",
                                      }}
                                      to={`/panel/product/view/${order?.productDetail?._id}`}
                                    >
                                      {order?.productDetail?.name || "N/A"}
                                    </Link>
                                  </td>

                                  <td className="text-center">
                                  <Link
                                  style={{
                                    color: "black", 
                                  }}
                              to={`/panel/user/view/${order?.sellerDetail?._id}`} 
                          >
                                    {order?.sellerDetail?.userName || "N/A"}
                          </Link>
                                  </td>
                                  {/* <td className="text-center strong">
                                    {order?.productDetail?.description || "N/A"}
                                  </td> */}
                                  <td className="text-center strong">
                                    {order.quantity || "N/A"}
                                  </td>
                                  <td className="text-center strong">
                                    {order.price || "N/A"}
                                  </td>
                                  <td className="text-center strong">
                                    {0}
                                    {/* {order?.shipping_charge || 'N/A'} */}
                                  </td>
                                  <td className="text-center strong">
                                    {order.price * order.quantity + 0 || "N/A"}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  {/* <div className="card m-3">
                                    <div id="PrintInvoice">
                                        {order?.products &&
                                            order?.products.map((order, i) => {
                                                return (
                                                    <div className="card-header p-4" key={i}>
                                                        <div className="float-left col-6">
                                                            <h4><strong>Seller</strong> Detail</h4>
                                                            <div>
                                                                <strong>Name:</strong> {order.seller.first_name + " " + order.seller.last_name}
                                                            </div>
                                                            <div>
                                                                <strong> Email:</strong> {order.seller.email}
                                                            </div>
                                                            <div>
                                                                <strong>Address:</strong> {order.seller.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div> */}
                  <div className="card m-3 p-3">
                    <div id="PrintInvoice" className="row">
                      <div className="float-left col-6">
                        <h4>
                          <strong>Shipping Detail</strong>
                        </h4>
                        <div>
                          <strong>Name:</strong>{" "}
                          {order?.shipping_addDetail?.name || "N/A"}
                        </div>
                        <div>
                          <strong> Street:</strong>{" "}
                          {order?.shipping_addDetail?.street || "N/A"}
                        </div>
                        <div>
                          <strong>City:</strong>{" "}
                          {order?.shipping_addDetail?.city || "N/A"}
                        </div>
                        <div>
                          <strong>State:</strong>{" "}
                          {order?.shipping_addDetail?.state || "N/A"}
                        </div>
                        <div>
                          <strong>Country:</strong>{" "}
                          {order?.shipping_addDetail?.country || "N/A"}
                        </div>
                        <div>
                          <strong>Pin Code:</strong>{" "}
                          {order?.shipping_addDetail?.pin_code || "N/A"}
                        </div>
                      </div>
                      <div className="col-6">
                        {/* timeline */}
                        {/* <div className="timeline">
                          <div className="time-label">
                            <span className="bg-red">10 Feb. 2014</span>
                          </div>
                          <div>
                            <i className="fas fa-envelope bg-blue" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="fas fa-clock" /> 12:05
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Support Team</a> sent you an email
                              </h3>
                              <div className="timeline-body">
                                Etsy doostang zoodles disqus groupon greplin
                                oooj voxy zoodles, weebly ning heekya handango
                                imeem plugg dopplr jibjab, movity jajah plickers
                                sifteo edmodo ifttt zimbra. Babblely odeo
                                kaboodle quora plaxo ideeli hulu weebly
                                balihoo...
                              </div>
                              <div className="timeline-footer">
                                <a className="btn btn-primary btn-sm">
                                  Read more
                                </a>
                                <a className="btn btn-danger btn-sm">Delete</a>
                              </div>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-user bg-green" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="fas fa-clock" /> 5 mins ago
                              </span>
                              <h3 className="timeline-header no-border">
                                <a href="#">Sarah Young</a> accepted your friend
                                request
                              </h3>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-comments bg-yellow" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="fas fa-clock" /> 27 mins ago
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Jay White</a> commented on your post
                              </h3>
                              <div className="timeline-body">
                                Take me to your leader! Switzerland is small and
                                neutral! We are more like Germany, ambitious and
                                misunderstood!
                              </div>
                              <div className="timeline-footer">
                                <a className="btn btn-warning btn-sm">
                                  View comment
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="time-label">
                            <span className="bg-green">3 Jan. 2014</span>
                          </div>
                          <div>
                            <i className="fa fa-camera bg-purple" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="fas fa-clock" /> 2 days ago
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Mina Lee</a> uploaded new photos
                              </h3>
                              <div className="timeline-body">
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                                <img
                                  src="https://placehold.it/150x100"
                                  alt="..."
                                />
                              </div>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-video bg-maroon" />
                            <div className="timeline-item">
                              <span className="time">
                                <i className="fas fa-clock" /> 5 days ago
                              </span>
                              <h3 className="timeline-header">
                                <a href="#">Mr. Doe</a> shared a video
                              </h3>
                              <div className="timeline-body">
                                <div className="embed-responsive embed-responsive-16by9">
                                  <iframe
                                    className="embed-responsive-item"
                                    src="https://www.youtube.com/embed/tMWkeBIohBs"
                                    allowFullScreen=""
                                  />
                                </div>
                              </div>
                              <div className="timeline-footer">
                                <a href="#" className="btn btn-sm bg-maroon">
                                  See comments
                                </a>
                              </div>
                            </div>
                          </div>
                          <div>
                            <i className="fas fa-clock bg-gray" />
                          </div>
                        </div> */}
                        {/* end */}
                      </div>
                    </div>
                  </div>
                  <div className="col-md-12 text-end me-auto p-4">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={print}
                    >
                      Print
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <FadeLoader speedMultiplier={2} loading={loading} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ViewOrder;
