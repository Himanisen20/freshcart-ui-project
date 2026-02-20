import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/Addproduct.css'
import axios from "axios";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import { Bell, User} from "lucide-react";

export default function AddCategory() {
  const [status, setStatus] = useState("active");
  const [addcategory, setAddcategory] = useState({})

 let inputvalue = (e) => {
 setAddcategory(
      { ...addcategory, [e.target.name]: e.target.value }
    )
  }
 
let addbtn = async (e) => {
    e.preventDefault();
    if(!addcategory.image || !addcategory.name || !addcategory.product){
        Swal.fire({
              icon: "warning",
              title: "Missing fields",
              text: "Please fill in all fields",
            });
            return;
    }
    else{
     axios.post("https://freshcart-backend-one.vercel.app/addCategory", { addcategory})
    .then((res) => {
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
        }

  }


  return (
    <div className="dashboard-layout home">
      <DashNav />

      <div className="main">
        {/* Top Navbar */}
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

        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Add Category</h1>

          <Link to="/category">
            <button className="back-btn btn">
              <ArrowLeft size={18} /> Back to category page
            </button>
          </Link>
        </div>

        {/* Content Section */}
        <div className="content-grid">
          {/* LEFT SIDE */}
          <div className="left-section">
            <div className="card">
              <h2 className="card-title">Category Information</h2>

              <div className="form-group">
                <label>Image</label>
                <input
                  type="text"
                  placeholder="Enter image"
                  name="image"
                  onChange={inputvalue}
                  required
                />
              </div>

              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  placeholder="Enter Category name"
                  name="name"
                  onChange={inputvalue}
                  required
                />
              </div>

              <div className="form-group">
                <label>Product</label>
                <input
                  type="number"
                  placeholder="#000123"
                  name="product"
                  onChange={inputvalue}
                  required
                />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="right-section">
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

            <div className="button-group">
              <button className=" btn primary-btn" onClick={addbtn}>
                Done
              </button>

              <button className=" btn secondary-btn">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}