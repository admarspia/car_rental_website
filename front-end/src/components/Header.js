import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap Styles
import "../App.css"; // Custom Styles (if any)

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Logo / Brand */}
        <NavLink className="navbar-brand fw-bold" to="/">
          Sophor Car Rental
        </NavLink>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Navbar */}
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/RegisterPage">
                Register
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Login">
                Login/Logout
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ListCustomers">
                List Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Search">
                Search
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
