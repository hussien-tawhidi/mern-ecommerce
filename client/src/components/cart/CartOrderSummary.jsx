import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function CartOrderSummary() {

  const standardShipping = Number(4.99).toFixed(2);
  const cartItems = useSelector((state) => state?.cart);

  const { subtotal } = cartItems;
  const navigate = useNavigate();


  return (
    <>
      <div className='shadow-lg p-3 mb-5 bg-body-tertiary rounded'>
        <h4 className='my-2 h1 text-center'>Order Summary</h4>
        <p className='d-flex justify-content-between p-2 my-3 border-bottom'>
          <span>Shipping : </span> <h5>${subtotal}</h5>
        </p>
        <p className='d-flex justify-content-between p-2 my-3 border-bottom'>
          <span>Shipping : </span>
          <h5>
            {subtotal <= 1000 ? (
              <span>${standardShipping}</span>
            ) : (
              <span>Free</span>
            )}
          </h5>
        </p>
        <h4 className='text-center my-4'>
          <span>Total : </span>
          <span>
            <span className='opacity-75'>$</span>
            {subtotal <= 1000
              ? Number(subtotal) + Number(standardShipping)
              : subtotal}
          </span>
        </h4>
        <button className='btn btn-secondary w-100 p-2'>
          <Link to="/shipping">
            {" "}
            CHECKOUT
            <span className='mx-2'>
              <i class='bi bi-arrow-right'></i>
            </span>
          </Link>
        </button>
      </div>
      <div
        className='d-flex align-items-center justify-content-center'
        onClick={() => navigate("/")}>
        <span>or</span>{" "}
        <button className='btn text-warning'>Continue Shopping</button>
      </div>
    </>
  );
}
