import React, { useEffect, useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import '../css/AddProduct.css'
import axios from "axios";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import { Bell, User} from "lucide-react";

export default function EditProduct() {
  const [status, setStatus] = useState("active");
  const [category, setCategory] = useState([]);
  const loc =useLocation();
    const[edit,setEdit]=useState(loc.state)
   
   let inputvalue=(e) => {
 setEdit(
      { ...edit,[e.target.name]:e.target.value }
    )
  }
  
  let updateproduct=()=>{
      axios.post("http://localhost:8080/updateproduct",{edit}).then((res) => {
               if (res.data.status) {
                 Swal.fire({
                   title:"update product!",
                  icon: "success"
                 });
               }
         
             })
     }

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
    <div className=" home p-5 md:p-10 bg-gray-50 min-h-screen dashboard-layout">
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
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Add Product</h1>

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

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="font-medium label">Product Title</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
                  placeholder="Enter product title"
                  name="title"
                  onChange={inputvalue}
                  value={edit.title}
                />
              </div>

              {/* Category */}
              <div>
                <label className="font-medium">Product Category</label>
                <select className="w-full mt-1 p-2 border rounded focus:ring focus:ring-blue-300"
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
              <div>
                <label className="font-medium">Product Code</label>
                <input
                  type="text"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="#000123"
                  name="code"
                  onChange={inputvalue}
                   value={edit.code}
                />
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
                   value={edit.image}
                />
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
               value={edit.discription}
            ></textarea>
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
                  value={edit.weight}
                />
              </div>

              <div>
                <label className="font-medium">Sale Price</label>
                <input
                  type="number"
                  className="w-full mt-1 p-2 border rounded"
                  placeholder="$0.00"
                  name="price"
                  onChange={inputvalue}
                   value={edit.price}
                />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="bg-white p-6 rounded-lg shadow">
            <button className="w-full bg-blue-600 hover:bg-blue-700
             text-white py-2 rounded-md font-semibold"
             onClick={updateproduct}>
              Update
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