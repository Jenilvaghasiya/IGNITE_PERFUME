// path: frontend/src/components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // 🛒 Import cart context

const Navbar = ({ user, logout }) => {
  const { cart } = useCart(); // 🛒 Use cart context
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0); // 🧮 Total items

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/dashboard">IgnitePerfume</Link>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About Us</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact Us</Link>
          </li>
          
          {user && user.name && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/add-perfume">Add Perfume</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/view-perfume">View Perfume List</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/customize">Customize Perfume</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/show">Show Product</Link>
              </li>
              <li className="nav-item position-relative">
                <Link className="nav-link" to="/cart">
                  🛒 Cart
                  {cartCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "0.7rem" }}
                    >
                      {cartCount}
                    </span>
                  )}
                </Link>
              </li>
            </>
          )}
        </ul>

        <div className="d-flex">
          {user && user.name ? (
            <>
              {/* If user is logged in */}
              <span className="navbar-text text-light mx-2">Welcome, {user.name}</span>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              {/* If user is not logged in */}
              <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
