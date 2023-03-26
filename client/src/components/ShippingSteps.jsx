import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export default function ShippingSteps({ step1, step2, step3, step4 }) {
 const userInfo = useSelector((state) => state?.user);
  const {userAuth } = userInfo;

  return (
    <div className='mt-4'>
      {step1 || userAuth ? (
        <button className='btn' type='submit'>
          <NavLink to='/login'>Login</NavLink>
        </button>
      ) : (
        <button className='btn' type='submit' disabled>
          <NavLink>Login</NavLink>
        </button>
      )}
      {step2 ? (
        <button className='btn' type='submit'>
          <NavLink to='/shipping'>Shipping</NavLink>
        </button>
      ) : (
        <button className='btn' type='submit' disabled>
          <NavLink>Shipping</NavLink>
        </button>
      )}
      {step3 ? (
        <button className='btn' type='submit'>
          <NavLink to='/payment'>Payment</NavLink>
        </button>
      ) : (
        <button className='btn' type='submit' disabled>
          <NavLink>Payment</NavLink>
        </button>
      )}
      {step4 ? (
        <button className='btn' type='submit'>
          <NavLink to='/order'>Order</NavLink>
        </button>
      ) : (
        <button className='btn' type='submit' disabled>
          <NavLink>Order</NavLink>
        </button>
      )}
    </div>
  );
}
