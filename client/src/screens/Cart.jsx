import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../app/cart/cartActionss";
import CartItem from "../components/cart/CartItem";
import CartOrderSummary from "../components/cart/CartOrderSummary";

export default function Cart() {
  const dispatch=useDispatch()
  
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;
  
  const getHeadingContent = () =>
    cart.length === 1 ? "(1 Item)" : `(${cart.length} Items)`;

  return (
    <div className='my-4'>
      <div className='container'>
        <h3 className='d-flex justify-content-between'>
          <span>Cart {getHeadingContent()} </span>
          {cart?.length > 1 && (
            <button
              className='btn btn-danger'
              onClick={() => dispatch(resetCart())}>
              Clear cart
            </button>
          )}
        </h3>
        {loading ? (
          <h2>Loading ...</h2>
        ) : error ? (
          <div className='alert alert-danger'>{error}</div>
        ) : cart?.length === 0 ? (
          <h1 className='my-4 opacity-50 border p-4'>No Any Item Yet</h1>
        ) : (
          <div className='row'>
            <div className='col-md-8'>
              {cart?.map((item) => (
                <CartItem item={item} key={item?.id} />
              ))}
            </div>
            <div className='col-md-4'>
              <CartOrderSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
