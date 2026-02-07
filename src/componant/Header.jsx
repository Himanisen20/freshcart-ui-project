import React, { useState } from "react";
import "../css/header.css";
import {
  Search,
  MapPin,
  Heart,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";
import NavBar from "./NavBar ";
import { NavLink } from "react-router-dom";
import AuthPage from "./AuthPage";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  return (
    <header className="header-wrapper" role="banner">
      <div className="header-container">

        {/* LEFT: LOGO */}
        <div className="header-logo">
          <img src="https://freshcart.codescandy.com/assets/images/logo/freshcart-logo.svg"alt="FreshCart Logo" />
        </div>

        {/* DESKTOP: SEARCH (hidden on mobile via CSS) */}
        <div className="header-search" aria-hidden={mobileOpen ? "true" : "false"}>
          <input type="text" placeholder="Search for products" />
          <Search className="header-search-icon" size={18} aria-hidden />
        </div>

        {/* LOCATION BUTTON (hidden on small screens) */}
        <button className="location-btn" type="button" aria-label="Select location">
          <MapPin size={16} />
          <span>Location</span>
        </button>

        {/* RIGHT: ICONS + MOBILE TOGGLE */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div className="header-icons" aria-hidden={mobileOpen ? "true" : "false"}>
            <div className="icon-box" title="Wishlist" role="button" tabIndex={0}>
               <NavLink to="/wishlist">
              <Heart size={20} /></NavLink>
            </div>

            <div className="icon-box" title="Account" role="button" tabIndex={0}>
              <NavLink to="/login">
              <User size={20} /></NavLink>
            </div>

            <div className="icon-box" title="Cart" role="button" tabIndex={0}>
              <NavLink to="/cart">
              <ShoppingCart size={20} /></NavLink>
            </div>
          </div>

          {/* MOBILE: Search icon and hamburger */}
          {/* <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
           
            <div
              className="mobile-toggle"
              onClick={() => {
                
                setMobileOpen((s) => !s);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              role="button"
              tabIndex={0}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </div>
          </div> */}
        </div>
      </div>

      {/* MOBILE PANEL (search + nav) */}
      <div className={`mobile-panel ${mobileOpen ? "open" : ""}`} aria-hidden={!mobileOpen}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* Inline mobile search */}
          <div className="mobile-search-inline">
            <input
              type="search"
              value={mobileSearch}
              onChange={(e) => setMobileSearch(e.target.value)}
              placeholder="Search for products"
              aria-label="Search"
            />
            <button
              type="button"
              style={{
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                background: "#fff",
              }}
              onClick={() => {
                // handle mobile search action (user can implement)
                console.log("search:", mobileSearch);
              }}
            >
              <Search size={16} />
            </button>
          </div>

          {/* Mobile nav links (example) */}
          <nav className="mobile-nav-links" aria-label="Mobile navigation">
            <a href="#!" onClick={() => setMobileOpen(false)}>Home</a>
            <a href="#!" onClick={() => setMobileOpen(false)}>All Departments</a>
            <a href="#!" onClick={() => setMobileOpen(false)}>Fruits & Vegetables</a>
            <a href="#!" onClick={() => setMobileOpen(false)}>Grocery</a>
            <a href="#!" onClick={() => setMobileOpen(false)}>Offers</a>
          </nav>

          {/* Mobile quick icons */}
          <div className="mobile-icons-row" style={{ marginTop: 16 }}>
            <div className="icon-box" style={{ padding: 10 }}>
              <Heart size={18} /> <span style={{ marginLeft: 8 }}>Wishlist</span>
            </div>
            <div className="icon-box" style={{ padding: 10 }}>
              <User size={18} /> <span style={{ marginLeft: 8 }}>Account</span>
            </div>
            <div className="icon-box" style={{ padding: 10 }}>
              <ShoppingCart size={18} /> <span style={{ marginLeft: 8 }}>Cart</span>
            </div>
          </div>
        </div>
      </div>
       <NavBar/>

    </header>
  );
}
