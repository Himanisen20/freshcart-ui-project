import React from "react";
import "../css/section.css";

function Section() {
 

  return (
    <div className="promo-main">
    <div className="promo-container">
     
        <div  className="promo-card">
          <div className="promo-content">
            <h2>Freshly Baked Buns</h2>
            <p>Get Upto 25% Off</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <img src="https://freshcart-next-js.vercel.app/images/banner/grocery-banner-2.jpg"  
          alt="image" className="promo-img" />
        </div>

         <div  className="promo-card">
          <div className="promo-content">
            <h2>Fruits & Vegetables</h2>
            <p>Get Upto 30% Off</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <img src="https://freshcart-next-js.vercel.app/images/banner/grocery-banner.png"
           alt="image" className="promo-img" />
        </div>
     
    </div>
    </div>
  );
}

export default Section;
