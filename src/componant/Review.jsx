import React, { useEffect, useState } from "react";
import { Bell, User, Trash } from "lucide-react";

import axios from "axios";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import "../css/dashboard.css";

export default function Reviewpage() {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);
  

 useEffect(() => {
    axios.get("http://localhost:8080/getreview") // <-- your API
      .then((res) => {
        if (res.data.status) {
          setReview(res.data.allreview); // API should return array
          setLoading(false);
        }

      })
      .catch((err) => {
        console.error("API Error:", err); s
        setLoading(false);
      });
  }, []);
 

   let removebtn = (data) => {
       console.log(data)
       axios.post("http://localhost:8080/removereview", { data }).then((res) => {
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

      <DashNav/>
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
        <h2>Reviews</h2>
       
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
                <th>Name</th>
                <th>Date</th>
                <th>City</th>
                <th>Review</th>
                <th>Action</th>
 </tr>
            </thead>
            <tbody>
              {review.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.reviewname}
                      className="product-img"
                    />
                  </td>
                  <td className="name">{p.reviewname}</td>
                  <td className="td">{p.reviewDate}</td>
                  <td className="td">{p.reviewcity}</td>
                  <td className="td">{p.reviewmsg}</td>

                  <td className="actions">
                    <button className="removebtn"
                    onClick={() => removebtn(p)}>
                      <Trash size={18} /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="mobile-cards">
        {review.map((p) => (
          <div key={p._id} className="card">
            <div className="card-top">
              <img
                src={`http://localhost:8080${p.image}`}
                alt={p.reviewname}
              />
              <div>
                <h3>{p.reviewname}</h3>
                <p>{p.reviewDate}</p>
              </div>
            </div>

            <div className="card-bottom">
              <span>{p.reviewcity}</span>
              <span>{p.reviewmsg}</span>
             
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
