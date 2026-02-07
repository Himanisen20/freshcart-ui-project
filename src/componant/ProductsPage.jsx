import React, { useEffect, useState } from "react";
import "../css/productsPage.css";

const ProductsPage = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Format category name (optional)
  const formatText = (str) =>
    str
      .replace(/-/g, " ")
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");

  // Fetch categories
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(["all", ...data]); // add "all" option
      });
  }, []);

  // Fetch products (filtered)
  useEffect(() => {
    setLoading(true);

    const url =
      activeCategory === "all"
        ? "https://dummyjson.com/products?limit=100"
        : `https://dummyjson.com/products/category/${activeCategory}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products || []);
        setLoading(false);
      });
  }, [activeCategory]);

  return (
    <div className="page-container">
      <div className="filter-section">
        <h2>Categories</h2>
        <ul>
          {categories.map((cat) => (
            <li
              key={cat}
              className={activeCategory === cat ? "active" : ""}
              onClick={() => setActiveCategory(cat)}
            >
              {formatText(cat)}
            </li>
          ))}
        </ul>
      </div>

      <div className="product-section">
        <h2>{formatText(activeCategory)} Products</h2>

        {loading ? (
          <p className="loading">⏳ Loading products...</p>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.thumbnail} alt={product.title} />
                <h4>{product.title}</h4>
                <p>₹{product.price * 10}</p>
                <button>Add to Cart</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
