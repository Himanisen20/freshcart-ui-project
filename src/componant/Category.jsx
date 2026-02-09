import React, { useEffect, useState } from "react";
import { Bell, User, Edit, Trash, SprayCanIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import "../css/dashboard.css";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);



  let categoryfilter=category.filter(data=> data.name=="Snacks")
  console.log(categoryfilter)

  //  let categoryfilter=category.filter(data=> data.name=="Snacks")
  // console.log(categoryfilter)
  
// 🔹 Fetch Products
  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => {
        if (res.data.status) {
          setProducts(res.data.allproducts);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  useEffect(() => {
    axios
      .get("http://localhost:8080/getcategory")
      .then((res) => {
        if (res.data.status) {
          setCategory(res.data.allcategory);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

  let removebtn = (data) => {
    axios.post("http://localhost:8080/removecategory", { data }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Remove it!",

          icon: "success"
        });
      }

    })
  }

  

  let go = useNavigate();

  let editpage = (data) => {
    go("/EditProduct", { state: data })

  }

  return (
    <div className="page-container dashboard-layout">
      {/* NAVBAR */}

      <DashNav />
      <div className="main">
        <nav className="navbar">
          <h2 className="logo">Category</h2>

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
          <Link to="/addcategory">
            <button className="add-btn">ADD Category</button>
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
                  <th>Icon</th>
                  <th>Name</th>
                  <th>product</th>
                  <th>Status</th>
                  <th className="center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {category.map((p) => (
                  <tr key={p._id}>
                    <td>
                      <img
                        src={p.image}
                        alt={p.name}
                        className="product-img"
                      />
                    </td>
                    <td>{p.name}</td>
                    <td>
                      {/* {categoryfilter.length} */}
                       {
                        products.filter(
                          product => product.category === p.name
                        ).length
                      }
                    </td>
                    <td>
                      <span
                        className={`status ${p.status === "Available"
                            ? "available"
                            : "unavailable"
                          }`}
                      >
                        {p.status}
                      </span>
                    </td>

                    <td className="actions">
                      <button className="edit-btn"
                        onClick={() => editpage(p)}>
                        <Edit size={18} /> Edit
                      </button>
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
          {category.map((p) => (
            <div key={p._id} className="card">
              <div className="card-top">
                <img
                  src={p.image}
                  alt={p.title}
                />
                <div>
                  <h3>{p.name}</h3>
                  <p>
                      {/* {categoryfilter.length} */}
                       {
                        products.filter(
                          product => product.category === p.name
                        ).length
                      }
                    </p>
                </div>
              </div>

              <div className="card-bottom">
                
                <span className="actions">
                      <button className="edit-btn"
                        onClick={() => editpage(p)}>
                        <Edit size={18} /> Edit
                      </button>
                      <button className="removebtn"
                        onClick={() => removebtn(p)}>
                        <Trash size={18} /> Delete
                      </button>
                    </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
