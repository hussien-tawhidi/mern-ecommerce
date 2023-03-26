import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUserAction } from "../../app/userAuth/userActions";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSetting, setShowSetting] = useState(false);

  const onShowSetting = () => {
    setShowSetting(!showSetting);
  };

  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  const userInfo = useSelector((state) => state.user);
  const { userAuth } = userInfo;

  const logout = () => {
    dispatch(logoutUserAction());
    window.location.reload();
  };

  return (
    <div className='main-menu shadow'>
      <div className='left-menu'>
        <Link to='/' className='menu'>
          <img src='/assets/logo.png' alt='logo' className='img-fluid' />
          <p>Tech</p>
        </Link>
        <Link to='/cart' className='menu mx-2 position-relative'>
          <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill text-dark'>
            {cart?.length}
            <span className='visually-hidden'>unread messages</span>
          </span>
          <span className='mx-2'>
            <i className='bi bi-bag'></i>
          </span>
          cart
        </Link>
      </div>
      <div className='right-menu'>
        {!userAuth ? (
          <span className='d-flex align-items-center'>
            <Link to='/login'>
              <button className='btn btn-light menu' type='button'>
                Sign in
              </button>
            </Link>
            <Link to='/register'>
              <button className='btn btn-warning menu' type='button'>
                Sign Up
              </button>
            </Link>
          </span>
        ) : (
          <button className='btn menu name' type='button'>
            <h3 className='text-capitalize' onClick={onShowSetting}>
              {userAuth?.name}
            </h3>
            {userAuth && (
              <div className={showSetting ? "links show" : "links"}>
                <p className='py-4' onClick={onShowSetting}>
                  <Link to={`/profile/${userAuth?._id}`}>Profile</Link>
                </p>
                <button className='btn btn-warning mt-2' onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
