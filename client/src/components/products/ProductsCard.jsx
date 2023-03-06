import React, { useState } from "react";
import { Link } from "react-router-dom";

const Rating = ({ rating, numbReviews }) => {
  const [iconsSize, setIconSize] = useState("14px");
  return (
    <div className='icons'>
      <div className='rating-stars'>
        <span>
          <i class='bi bi-star-fill'></i>
        </span>
        {rating >= 2 ? (
          <span>
            <i class='bi bi-star-fill'></i>
          </span>
        ) : (
          <span>
            <i class='bi bi-star'></i>
          </span>
        )}
        {rating >= 3 ? (
          <span>
            <i class='bi bi-star-fill'></i>
          </span>
        ) : (
          <span>
            <i class='bi bi-star'></i>
          </span>
        )}
        {rating >= 4 ? (
          <span>
            <i class='bi bi-star-fill'></i>
          </span>
        ) : (
          <span>
            <i class='bi bi-star'></i>
          </span>
        )}
        {rating >= 5 ? (
          <span>
            <i class='bi bi-star-fill'></i>
          </span>
        ) : (
          <span>
            <i class='bi bi-star'></i>
          </span>
        )}
        {/* <span>
        </span>
        <span className={rating >= 2 ? "yellow-400" : "gray"}>
          <i class='bi bi-star-fill'></i>
        </span>
        <span className={rating >= 3 ? "orange" : "gray"}>
          <i class='bi bi-star-fill'></i>
        </span>
        <span className={rating >= 4 ? "orange" : "gray"}>
          <i class='bi bi-star-fill'></i>
        </span>
        <span className={rating >= 5 ? "orange" : "gray"}>
          <i class='bi bi-star-fill'></i>
        </span> */}
      </div>
      <div className='numReviews'>
        {`${numbReviews} ${numbReviews === 1 ? "Review" : "Reviews"}`}
      </div>
    </div>
  );
};

export default function ProductsCard({ product }) {
  return (
    <Link to={`/product/detial/${product._id}`} class='card h-100'>
      <img src={product.image} className='card-img-top p-3' alt='...' />
      <div className='card-body'>
        {product?.isNew && (
          <span className='badge rounded-pill bg-success'>
            New
            <span className='visually-hidden'>unread messages</span>
          </span>
        )}
        {product?.stock <= 0 && (
          <span className=' badge rounded-pill bg-danger'>
            SoldOut
            <span className='visually-hidden'>unread messages</span>
          </span>
        )}
        <h5 className='card-title'>{product.name}</h5>
        <Rating rating={product.rating} numbReviews={product.numReviews} />
      </div>
      <div className='card-body d-flex justify-content-between align-items-center'>
        <h6 className='card-link'>{product.price}</h6>
        <button disabled={product?.stock <= 0} className='btn'>
          <i class='bi bi-basket3'></i>
        </button>
      </div>
    </Link>
  );
}
