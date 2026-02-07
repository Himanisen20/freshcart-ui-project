import React, { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/AddProduct.css'
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
     axios.post("http://localhost:8080/addCategory", { addcategory})
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
    <div className=" home dashboard-layout">
      {/* Header Row */}

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
      <div className="flex justify-between items-center mb-8 top">
        <h1 className="text-2xl font-semibold text-green-800">Add Category</h1>

        <Link to="/category">
          <button className="back">
            <ArrowLeft size={18} /> Back to category page
          </button>
        </Link>
      </div>


      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-100 info">

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Product Information */}
          <div className=" p-6 bg-white rounded-lg shadow info ">
            <h2 className="text-lg font-semibold mb-4">Category Information</h2>

            <div className="space-y-4">

                  {/* Product Images */}
              <div >
                <label className="font-medium label">Image</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                  placeholder="Enter product title"
                  name="image"
                  onChange={inputvalue}
                required/>
              </div>
              {/* Title */}
              <div>
                <label className="font-medium label">Category</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                  placeholder="Enter product title"
                  name="name"
                  onChange={inputvalue}
                 required/>
              </div>

              {/* Product Code */}
              <div>
                <label className="font-medium">Product</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="#000123"
                  name="product"
                  onChange={inputvalue}
                 required/>
              </div>
            </div>
          </div>


        {/* RIGHT SIDE */}
        <div className="space-y-6">

          {/* Status */}
          <div className="bg-white p-6 rounded-lg shadow info">
            <h2 className="text-lg font-semibold mb-4">Status</h2>

            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={status === "active"}
                  onChange={() => setStatus("active")}
                />
                Active
              </label>

              <label className="flex items-center gap-2">
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


          {/* Submit */}
          <div className="bg-white p-6 rounded-lg shadow">
            <button className="w-full bg-blue-600 hover:bg-blue-700
             text-white py-2 rounded-md font-semibold"
             onClick={addbtn}>
              Done
            </button>

            <button className="w-full mt-3 text-white py-2 rounded-md hover:bg-gray-100">
              Cancel
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  );
}