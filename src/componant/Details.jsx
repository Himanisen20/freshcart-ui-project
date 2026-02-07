
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Product.css";

function Details() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  if (!product) {
    return (
      <div className="pd-page">
        <p>No product selected.</p>
        <button className="back-small" onClick={() => navigate("/")}>
          Go Home
        </button>
      </div>
    );
  }

  // images
  const allImages = product.images && product.images.length
    ? product.images
    : [product.thumbnail];

  const [activeImg, setActiveImg] = useState(allImages[0]);
  const [qty, setQty] = useState(1);

  const originalPrice = product.discountPercentage
    ? Math.round(product.price / (1 - product.discountPercentage / 100))
    : product.price + 5;
  const discountText = `${Math.max(
    1,
    Math.round(
      ((originalPrice - product.price) / originalPrice) * 100
    )
  )}% Off`;

  const incQty = () => setQty((q) => q + 1);
  const decQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="pd-page">
      <div className="pd-breadcrumb">
           <span>{product.category}</span>
        
        <span>{product.title}</span>
      </div>

      <div className="pd-main-card">
        <div className="pd-left"> 
          <div className="pd-main-img">
            <img src={activeImg} alt={product.title} />
          </div>

          <div className="pd-thumb-row">
            {allImages.slice(0, 4).map((img, i) => (
              <button
                key={i}
                className={
                  "pd-thumb-item " + (img === activeImg ? "pd-thumb-active" : "")
                }
                onClick={() => setActiveImg(img)}
              >
                <img src={img} alt={`thumb-${i}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="pd-right"> 
          <p className="pd-cat-text">
            { 
            product.category.charAt(0).toUpperCase() +
              product.category.slice(2)}
          </p>

          <h1 className="pd-title">{product.title}</h1>

          <div className="pd-rating-row">
            <span className="pd-stars">★ ★ ★ ★ ☆</span>
            <span className="pd-rating-num">
              {/* {product.rating.toFixed(1)} ({product.stock} reviews) */}
            </span>
          </div>

          {/* price block */}
          <div className="pd-price-row">
            <span className="pd-price">${product.price}</span>
            <span className="pd-old-price">${originalPrice}</span>
            <span className="pd-discount">{discountText}</span>
          </div>

          <div className="pd-size-row">
            {[""].map((s, i) => (
              <button
                key={s}
                className={
                  "pd-size-btn " + (i === 0 ? "pd-size-btn-active" : "")
                }
              >
                {s}
              </button>
            ))}
          </div>

          {/* quantity + buttons */}
          <div className="pd-qty-section">
            <div className="pd-qty-box">
              <button onClick={decQty}>-</button>
              <span>{qty}</span>
              <button onClick={incQty}>+</button>
            </div>

            <button className="pd-add-cart">Add to cart</button>

            <button className="pd-round-btn">⟳</button>
            <button className="pd-round-btn">♡</button>
          </div>

          {/* bottom details */}
          <div className="pd-info-grid">
            <div className="pd-info-row">
              <span className="pd-info-label">Product Code:</span>
              <span className="pd-info-value">#{product.id}</span>
            </div>
            <div className="pd-info-row">
              <span className="pd-info-label">Availability:</span>
              <span className="pd-info-value">
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <div className="pd-info-row">
              <span className="pd-info-label">Type:</span>
              <span className="pd-info-value">{product.category}</span>
            </div>
            <div className="pd-info-row">
              <span className="pd-info-label">Shipping:</span>
              <span className="pd-info-value">
                01 day shipping. (Free pickup today)
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Details };
