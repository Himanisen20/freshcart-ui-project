import React, { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/Addproduct.css'
import axios from "axios";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import { Bell, User } from "lucide-react";

export default function EditProduct() {
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState([]);
  const loc = useLocation();
  const [edit, setEdit] = useState(loc.state)

  let inputvalue = (e) => {
    setEdit(
      { ...edit, [e.target.name]: e.target.value }
    )
  }

  let updateproduct = () => {
    axios.post("https://freshcart-backend-one.vercel.app/updateproduct", { edit }).then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "update product!",
          icon: "success"
        });
      }

    })
    window.location.reload();
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

        <div className="page-header">
          <h1 className="page-title">Add Product</h1>

          <Link to="/ProductPage">
            <button className="back-btn btn">
              <ArrowLeft size={18} /> Back to Products
            </button>
          </Link>
        </div>


        {/* CONTENT GRID */}
        <div className="content-grid">

          {/* LEFT SIDE */}
          <div className="left-section">

            {/* Product Information */}
            <div className=" card">
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
                    value={edit.title}
                  />
                </div>

                {/* Category */}
                <div className="form-group">
                  <label >Product Category</label>
                  <select
                    name="category"
                    onChange={inputvalue}
                    value={edit.category} required>
                    <option>Select Category</option>
                    {category.map((c) => (
                      <option key={c._id} value={c._name}>
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
                    value={edit.code}
                  />
                </div>
              </div>
            </div>

            {/* Product Images */}
            <div className="card">
              <h2 className="card-title">Product Images</h2>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="image path"
                  name="image"
                  onChange={inputvalue}
                  value={edit.image}
                />
              </div>
           

            {/* Description */}

            <h2 className="card-title">Product Description</h2>

            <div className="form-group">
              <textarea
                rows={5}
                className="w-full border rounded p-3"
                placeholder="Write product description here..."
                name="discription"
                onChange={inputvalue}
                value={edit.discription}
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
            <div className="card ">
              <h2 className="card-title">Product Price</h2>

              <div className="form-group">

                <label >weight</label>
                <input
                  type="text"
                  placeholder="$0.00"
                  name="weight"
                  onChange={inputvalue}
                  value={edit.weight}
                />
              </div>

              <div className="form-group">
                <label >Sale Price</label>
                <input
                  type="number"
                  placeholder="$0.00"
                  name="price"
                  onChange={inputvalue}
                  value={edit.price}
                />
              </div>
            </div>
             {/* Submit */}
        <div className="button-group">
          <button className="btn primary-btn"
            onClick={updateproduct}>
            Update
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