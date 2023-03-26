import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetCart } from "../app/cart/cartActionss";
import { createOrderAction } from "../app/order/orderActions";
import ShippingSteps from "../components/ShippingSteps";

export default function PlaceOrder() {
  const distpatch = useDispatch();
  const navigate = useNavigate();

  const order = useSelector((state) => state?.order);
  const cartInfo = useSelector((state) => state?.cart);
  const userInfo = useSelector((state) => state?.user);
  const { userAuth } = userInfo;
  const { cart } = cartInfo;

  const { loading, isOrdered } = order;

  const totalPrice = cartInfo?.subtotal;

  const taxes = 0;

  const shipping = Number(cartInfo?.subtotal >= 1000 ? 0.0 : 20);

  const totalShipping = totalPrice - taxes - shipping;

  const placeOrderHandler = () => {
    distpatch(
      createOrderAction({
        orderItems: cartInfo?.cart,
        shippingAddress: cartInfo?.shippingAddress,
        paymentMethod: cartInfo?.paymentMethod?.payment,
        itemPrice: cartInfo?.subtotal,
        shippingPrice: 0,
        user:userAuth,
        taxPrice: taxes,
        totalPrice: Number(totalPrice),
      })
    );
  };

  useEffect(() => {
    if (isOrdered) {
    }
},[navigate,isOrdered,distpatch])

  return (
    <div className='my-4 '>
      <div className='container'>
        <ShippingSteps step1 step2 step3 step4 />
        <div className='content'>
          <div className='row'>
            <div className='col-8'>
              <div className='order-content border p-2'>
                <h6 className='my-3 h3'>SHIPPING</h6>
                <div className='address'>
                  <p>
                    <span>Address : </span>
                    <span>{cartInfo?.shippingAddress?.address}</span>{" "}
                    <span>{cartInfo?.shippingAddress?.city}</span>{" "}
                    <span>{cartInfo?.shippingAddress?.postalCode}</span>{" "}
                    <span>{cartInfo?.shippingAddress?.country}</span>{" "}
                  </p>
                </div>
                <div className='order-methods border-top my-2 py-2'>
                  <h3>Order method</h3>
                  <p className='payment-menthod mt-3'>
                    <span>Payment method : </span>
                    <span>{cartInfo?.paymentMethod?.payment}</span>
                  </p>
                </div>
                <div className='order-items mt-4 border-top pt-2'>
                  <h6 className='h5'>Ordered Items</h6>
                  {cart?.length <= 0 ? (
                    <h1>There is not item</h1>
                  ) : (
                    cart?.map((item) => (
                      <div className='single-row' key={item?.id}>
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
                    <span>Items :</span> <span>${cartInfo?.subtotal}</span>
                  </p>
                </div>
                <div className='single'>
                  <p className='d-flex justify-content-between border-bottom py-2 h6'>
                    <span>Shipping : </span>
                    <span>${cartInfo?.subtotal >= 1000 ? "0.00" : "20"}</span>
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
                    <span>$ {totalShipping}</span>
                  </p>
                </div>
                {loading ? (
                  <div
                    className='spinner-grow d-flex justify-content-center mx-auto'
                    role='status'>
                    <span className='visually-hidden'>Loading...</span>
                  </div>
                ) : (
                  <button
                    className='btn btn-secondary d-flex justify-content-center mx-auto'
                    type='button'
                    onClick={placeOrderHandler}>
                    Sumit Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
