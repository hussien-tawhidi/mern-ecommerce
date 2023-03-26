import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrdersAction } from "../app/order/orderActions";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user);
  const { userAuth } = user;

  useEffect(() => {
    dispatch(getOrdersAction());
  }, [dispatch]);

  const order = useSelector((state) => state?.order);
  const { orders } = order;

  // const userOrder = orders?.map((item) => item?.user);
  // const userOrderId = orders?.map((item) => item?.user?.map((i) => i?.id));
  // const orderUserInfo=userOrder?.map(item=>item?.name)
  console.log(orders);

  return (
    <div>
      <h1>{userAuth?.name}</h1>
      <h1>{userAuth?.email}</h1>
      <h3 className='text-center my-4 py-4'>
        <button className='btn btn-info' type='submit'>
          <Link to={`/update-profile/${userAuth?._id}`}>Update Profile</Link>
        </button>
      </h3>

      <div className='container'>
        {orders?.map((item, index) => (
          <div className='content mb-4 shadow p-4' key={index}>
            <div className=''>
              <span>Order NO: {item._id} </span>
              <p>USER : {item?.user}</p>
              <div className='row'>
                {item?.orderItems?.map((i) => (
                  <div className='col-3 mb-2' key={i._id}>
                    <div className=''>
                      <img src={i.image} alt='' className='img-fluid' />
                      <div className='card-blody'>
                        <p className='card-title'>{i?.name}</p>
                        <p>${i.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className='my-3'>
              {item?.shippingAddress?.address} _{item?.shippingAddress?.city} _
              {item?.shippingAddress?.postalCode} _
              {item?.shippingAddress?.country}
            </p>
            {item?.isDelivered ? (
              <div className='alert alert-success'>Deliverd</div>
            ) : (
              <div className='alert alert-danger'>Not Deliverd</div>
            )}
            {item?.isPaid ? (
              <div className='alert alert-success'>Paid</div>
            ) : (
              <div className='alert alert-danger'>Not Paid</div>
            )}
            <h3>Total price: ${item?.totalPrice}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
