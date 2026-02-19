import React, { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/Addproduct.css'
import axios from "axios";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import { Bell, User} from "lucide-react";

export default function AddProduct() {
  
  const [status, setStatus] = useState("active");
  const [addproduct, setAddproduct] = useState({})
  const [category, setCategory] = useState([]);

  let inputvalue = (e) => {
    setAddproduct(
      { ...addproduct, [e.target.name]: e.target.value }
    )
  }

  let addbtn = async (e) => {
    e.preventDefault();
    if(!addproduct.title || !addproduct.category|| !addproduct.code ||!addproduct.discription 
    || !addproduct.image ||!addproduct.weight ||!addproduct.price
    ){
       Swal.fire({
            icon: "warning",
            title: "Missing fields",
            text: "Please fill in all fields",
          });
    }else{
    try {
      const res = await axios.post(
        "https://freshcart-backend-one.vercel.app/addproduct",
        { addproduct }
      ).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "add data successfull!",
            text: "You clicked the button!",
            icon: "success"
          });
        }
      }).catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",

        });
      })
       window.location.reload()

    } catch (error) {
      console.error(error);
    }
  }
}

  useEffect(() => {
    axios.get("https://freshcart-backend-one.vercel.app/getcategory")
      .then((res) => {
        if (res.data.status) {
          setCategory(res.data.allcategory);
        }

      })
      .catch((err) => {
        console.error("API Error:", err);

      });
  }, []);


  return (
    <div className="home dashboard-layout">
      {/* Header Row */}
      <DashNav/>
      <div className="main">
         <nav className="navbar" id="dashtop-nav">
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

       <div className="page-header">
      <h1 className="page-title">Add Product</h1>

      <Link to="/ProductPage">
        <button className="btn back-btn">
          <ArrowLeft size={18} /> Back to Products
        </button>
      </Link>
    </div>

    {/* CONTENT GRID */}
    <div className="content-grid">
      
      {/* LEFT SIDE */}
      <div className="left-section">

        {/* Product Information */}
        <div className="card">
          <h2 className="card-title">Product Information</h2>

          <div className="form-grid">
            {/* Title */}
            <div className="form-group">
              <label>Product Title</label>
              <input
                type="text"
                placeholder="Enter product title"
                name="title"
                onChange={inputvalue}
                required
              />
            </div>

            {/* Category */}
            <div className="form-group">
              <label>Product Category</label>
              <select
                name="category"
                onChange={inputvalue}
                required
              >
                <option value="">Select Category</option>
                {category.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Code */}
            <div className="form-group">
              <label>Product Code</label>
              <input
                type="text"
                placeholder="#000123"
                name="code"
                onChange={inputvalue}
                required
              />
            </div>
          </div>
        </div>

        {/* Product Images & Description */}
        <div className="card">
          <h2 className="card-title">Product Images</h2>

          <div className="form-group">
            <input
              type="text"
              placeholder="Image path"
              name="image"
              onChange={inputvalue}
              required
            />
          </div>

          <h2 className="card-title">Product Description</h2>

          <div className="form-group">
            <textarea
              rows={5}
              placeholder="Write product description here..."
              name="discription"
              onChange={inputvalue}
              required
            ></textarea>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        {/* Status */}
        <div className="card">
          <h2 className="card-title">Status</h2>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={status === "active"}
                onChange={() => setStatus("active")}
              />
              Active
            </label>

            <label>
              <input
                type="radio"
                name="status"
                value="disabled"
                checked={status === "disabled"}
                onChange={() => setStatus("disabled")}
              />
              Disabled
            </label>
          </div>
        </div>

        {/* Product Price */}
        <div className="card">
          <h2 className="card-title">Product Price</h2>

          <div className="form-group">
            <label>Weight</label>
            <input
              type="text"
              placeholder="Enter weight"
              name="weight"
              onChange={inputvalue}
              required
            />
          </div>

          <div className="form-group">
            <label>Sale Price</label>
            <input
              type="number"
              placeholder="$0.00"
              name="price"
              onChange={inputvalue}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="button-group">
          <button className="btn primary-btn" onClick={addbtn}>
            Done
          </button>

          <button className="btn secondary-btn">
            Cancel
          </button>
        </div>
      </div>

    </div>
    </div>
    </div>
  );
}