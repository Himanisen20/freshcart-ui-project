import React, { useEffect, useState } from "react";
import { Bell, User, Edit, Trash } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import DashNav from "./Dashnav";
import "../css/dashboard.css";
import { ArrowLeft} from "lucide-react";

export default function EditCategory() {
 const [status, setStatus] = useState("active");
   
   const loc = useLocation();
   const [edit, setEdit] = useState(loc.state)
  

    let inputvalue = (e) => {
    setEdit(
      { ...edit, [e.target.name]: e.target.value }
    )
  }
  //
  let updatecategory = () => {
      axios.post("https://freshcart-backend-one.vercel.app/updateCategory", { edit }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "update category!",
            icon: "success"
          });
        }
  
      })
      window.location.reload();
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
                     value={edit.image}
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
                     value={edit.name}
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
                     value={edit.product}
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
                       onChange={() => setStatus("active")
                        
                       }
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
                 <button className=" btn primary-btn" onClick={updatecategory}>
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
