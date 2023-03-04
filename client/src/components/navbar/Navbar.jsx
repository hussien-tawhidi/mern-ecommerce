import React from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
  return (
   
      <div className='main-menu shadow'>
        <div className='left-menu'>
          <div className='menu'>
            <img src='/assets/logo.png' alt='logo' className='img-fluid' />
            <p>Tech</p>
          </div>

          <Link to='products' className='menu'>
            Products
          </Link>
          <Link to='products' className='menu'>
            shopping cart
          </Link>
        </div>
        <div className='right-menu'>
          <button className='menu btn'>
            <i class='bi bi-moon-fill'></i>
          </button>
          <button className='btn btn-light menu' type='button'>
            Sign in
          </button>
          <button className='btn btn-warning menu' type='button'>
            Sign Up
          </button>
        </div>
      </div>
  
  );
}
