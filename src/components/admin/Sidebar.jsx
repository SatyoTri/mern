// Sidebar.js
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <Nav className="flex-column">
        <NavLink to="/admin" className="nav-link active">
          <i className="fas fa-home"></i> Dashboard
        </NavLink>
        <NavLink to="products" className="nav-link">
          <i className="fas fa-box"></i> Manage Product
        </NavLink>
        <NavLink to="orders" className="nav-link">
          <i className="fas fa-shopping-cart"></i> Manage Order
        </NavLink>
        <NavLink to="/" className="nav-link">
          <i className="fas fa-sign-out-alt"></i> Log Out
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;