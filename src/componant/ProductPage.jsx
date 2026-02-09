import React, { useEffect, useState } from "react";
import { Bell, User, Edit, Trash } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import "../css/dashboard.css";

export default function ProductPage() {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.allproducts);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

   let removebtn = (data) => {
      
       axios.post("http://localhost:8080/removeitem", {data}).then((res) => {
         if (res.data.status) {
           Swal.fire({
             title: "Remove it!",
             
             icon: "success"
           });
         }
   
       })
     }

     let go =useNavigate();
    
     let editpage=(data)=>{
        go("/EditProduct",{state:data})
       
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
        <h2>Products</h2>
        <Link to="/AddProduct">
          <button className="add-btn">ADD PRODUCT</button>
        </Link>
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
                <th>Category</th>
                <th>Status</th>
                <th>Price</th>
                <th className="center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {product.map((p) => (
                <tr key={p._id}>
                  <td>
                    <img
                      src={p.image}
                      alt={p.title}
                      className="product-img"
                    />
                  </td>
                  <td className="name">{p.title}</td>
                  <td className="td">{p.category}</td>
                  <td>
                    <span
                      className={`status ${
                        p.status === "Available"
                          ? "available"
                          : "unavailable"
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="td">₹{p.price}</td>
                  <td className="actions">
                    <button className="edit-btn"
                    onClick={() => editpage(p)}>
                      <Edit size={18} /> 
                    </button>
                    <button className="removebtn"
                    onClick={() => removebtn(p)}>
                      <Trash size={18} /> 
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
        {product.map((p) => (
          <div key={p._id} className="card">
            <div className="card-top">
              <img
                src={p.image}
                alt={p.title}
              />
              <div>
                <h3>{p.title}</h3>
                <p>{p.category}</p>
              </div>
            </div>

            <div className="card-bottom">
              <span>₹{p.price}</span>
             <td className="actions">
                    <button className="edit-btn"
                    onClick={() => editpage(p)}>
                      <Edit size={18} /> 
                    </button>
                    <button className="removebtn"
                    onClick={() => removebtn(p)}>
                      <Trash size={18} /> 
                    </button>
                  </td>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
