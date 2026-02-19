import React, { useEffect, useState } from "react";
import "../css/checkout.css";
import "../css/cart.css";
import Header from "./Header";
import { Link, NavLink } from "react-router-dom";
import { Edit, Trash } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Checkout() {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [allitem, setAllitems] = useState([]);
  const [paymentMode, setPaymentMode] = useState("");

  /* ================= GET CART ITEMS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/addcartlist")
      .then((res) => {
        if (res.data.status) {
          const normalizedItems = res.data.allcartitem.map((item) => ({
            ...item,
            price: Number(item.price) || 0,
            Productquantity:
              item.Productquantity && Number(item.Productquantity) > 0
                ? Number(item.Productquantity)
                : 1, // ✅ minimum quantity
          }));

          setAllitems(normalizedItems);
        }
      })
      .catch((err) => console.error("Cart API Error:", err));
  }, []);

  /* ================= GET ADDRESS ================= */
  useEffect(() => {
    axios
      .get("http://localhost:8080/getaddress")
      .then((res) => {
        if (res.data.status) {
          setAddresses(res.data.alldata);
        }
      })
      .catch((err) => console.error("Address API Error:", err));
  }, []);

  /* ================= QUANTITY HANDLERS ================= */
  const handleIncrement = (id) => {
    setAllitems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, Productquantity: item.Productquantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (id) => {
    setAllitems((prev) =>
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

  /* ================= TOTAL AMOUNT ================= */
  const totalAmount = allitem.reduce(
    (acc, item) => acc + item.price * item.Productquantity,
    0
  );

  /* ================= PAYMENT ================= */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedAddress) {
      Swal.fire({ title: "Select address first!", icon: "warning" });
      return;
    }

    if (totalAmount <= 0) {
      Swal.fire({ title: "Cart is empty!", icon: "warning" });
      return;
    }

    if (!paymentMode) {
  Swal.fire({ title: "Select payment mode!", icon: "warning" });
  return;
}

    const shipping_address = addresses.find(
      (addr) => addr._id === selectedAddress
    );

    const options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Fresh Cart",
      description: "Order Payment",
      handler: function (response) {
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Shipping Address:", shipping_address);

        Swal.fire({
          title: "Payment Successful!",
          icon: "success",
        });
      },
      theme: { color: "#0aad0a" },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  //edit address 
  let editpage = (data) => {
    console.log(data)
    axios.post("http://localhost:8080/editAddress", { data })
      .then((res) => {
        if (res.data.status) {
          Swal.fire({ title: "update product!", icon: "success" });
        }
      })
  }

  /* ================= REMOVE ADDRESS ================= */
  const removebtn = (data) => {
    axios.post("http://localhost:8080/removeaddress", { data }).then((res) => {
      if (res.data.status) {
        Swal.fire({ title: "Removed!", icon: "success" });
      }
    });
  };

  /* ================= add bill detaill ================= */
  const allbillbtn = (e) => {
    e.preventDefault();

    if (!paymentMode) {
    Swal.fire({ title: "Select payment mode!", icon: "warning" });
    return;
  }
    axios.post("http://localhost:8080/createOrder", {
      allitem,
      address: selectedAddress,
      totalAmount,
      paymentMode,
    }).then((res) => {
      if (res.data.status) {
        Swal.fire({ title: "order success!", icon: "success" });
      }
    });
  };

  return (
    <>
      <Header />

      <div className="checkout-container">
        {/* LEFT - CART */}
        <div className="cart-wrapper cart-section">
          <div className="cart-container">
            <div className="checkout-header">
              <div>
                <h2>Shop Cart</h2>
                <p className="cart-location">Location in 382480</p>
              </div>
              <button className="cart-close-btn">
                <NavLink to="/">×</NavLink>
              </button>
            </div>

            <div className="cart-items">
              {allitem.map((item) => (
                <div className="check-item" key={item._id}>
                  <div className="cart-item-left">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-img"
                    />
                    <div>
                      <h4 className="cart-item-name">{item.title}</h4>
                      <p className="cart-item-weight">{item.category}</p>
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

            <div className="cart-footer">
              <Link to="/cart">
                <button className="cart-btn cart-btn-continue">
                  Back to Cart
                </button>
              </Link>
              <span>
                <select
                  className="status"
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                >
                  <option value="">Select mode</option>
                  <option value="stripe">Stripe</option>
                  <option value="upi">UPI</option>
                  <option value="cod">COD</option>
                </select>

              </span>
              <span>Total: ₹{totalAmount}</span>
            </div>
          </div>
        </div>

        {/* RIGHT - ADDRESS */}
        <div className="address-section">
          <div className="address-header">
            <h2>Delivery Address</h2>
            <Link to="/Address">
              <button className="add-btn">+ Add Address</button>
            </Link>
          </div>

          {addresses.length === 0 && (
            <p className="empty-text">No address added</p>
          )}

          {addresses.map((addr) => (
            <label className="address-card checkout-card" key={addr._id}>
              <div className="add-info">
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress === addr}
                  onChange={() => setSelectedAddress(addr)}
                />

                <div className="address-info">
                  <span className="name">{addr.firstname}</span>{" "}
                  <span className="name">{addr.lastname}</span>
                  <h4>{addr.address}</h4>
                  <span>{addr.city}</span>, <span>{addr.state}</span>
                  <h4>{addr.zip}</h4>
                </div>
              </div>

              <div className="btn-info">
                <button className="edit-btn ad-btn" onClick={() => editpage(addr)}>
                  <Edit size={18} /> </button>
                <button className="removebtn" onClick={() => removebtn(addr)}>
                  <Trash size={18} />
                </button>
              </div>
            </label>
          ))}

          <button className="cart-btn cart-btn-update" onClick={handleSubmit}>
            Proceed Payment
          </button>
          <button className="cart-btn cart-btn-update" onClick={allbillbtn}>
            Print bill
          </button>
        </div>
      </div>
    </>
  );
}
