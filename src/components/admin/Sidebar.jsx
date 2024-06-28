// Sidebar.js
import React from 'react';
import { Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column p-3 bg-light" style={{ width: '250px', height: '100vh' }}>
      <Nav className="flex-column">
        <NavLink to="/admin" className="nav-link">
          Dashboard
        </NavLink>
        <NavLink to="products" className="nav-link">
          Manage Product
        </NavLink>
        <NavLink to="orders" className="nav-link">
          Manage Order
        </NavLink>
      </Nav>
    </div>
  );
};

export default Sidebar;
