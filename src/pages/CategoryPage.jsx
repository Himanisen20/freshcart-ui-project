import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../componant/categoryPage.css";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    fetch(`https://dummyjson.com/products/category/${categoryId}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      });
  }, [categoryId]);

  return (
    <div className="cat-page">
      <header className="cat-header">
        {/* <h1>{categoryId.toUpperCase()}</h1> */}
        <Link to="/" className="cat-back-link">← Back</Link>
      </header>

      {loading ? (
        <p style={{ color: "green" }}>⏳ Loading Products...</p>
      ) : (
        <div className="cat-products-grid">
          {products.map((product) => (
            <div key={product.id} className="cat-product-card">
              <img src={product.thumbnail} className="cat-product-image" />
              <h3>{product.title}</h3>
              <p className="cat-product-price">₹{product.price * 5}</p>
              <button className="cat-product-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
