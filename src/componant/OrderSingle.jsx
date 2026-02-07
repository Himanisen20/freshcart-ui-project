import React from "react";
import { Bell, User } from "lucide-react";
import "../css/OrderSingle.css";
import "../css/dashboard.css";
import DashNav from "./Dashnav";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSingle() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div>
        <h2>No order found</h2>
        <button onClick={() => navigate("/orderlist")}>
          Back to Orders
        </button>
      </div>
    );
  }

  return (
    <div className="order-page dashboard-layout">
      <DashNav />

      <div className="main">
        {/* NAV */}
        <nav className="navbar">
          <h2 className="logo">MyStore</h2>
          <input
            type="text"
            placeholder="Search Product..."
            className="search-input"
          />
          <div className="nav-icons">
            <Bell />
            <User />
          </div>
        </nav>

        {/* HEADER */}
        <div className="order-header">
          <div>
            <h2>Order Details</h2>
            <p className="breadcrumb">Dashboard / Orders / Order Single</p>
          </div>

          <button
            className="btn-green"
            onClick={() => navigate("/orderlist")}
          >
            Back to all orders
          </button>
        </div>

        {/* CARD */}
        <div className="order-card">
          {/* TOP */}
          <div className="order-top">
            <h3>
              Order ID: <span>{state._id}</span>
              <span className="badge">{state.paymentMode}</span>
            </h3>

            <div className="order-actions">
              <button className="btn-gray">Download Invoice</button>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="info-grid">
            {/* CUSTOMER */}
            <div>
              <h4>Customer Details</h4>
              <p>
                {state.address.firstname} {state.address.lastname}
              </p>
              <p>{state.address.email || "N/A"}</p>
              
            </div>

            {/* ADDRESS */}
            <div>
              <h4>Shipping Address</h4>
              <p>{state.address.address}</p>
              <p>
                {state.address.city}, {state.address.state}
              </p>
              <p>{state.address.zip}</p>
            </div>

            {/* ORDER */}
            <div>
              <h4>Order Info</h4>
              <p>Order ID: {state._id.slice(-6)}</p>
              <p>Order Date: {state.date}</p>
              <p>Order Total: ₹{state.totalAmount}</p>
            </div>
          </div>

          {/* ITEMS TABLE */}
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {state.items.map((item) => (
                <tr key={item._id}>
                  <td>{item.title}</td>
                  <td>₹{item.price}</td>
                  <td>{item.Productquantity}</td>
                  <td>
                    ₹{item.price * item.Productquantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* TOTALS */}
          <div className="totals">
            <p>
              Sub Total <span>₹{state.totalAmount}</span>
            </p>
            <p>
              Shipping Cost <span>₹0</span>
            </p>
            <p className="grand">
              Grand Total <span>₹{state.totalAmount}</span>
            </p>
          </div>

          {/* PAYMENT */}
          <div className="bottom">
            <div>
              <h4>Payment Info</h4>
              <p>{state.paymentMode}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
