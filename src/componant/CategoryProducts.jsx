import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/categoryProduct.css"

const CategoryProducts = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const category = location.state?.category;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:8080/products")
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.allproducts);
        }
      });
  }, []);

  if (!category) return null;

  const filteredProducts = products.filter(
    (p) => p.category === category.name
  );

  return (
    <div className="category-container">
      <h2 className="category-title">{category.name}</h2>

      {filteredProducts.length === 0 ? (
        <p className="no-products">No products found</p>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((item, index) => (
            <div
              key={item._id}
              className="product-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="product-info">
                <h4>{item.title}</h4>
                <p className="price">₹{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
