import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../app/actions/productionActions";
import ProductsCard from "../components/products/ProductsCard";
import { products } from "../data";

export default function ProductsScreen() {
  const allProducts = useSelector((state) => state?.products);

 console.log(allProducts)

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts);
  }, [dispatch]);
  return (
    <div>
      <div className='container mt-4'>
        <div className='row'>
          {products.map((item) => (
            <div className='col-2 mb-4'>
              <ProductsCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
