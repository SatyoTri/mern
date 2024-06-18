import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../redux/reducer/auth';

const Navbar = () => {
  const state = useSelector(state => state.handleCart);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const isAdmin = useSelector(state => state.auth.isAdmin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    // Tambahkan logika tambahan untuk membersihkan data pengguna atau state lainnya jika perlu
  };

  const renderAuthButtons = () => {
    if (isLoggedIn) {
      return (
        <>
          <button className="btn btn-outline-dark m-2" onClick={handleLogout}>
            <i className="fa fa-sign-out-alt mr-1"></i> Logout
          </button>
          <NavLink to="/cart" className="btn btn-outline-dark m-2">
            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
          </NavLink>
        </>
      );
    } else {
      return (
        <>
          <NavLink to="/login" className="btn btn-outline-dark m-2">
            <i className="fa fa-sign-in-alt mr-1"></i> Login
          </NavLink>
          <NavLink to="/register" className="btn btn-outline-dark m-2">
            <i className="fa fa-user-plus mr-1"></i> Register
          </NavLink>
          <NavLink to="/cart" className="btn btn-outline-dark m-2">
            <i className="fa fa-cart-shopping mr-1"></i> Cart ({state.length})
          </NavLink>
        </>
      );
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 sticky-top">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-4 px-2" to="/">
          React Ecommerce
        </NavLink>
        <button
          className="navbar-toggler mx-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav m-auto my-2 text-center">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                Products
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                Contact
              </NavLink>
            </li>
            {isLoggedIn && isAdmin && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/admin">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <div className="buttons text-center">{renderAuthButtons()}</div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
