import moment from "moment";
import { useDispatch } from "react-redux";
import { addCartItem, removeCartItem } from "../../app/cart/cartActionss";
import Rating from "../Rating";


export default function CartItem({ item }) {
  const dispatch = useDispatch();


  return (
    <div className='card custome-card mb-3 position-relative'>
      <button
        className='btn btn-warning text-light'
        onClick={() => dispatch(removeCartItem(item?.id))}>
        <i className='bi bi-trash2'></i>
      </button>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img src={item?.image} className='img-fluid' alt='...' />
        </div>
        <div className='col-md-8'>
          <div className='card-body'>
            <h6 className='card-title cart-custome-title mb-2'>{item?.name}</h6>
            <div className='my-2 rating'>
              <Rating
                value={item?.rating}
                text={`${item?.numReviews} Reviews`}
              />
            </div>
            <div className='row'>
              <div className='col-md-6'>
                <p className='d-flex justify-content-between border-bottom p-1 align-items-center'>
                  <h6 className='opacity-50'>Price : </h6>
                  <h5>${item?.price}</h5>
                </p>
              </div>
              <div className='col-md-6'>
                <p className='d-flex justify-content-between border-bottom p-1 align-items-center'>
                  <h6 className='opacity-50'>Brand : </h6>
                  <h5>{item?.brand}</h5>
                </p>
              </div>
              <div className='col-md-6 my-2'>
                <p className='d-flex justify-content-between border-bottom p-1 align-items-center'>
                  <h6 className='opacity-50'>category</h6>
                  <h5>{item?.category}</h5>
                </p>
              </div>
              <div className='col-md-6'>
                <div className=''>
                  {item?.countInStock > 0 && (
                    <select
                      className='shadow p-2'
                      aria-label='Default select example'
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(addCartItem(item?.id, e.target.value))
                      }>
                      {[...Array(item?.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
            <p className='card-text desc my-2'>{item?.description}</p>
            <p className='card-text timer'>
              <span>
                <i className='bi bi-clock'></i>
              </span>
              <span className='mx-2'>
                {moment(item?.createdAt).startOf("second").fromNow()}
                <small className='text-muted'></small>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
