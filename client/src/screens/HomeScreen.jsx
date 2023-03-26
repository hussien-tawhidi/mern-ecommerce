import { useEffect } from "react";
import ProductsCard from "../components/products/ProductsCard";
// import { products } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/products/productionActions";
import Loader from "../components/Loader";

export default function HomeScreen() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productsList = useSelector((state) => state?.products);
  const { products, loading, appErr } = productsList;


  return (
    <div className='container mt-4'>
      <h5>Latest Products</h5>
      <div className='row'>
        {loading ? (
          <Loader />
        ) : appErr ? (
          <div className='alert alert-danger' role='alert'>
            {appErr}
          </div>
        ) : (
          products?.map((item) => (
            <div className='col-3 my-2' key={item._id}>
              <ProductsCard product={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
