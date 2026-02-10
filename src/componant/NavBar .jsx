// src/components/NavBar.jsx
import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Search, MapPin, Heart, User, ShoppingCart } from "lucide-react";

import "../css/Navbar.css";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDeptOpen, setIsDeptOpen] = useState(false);

  const getLinkClass = ({ isActive }) =>
    `nav-link ${isActive ? "nav-link-active" : ""}`;

  return (
    <div className="navbar main-nav">
      <div className="nav-container">
        {/* LEFT: All Departments */}
        <div className="departments">
          <button className="departments-btn"
            onClick={() => setIsDeptOpen((prev) => !prev)} >
            <span className="departments-icon">☰</span>
            <span>All Departments</span>
          </button>

          {/* Departments dropdown */}
          <div className={`departments-menu ${isDeptOpen ? "open" : ""}`}>
            <ul>
              <li>Dairy, Bread &amp; Eggs</li>
              <li>Snacks &amp; Munchies</li>
              <li>Fruits &amp; Vegetables</li>
              <li>Cold Drinks &amp; Juices</li>
              <li>Breakfast &amp; Instant Food</li>
              <li>Bakery &amp; Biscuits</li>
              <li>Chicken, Meat &amp; Fish</li>
            </ul>
          </div>
        </div>

        {/* MOBILE TOGGLE BUTTON */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
        >
          ☰
        </button>

        {/* MAIN NAV LINKS */}
        <nav
          className={`nav-links ${isMobileMenuOpen ? "nav-links-open" : ""}`}
        >
          <div className="nav-item">
            <NavLink to="/" end className={getLinkClass}>
              Home
            </NavLink>
          </div>

          {/* SHOP + DROPDOWN */}
          <div className="nav-item has-dropdown">
            <NavLink to="/shop" className={getLinkClass}>
              Shop
            </NavLink>
            <div className="nav-dropdown">
              <ul>
                <li>All Products</li>
                <li>Best Sellers</li>
                <li>New Arrivals</li>
                <li>On Sale</li>
              </ul>
            </div>
          </div>

          {/* STORES */}
          <div className="nav-item">
            <NavLink to="/store" className={getLinkClass}>
              Stores
            </NavLink>
          </div>

          {/* MEGA MENU + DROPDOWN (demo) */}
          <div className="nav-item has-dropdown">
            <NavLink to="/mega-menu" className={getLinkClass}>
              Mega menu
            </NavLink>
            <div className="nav-dropdown">
              <ul>
                <li>Grocery Essentials</li>
                <li>Household Items</li>
                <li>Personal Care</li>
                <li>Baby Care</li>
              </ul>
            </div>
          </div>

          {/* PAGES + DROPDOWN */}
          <div className="nav-item has-dropdown">
            <NavLink to="/pages" className={getLinkClass}>
              Pages
            </NavLink>
            <div className="nav-dropdown">
              <ul>
                <li>About Us</li>
                <li>Contact</li>
                <li>FAQ</li>
                <li>Terms &amp; Conditions</li>
              </ul>
            </div>
          </div>

          {/* ACCOUNT + DROPDOWN */}
          <div className="nav-item has-dropdown">
            <NavLink to="/account" className={getLinkClass}>
              Account
            </NavLink>
            <div className="nav-dropdown">
              <ul>
                <li><Link to="/login">Sign in</Link></li>
                <li><Link to="/signup">Sign up</Link></li>
                <li><Link to="/resetpass">Forget password</Link></li>
                <li><Link to="/myaccount">My Account</Link></li>

              </ul>
            </div>
          </div>

          {/* DASHBOARD */}
          <div className="nav-item">
            <NavLink to="/Dashboard"

              className={getLinkClass}>
              Dashboard
            </NavLink>
          </div>

          {/* DOCS */}
          <div className="nav-item">
            <NavLink to="/docs" className={getLinkClass}>
              Docs
            </NavLink>
          </div>
        </nav>
      </div>

    </div>
  );
}
