import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import { getSingleProducts } from "../app/products/productionActions";
import Loader from "../components/Loader";
import { addCartItem } from "../app/cart/cartActionss";

export default function ProductDetials() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(0);


  const cartInfo = useSelector((state) => state?.cart);
  const { cart } = cartInfo;

  const addItem = (id) => {
    if (cart.some((cartItem) => cartItem?.id === id)) {
      toast({
        description:
          "This item is already in your cart. Go to your cart to change the amount.",
        status: "error",
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1));
      toast({
        description: "Item has been added.",
        status: "success",
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleProducts(id));
  }, [dispatch, id]);

  
  const productsList = useSelector((state) => state?.products);
  const { productsDetials, loading, appErr } = productsList;

  return (
    <div className='container my-4'>
      {loading ? (
        <Loader />
      ) : appErr ? (
        <div className='alert alert-danger' role='alert'>
          {appErr}
        </div>
      ) : (
        <>
          <Link to='/' className='link-secondary'>
            <h3 className='my-4'>Go Back</h3>
          </Link>
          <div className='shadow-lg mb-3'>
            <div className='row g-0'>
              <div className='col-md-4'>
                <img
                  src={productsDetials?.image}
                  className='img-fluid rounded-start'
                  alt='...'
                />
              </div>
              <div className='col-md-4'>
                <div className='card-body p-4'>
                  <h2 className='card-title mb-4 opacity-75'>
                    {productsDetials?.name}
                  </h2>
                  <h5 className='card-title my-4'>
                    <span className='pl-2'>Brand _ </span>
                    <span className='mx-2 opacity-75'>
                      {productsDetials?.brand}
                    </span>
                  </h5>
                  <h6 className='card-title'>
                    <span>Category :</span>
                    <span className='mx-3 opacity-75'>
                      {productsDetials?.category}
                    </span>
                  </h6>
                  <div className='my-3'>
                    <Rating
                      value={productsDetials?.rating}
                      text={`${productsDetials?.numReviews} Reviews`}
                    />
                  </div>
                  <p className='card-text product-details mb-3 lead opacity-75'>
                    {productsDetials?.description}
                  </p>
                  <p className='card-text my-4'>
                    <small className='text-muted'>
                      <span className='mx-2'>
                        <i className='bi bi-stopwatch'></i>
                      </span>
                      {moment().startOf("second").fromNow()}
                    </small>
                  </p>
                </div>
              </div>
              <div className='col-md-4'>
                <div className='cart  p-4'>
                  <div className='price d-flex justify-content-between border p-3'>
                    <h6>Price</h6>
                    <h6>
                      <span className='card-title'>
                        {" "}
                        $ {productsDetials?.price}
                      </span>
                    </h6>
                  </div>
                  <div className='price d-flex justify-content-between border p-3'>
                    <h6>Status: </h6>
                    <h6>
                      {productsDetials?.countInStock > 0 ? (
                        <span className='badge text-bg-success'>
                          {productsDetials?.countInStock}
                        </span>
                      ) : (
                        <span className='badge text-bg-danger'>
                          {productsDetials?.countInStock}
                        </span>
                      )}
                    </h6>
                  </div>

                  {productsDetials?.countInStock > 0 && (
                    <select
                      className='form-select'
                      aria-label='Default select example'
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}>
                      {[...Array(productsDetials?.countInStock).keys()].map(
                        (x) => (
                          <option value={x + 1} key={x + 1}>
                            {x + 1}
                          </option>
                        )
                      )}
                    </select>
                  )}

                  <button
                    className='btn btn-dark w-100'
                    disabled={productsDetials?.countInStock <= 0}
                    onClick={() => addItem(productsDetials?._id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
