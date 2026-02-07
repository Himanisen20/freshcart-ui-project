import React, { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/AddProduct.css'
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
        "http://localhost:8080/addproduct",
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

    } catch (error) {
      console.error(error);
    }
  }}
  useEffect(() => {
    axios.get("http://localhost:8080/getcategory")
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
        <h1 className="text-2xl text-green-800 font-semibold">Add Product</h1>

        <Link to="/ProductPage">
          <button className="back">
            <ArrowLeft size={18} /> Back to Products
          </button>
        </Link>
      </div>

    
      {/* CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-100 info">
          
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-6">

          {/* Product Information */}
          <div className=" p-6 bg-white rounded-lg shadow info ">
            <h2 className="text-lg font-semibold mb-4">Product Information</h2>

            
            <div className=" product-info">
              {/* Title */}
              <div className="inputs">
                <label className="font-medium">Product Title</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded  "
                  placeholder="Enter product title"
                  name="title"
                  onChange={inputvalue}
                  required/>
              </div>

              {/* Category */}
              <div className="inputs">
                <label className="font-medium">Product Category</label>
                <select className="w-full mt-1 p-4 border rounded "
                  name="category"
                  onChange={inputvalue}
                 required>
                  <option>Select Category</option>
                  {category.map((c) => (
                    <option key={c._id} value={c.name}>
                      {c.name}
                    </option>
                  ))}

                </select>
              </div>

              {/* Product Code */}
              <div className="inputs">
                <label className="font-medium">Product Code</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="#000123"
                  name="code"
                  onChange={inputvalue}
                 required/>
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-white p-6 rounded-lg shadow info">
            <h2 className="text-lg font-semibold mb-4">Product Images</h2>

            <label className=" bg-gray-100 w-full p-10 flex flex-col justify-center items-center cursor-pointer text-gray-600">
              <input
                type="text"
                className="w-full mt-1 p-2 border rounded"
                placeholder="image path"
                name="image"
                onChange={inputvalue}
              required />
            </label>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-lg shadow info">
            <h2 className="text-lg font-semibold mb-4">Product Description</h2>

            <textarea
              rows={5}
              className="w-full border rounded p-3"
              placeholder="Write product description here..."
              name="discription"
              onChange={inputvalue}
            required ></textarea>
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

          {/* Product Price */}
          <div className="bg-white p-6 rounded-lg shadow info ">
            <h2 className="text-lg font-semibold mb-4">Product Price</h2>

            <div className="space-y-4">
              <div>
                <label className="font-medium">weight</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="$0.00"
                  name="weight"
                  onChange={inputvalue}
                 required/>
              </div>

              <div>
                <label className="font-medium">Sale Price</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="$0.00"
                  name="price"
                  onChange={inputvalue}
                 required/>
              </div>
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
  );
}