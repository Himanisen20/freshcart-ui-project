import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/FeaturedCategories.css";

const VISIBLE_CARDS = 4;
const CARD_WIDTH = 270; // card width + gap

const FeatureCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/getcategory")
      .then((res) => {
        if (res.data.status) {
          setCategory(res.data.allcategory);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleNext = () => {
    if (currentIndex < category.length - VISIBLE_CARDS) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (loading) return <div className="popular-wrapper">Loading...</div>;

  return (
    <div className="popular-wrapper">
      <h2 className="popular-title">Popular Products</h2>

      <div className="slider-container">
        <button
          className="arrow"
          onClick={handlePrev}
          disabled={currentIndex === 0}
        >
          ❮
        </button>

        {/* Viewport */}
        <div className="slider-viewport">
          <div
            className="products-row smooth-slide"
            style={{
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`
            }}
          >
            {category.map((p) => (
              <div
                className="category-card"
                key={p._id}
                onClick={() => navigate(`/categorycard/${p._id}`)}
              >
                <div className="image-box">
                  <img src={p.image || "/placeholder.png"} alt={p.name} />
                </div>
                <div className="card-body">
                  <h3 className="title">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="arrow"
          onClick={handleNext}
          disabled={currentIndex >= category.length - VISIBLE_CARDS}
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default FeatureCategory;
