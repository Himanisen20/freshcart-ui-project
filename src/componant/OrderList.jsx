import React, { useEffect, useState } from "react";
import { Bell, User, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import "../css/dashboard.css";
import "../css/OrderList.css"

export default function OrderList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  let go = useNavigate();

  let ordersingle = (data) => {
    go("/ordersingle", { state: data })

  }



  useEffect(() => {
    axios
      .get("http://localhost:8080/getOrderBill")
      .then((res) => {
        if (res.data.status) {
          setData(res.data.alldata);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  let removebtn = (data) => {

    axios.post("http://localhost:8080/removeitem", { data }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Remove it!",

          icon: "success"
        });
      }

    })
  }



  return (
    <div className="page-container dashboard-layout">
      {/* NAVBAR */}

      <DashNav />
      <div className="main">
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
        <div className="page-header">
          <h2>ORDER LIST</h2>
        </div>

        {/* LOADING */}
        {loading && <p className="loading-text">Loading products...</p>}

        {/* TABLE VIEW */}
        {!loading && (
          <div className="table-wrapper">
            <table className="product-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Order Name</th>
                  <th>Customer</th>
                  <th>Date & Time</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>

                </tr>
              </thead>
              <tbody>
                {data.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.items[0]?.image}
                        alt={p.title}
                        className="product-img"
                      />
                    </td>

                    <td
                      className="name"
                      onClick={() => ordersingle(p)}
                    >
                      Order #{p._id.slice(-6)}
                    </td>

                    <td className="td">{p.address.firstname} {p.address.lastname}</td>
                    <td className="td">{p.date}</td>
                    <td className="td"> {p.paymentMode}</td>
                    <td className="td">₹{p.totalAmount}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* MOBILE VIEW */}
        {/* MOBILE VIEW */}
        <div className="mobile-cards">
          {data.map((order) => (
            <div key={order._id} className="card">

              {/* TOP */}
              <div className="card-top">
                <img
                  src={order.items[0]?.image}
                  alt="product"
                />

                <div>
                  <h3>Order #{order._id.slice(-6)}</h3>
                  <p>
                    {order.address.firstname} {order.address.lastname}
                  </p>
                </div>
              </div>

              {/* BOTTOM */}
              <div className="card-bottom">
                <span>₹{order.totalAmount}</span>

                <span className="status available">
                  {order.paymentStatus}
                </span>
              </div>

              {/* ITEMS (optional but useful on mobile) */}
              <div className="order-items">
                {order.items.map((item) => (
                  <p key={item._id}>
                    • {item.title} × {item.Productquantity}
                  </p>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
