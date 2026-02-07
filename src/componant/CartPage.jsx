// src/pages/CartPage.jsx
import React, { useEffect, useState } from "react";
import "../css/cart.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function CartPage() {
  const [cartItems, setCartitem] = useState([]);
  

  // Fetch cart items
 useEffect(() => {
  axios.get("http://localhost:8080/addcartlist")
    .then((res) => {
      if (res.data.status) {
        const normalizedCart = res.data.allcartitem.map((item) => ({
          ...item,
          price: Number(item.price) || 0,
          Productquantity:
            item.Productquantity && Number(item.Productquantity) > 0
              ? Number(item.Productquantity)
              : 1, // ✅ minimum quantity enforced
        }));

        setCartitem(normalizedCart);
      }
    })
    .catch((err) => console.error(err));
}, []);


  // Remove item
  const removebtn = (item) => {
    axios
      .post("http://localhost:8080/removecart", { data: item })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Removed!",
            icon: "success",
          });

          // Remove from UI instantly
          setCartitem((prev) =>
            prev.filter((cart) => cart._id !== item._id)
          );
        }
      });
  };

  // Increment quantity
  const handleIncrement = (id) => {
    setCartitem((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, Productquantity: item.Productquantity + 1 }
          : item
      )
    );
  };

  // Decrement quantity (never below 1)
  const handleDecrement = (id) => {
    setCartitem((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              Productquantity: Math.max(1, item.Productquantity - 1),
            }
          : item
      )
    );
  };

  // Optional: Total cart amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.Productquantity,
    0
  );

  return (
    <div className="cart-page-bg">
      <div className="cart-wrapper">
        <div className="cart-container">
          {/* Header */}
          <div className="cart-header">
            <div>
              <h2>Shop Cart</h2>
              <p className="cart-location">Location in 382480</p>
            </div>
            <button className="cart-close-btn">
              <NavLink to="/">×</NavLink>
            </button>
          </div>

          {/* Alert */}
          <div className="cart-alert">
            You’ve got FREE delivery. <span>Start checkout now!</span>
          </div>

          {/* Cart Items */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item" key={item._id}>
                <div className="cart-item-left">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="cart-item-img"
                  />
                  <div>
                    <h4 className="cart-item-name">{item.title}</h4>
                    <p className="cart-item-weight">{item.category}</p>

                    <button
                      className="cart-remove-btn"
                      onClick={() => removebtn(item)}
                    >
                      <span className="cart-remove-icon">🗑</span> Remove
                    </button>
                  </div>
                </div>

                <div className="cart-item-right">
                  {/* Quantity */}
                  <div className="cart-qty">
                    <button
                      className="cart-qty-btn"
                      disabled={item.Productquantity === 1}
                      onClick={() => handleDecrement(item._id)}
                    >
                      −
                    </button>

                    <span className="cart-qty-value">
                      {item.Productquantity}
                    </span>

                    <button
                      className="cart-qty-btn"
                      onClick={() => handleIncrement(item._id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Item Total Price */}
                <div>
                  <p className="cart-item-price">
                    ₹{Number(item.price) * Number(item.Productquantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="cart-footer">
            <button className="cart-btn cart-btn-continue">
              Continue Shopping
            </button>

           

            <Link to="/checkoutpage">
              <button className="cart-btn cart-btn-update">

                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
