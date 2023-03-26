import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderAction } from "../app/order/orderActions";
import ShippingSteps from "../components/ShippingSteps";

export default function PlaceOrder() {
  const { id } = useParams();
  const distpatch = useDispatch();

  const order = useSelector((state) => state?.order);
  const userInfo = useSelector((state) => state?.user);
  const { userAuth } = userInfo;

  const { getOrder } = order;

  useEffect(() => {
    distpatch(getOrderAction(id));
  }, [id, distpatch]);
  const shipping = Number(getOrder?.subtotal >= 1000 ? "0" : "20");
  const allItemsPrice = getOrder?.totalPrice;

  const totalPrice = allItemsPrice - shipping;


  return (
    <div className='my-4 '>
      <div className='container'>
        <h1 className='my-4'>
          <span className='opacity-75'>ORDER _</span>{" "}
          <span>#{getOrder?._id}</span>
        </h1>
        <div className='content'>
          <div className='row'>
            <div className='col-8'>
              <div className='order-content border p-2'>
                <h6 className='my-3 h3'>SHIPPING</h6>
                <div className='address'>
                  <p>
                    <span>Name : </span>
                    <span className='mx-2'>{getOrder?.user[0]?.name}</span>
                  </p>
                  <p>
                    <span>Email : </span>
                    <span>
                      <span className='mx-2'>{getOrder?.user[0]?.email}</span>
                    </span>
                  </p>
                  <p>
                    <span>Address : </span>
                    <span>{getOrder?.shippingAddress?.address}</span>{" "}
                    <span>{getOrder?.shippingAddress?.city}</span>{" "}
                    <span>{getOrder?.shippingAddress?.postalCode}</span>{" "}
                    <span>{getOrder?.shippingAddress?.country}</span>{" "}
                  </p>
                </div>
                {getOrder?.isDeleiverd ? (
                  <div className='alert alert-success'>Deliverd</div>
                ) : (
                  <div className='alert alert-danger'>Not deliverd</div>
                )}
                <div className='order-methods border-top my-2 py-2'>
                  <h3>Order method</h3>
                  <p className='payment-menthod mt-3'>
                    <span>Payment method : </span>
                    <span>{getOrder?.paymentMethod}</span>
                  </p>
                </div>
                {getOrder?.isPaid ? (
                  <div className='alert alert-success'>Paid Successfully</div>
                ) : (
                  <div className='alert alert-danger'>Not paid</div>
                )}
                <div className='order-items mt-4 border-top pt-2'>
                  <h6 className='h5'>Ordered Items</h6>
                  {getOrder?.length <= 0 ? (
                    <h1>There is not item</h1>
                  ) : (
                    getOrder?.orderItems?.map((item) => (
                      <div className='single-row' key={item?._id}>
                        <div className='row'>
                          <div className='col-2 single-item'>
                            <img
                              src={item?.image}
                              alt=''
                              className='img-fluid order-img'
                            />
                          </div>
                          <div className='col-6'>
                            <p className='h6 d-flex align-items-center h-100'>
                              {item?.name}
                            </p>
                          </div>
                          <div className='col-4'>
                            <div className='price d-flex align-items-center justify-content-between h-100 px-2'>
                              <span>{item?.qty}</span>
                              <span>x</span>
                              <span>${item?.price}</span>
                              <span>=</span>
                              <span>${item?.price * item?.qty}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className='col-4'>
              <div className='total shadow p-3'>
                <p className='text-center h3'>ORDAR SUMMARY</p>
                <div className='single mt-4'>
                  <p className='d-flex justify-content-between border-bottom py-2 h6'>
                    <span>Items :</span> <span>${getOrder?.totalPrice}</span>
                  </p>
                </div>
                <div className='single'>
                  <p className='d-flex justify-content-between border-bottom py-2 h6'>
                    <span>Shipping : </span>
                    <span>${getOrder?.subtotal >= 1000 ? "0.00" : "20"}</span>
                  </p>
                </div>
                <div className='single'>
                  <p className='d-flex justify-content-between border-bottom py-2 h6'>
                    <span>Taxes : </span>
                    <span>${0.0}</span>
                  </p>
                </div>
                <div className='single'>
                  <p className='text-center py-2 h3 opacity-75'>
                    <span>Total : </span>
                    <span>$ {totalPrice}</span>
                  </p>
                </div>
                <button className="btn btn-dark d-flex justify-content-center w-100 ">Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
