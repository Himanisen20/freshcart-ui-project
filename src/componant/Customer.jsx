import React, { useEffect, useState } from "react";
import { Bell, User} from "lucide-react";
import axios from "axios";
import "../css/Customer.css";
import "../css/PageProduct.css";
import Swal from "sweetalert2";
import "../css/dashboard.css";
import DashNav from "./Dashnav";
export default function ProductPage() {
  const [customer, setCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/customerlist")
      .then((res) => {
        if (res.data.status) {
          setCustomer(res.data.allcustomer);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });
  }, []);

   let removebtn = (data) => {
       console.log(data)
       axios.post("http://localhost:8080/removeitem", { data }).then((res) => {
         if (res.data.status) {
           Swal.fire({
             title: "Remove it!",
             
             icon: "success"
           });
         }
   
       })
     }

  return (
    <div className="page-container  dashboard-layout">
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
        <h2>Customer List</h2>
       
      </div>

      {/* LOADING */}
      {loading && <p className="loading-text">Loading products...</p>}

      {/* TABLE VIEW */}
      {!loading && (
        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email</th>
                <th>Contact</th>
                <th>Address</th>
            
              </tr>
            </thead>
            <tbody className="tbody">
              {customer.map((p) => (
                <tr key={p._id}>
                  <td className="name">{p.fullname} </td>
                  <td className="td">{p.email}</td>
                  <td className="td">{p.contact}</td>
                  <td className="td">{p.address}</td>
                
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MOBILE VIEW */}
      <div className="mobile-cards">
         {customer.map((p) => (
                <tr key={p._id}>
                  <td>{p.fullname} </td>
                  <td>{p.email}</td>
                  <td>{p.contact}</td>
                  <td>{p.address}</td>
                
                </tr>
              ))}
      </div>
    </div>
    </div>
  );
}
