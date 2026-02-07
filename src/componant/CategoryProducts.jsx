import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/categoryproduct.css";

const CategoryProducts = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products-by-category/${categoryId}`)
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.products);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="category-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <h2 className="page-title">Category Products</h2>

      <div className="products-grid">
        {products.length === 0 ? (
          <p>No products found</p>
        ) : (
          products.map((p) => (
            <div
              className="product-card"
              key={p._id}
              onClick={() => navigate(`/product/${p._id}`)}
            >
              <img src={p.image} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
