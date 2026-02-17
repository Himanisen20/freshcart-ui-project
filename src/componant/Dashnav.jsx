import React from "react";
import "../css/dashboard.css";
import { NavLink, Link } from "react-router-dom";

import {
   FaHome, FaBox, FaTags,
  FaShoppingBag, FaUsers, FaStar, FaBars
} from "react-icons/fa";

function DashNav() {
  return (

    <div className="sidebar">
      <Link to="/">
      <h2 className="logo">🛒 FreshCart</h2>
      </Link>

      <ul className="menu">

        <Link to="/Dashboard">
        <li className="active">
            <FaHome /><span>Dashboard</span>
         </li>
          </Link>

        <p className="menu-title">Store Managements</p>

       
          <Link to="/productpage" >
            <li className="dahs" >
              <FaBox /><span>Products</span></li>
          </Link>
       

        <Link to="/category">
          <li><FaTags />
          <span>Categories</span></li>
        </Link>

        <Link to="/orderlist">
        <li><FaShoppingBag />
        <span>Orders</span></li>
        </Link>

       

        <Link to="/customer">
          <li><FaUsers />
           <span>Customers</span></li>
        </Link>

        <Link to="/reviewpage">
          <li>
            <FaStar />
            <span>Reviews</span>
          </li>
        </Link>


        <p className="menu-title">Site Settings <span className="coming">Coming Soon</span></p>

        <li><FaBars /><span>Blog</span><span className="badge new">New</span></li>

      </ul>
    </div>
  );
}


export default DashNav;
