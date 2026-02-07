import React from 'react';
import '../css/HomeHero.css';

const HomeHero = () => {
  return (
    <section className="hero main-home">
      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-badge">Free Shipping - orders over $100</span>
          <h1 className="hero-title">Free Shipping on orders over <span className="highlight">$100</span></h1>
          <p className="hero-subtext">Free Shipping to First-Time Customers Only, After promotions and discounts are applied.</p>
          <button className="hero-button">Show Now</button>
        </div>
              {/* <div className="hero-image">
          <img src="https://via.placeholder.com/600x400?text=Vegetables+Image" alt="Fresh Vegetables" />
            
        </div> */}

      </div>
    </section>
  );
};

export default HomeHero;
