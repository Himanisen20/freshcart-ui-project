import React from "react";
import "../css/dashboard.css";
import { Link } from "react-router-dom";



function Dashhome() {
  return (
        <div >
         {/* ---- Welcome Banner ---- */}
        <div className="welcome-banner">
          <div className="banner-left">
            <h2>Welcome back! FreshCart</h2>
            <p>FreshCart is simple & clean design for developer and designer.</p>
            <Link to="/"><button className="green-btn">Back to Home</button></Link>
          </div>

          {/* <img src="" alt="hero" className="hero-img" /> */}
        </div>

        {/* ---- Stats Boxes ---- */}
        <div className="stats-row">
          <div className="stat-box">
            <p>Earnings</p>
            <h3>$93,438.78</h3>
            <span className="sub">Monthly revenue</span>
          </div>

          <div className="stat-box">
            <p>Orders</p>
            <h3>42,339</h3>
            <span className="sub">35+ New Sales</span>
          </div>

          <div className="stat-box">
            <p>Customer</p>
            <h3>39,354</h3>
            <span className="sub">30+ new in 2 days</span>
          </div>
        </div>
      </div>
   
  );
}

export default Dashhome;
