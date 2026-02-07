// src/PopularProducts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/PopularProducts.css";
import axios from "axios";

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/products") // <-- your API
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.allproducts); // API should return array
          setLoading(false);
        }

      })
      .catch((err) => {
        console.error("API Error:", err); s
        setLoading(false);
      });
  }, []);

  const renderStars = (rating = 4) => {
    const full = Math.round(rating);
    return (
      <span className="stars">
        {"★".repeat(full)}
        {"☆".repeat(5 - full)}
      </span>
    );
  };

  if (loading) {
    return <div className="popular-wrapper">Loading products...</div>;
  }

  if (error) {
    return <div className="popular-wrapper error">{error}</div>;
  }

  return (
    <div className="popular-wrapper">
      <h2 className="popular-title">Popular Products</h2>

      <div className="products-grid">
        {products.map((p) => {
          const price = Number(p.price) || 0;
          const oldPrice = (price * 1.25);
          const discount = oldPrice
            ? Math.round(((oldPrice - price) / oldPrice) * 100)
            : 0;

          return (
            <div
              className="product-card"
              key={p._id}
              onClick={() =>
                navigate("/productdeatil", {
                  state: {
                    product: p,
                    allProducts: products,
                  },
                })
              }
            >

              {/* Badges */}
              <div className="card-badges">
                <span className="badge badge-sale">Sale</span>
                <span className="badge badge-off">{discount}%</span>
              </div>

              {/* Image */}
              <div
                className="image-box"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <img
                  src={p.image || "/placeholder.png"}
                  alt={p.title || "Product"}
                />
              </div>

              {/* Content */}
              <div className="card-body">
                <p className="category">{p.category || "General"}</p>

                <h3
                  className="title"
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  {p.title}
                </h3>

                <div className="rating-row">
                  {renderStars(p.rating || 4)}
                  <span className="rating-num">
                    {(p.rating || 4).toFixed(1)}
                  </span>
                </div>

                <div className="price-row">
                  <span className="price-new">₹{price}</span>
                  {p.weight && (
                    <span className="product-weight">{p.weight}</span>
                  )}
                  <span className="price-old">₹{oldPrice.toFixed(2)}</span>
                </div>

                <button
                  className="add-btn"
                  onClick={() => alert(`Added ${p.title} to cart`)}
                >

                  + Add
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <button className="buy-now-btn">🛒 Buy Now</button>
    </div>
  );
};

export default PopularProducts;
