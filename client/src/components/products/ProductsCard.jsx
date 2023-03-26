import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Rating from "../Rating";
import { toast } from "react-toastify";
import { addCartItem } from "../../app/cart/cartActionss";

export default function ProductsCard({ product }) {
  const dispatch = useDispatch();
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

  return (
    <div className='card h-100'>
      <img src={product?.image} className='card-img-top' alt='...' />
      <div className='card-body'>
        <Link to={`/product-details/${product?._id}`}>
          <h5 className='card-title'>{product?.name}</h5>
        </Link>
        <h6 className='card-subtitle my-4 text-muted'>
          <Rating
            value={product.rating}
            text={`${product.numReviews} Reviews`}
          />
        </h6>
        <span className='d-flex justify-content-between align-items-center'>
          <p className='card-text h4'>$ {product?.price}</p>
          {product?.countInStock > 0 && (
            <button
              className='btn btn-outline-secondary'
              onClick={() => addItem(product?._id)}>
              <i className='bi bi-basket'></i>
            </button>
          )}
        </span>
      </div>
    </div>
  );
}
