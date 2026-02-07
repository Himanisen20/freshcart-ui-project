import React from "react";
import "../css/promo.css";

function Section() {
  const promos = [
    {
      title: "Fruits & Vegetables",
      offer: "Get Upto 30% Off",
      img: "https://freshcart.codescandy.com/assets/images/banner/banner-deal.jpg",
    },
    {
      title: "Freshly Baked Buns",
      offer: "Get Upto 25% Off",
      img: "https://freshcart.codescandy.com/assets/images/banner/menu-banner.jpg",
    },
  ];

  return (
    <div className="promo-container">
      {promos.map((item, i) => (
        <div key={i} className="promo-card">
          <div className="promo-content">
            <h2>{item.title}</h2>
            <p>{item.offer}</p>
            <button className="promo-btn">Shop Now</button>
          </div>
          <img src={item.img} alt={item.title} className="promo-img" />
        </div>
      ))}
    </div>
  );
}

export default Section;
