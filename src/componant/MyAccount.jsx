import React, { useEffect, useState } from "react";
import "../css/MyAccount.css";
import axios from "axios";
import Swal from "sweetalert2";

const MyAccount = () => {
  const [formData, setFormData] = useState({});
  const [allusers, setallusers] = useState([]);
  const [remove, setremove] = useState({});
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    console.log(formData)
  };

   
// filter -------------------------
  
  
    useEffect(() => {
      axios.get("http://localhost:8080/customerlist") // <-- your API
        .then((res) => {
          if (res.data.status) {
            setallusers(res.data.allcustomer); // API should return array
            console.log(allusers);
          }
  
        })
        .catch((err) => {
          console.error("API Error:", err);
  
        });
    }, []);

   useEffect(() => {
  if (!formData.email) return;

  const user = allusers.find(
    (u) => u.email === formData.email
  );

  if (user) {
    setFormData((prev) => ({
      ...prev,
      fullname: user.fullname,
      contact: user.contact,
      address: user.address
    }));
  }
}, [formData.email, allusers]);

  const handleSave = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/updatecustomer",{formData}).then((res)=>{
      if (res.data.status) {
             Swal.fire({
               title: "update user detail!",
               icon: "success"
             });
           }
    })
    
    // connect to backend here
  };

 const handleDelete = () => {
  axios
    .post("http://localhost:8080/deleteuser", { email: formData.deleteEmail,})
    .then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Account Deleted Successfully!",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "User not found",
          icon: "error",
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};


  return (
    <div className="account-container">
      <form className="account-card" onSubmit={handleSave}>
        <h2>Account Details</h2>

         <div className="form-group">
          <label> Firstly Enter Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
        />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Enter your name"
            value={formData.fullname}
            onChange={handleChange}
          />
        </div>

       

        <div className="form-group">
          <label>Contact No.</label>
          <input
            type="tel"
            name="contact"
            placeholder="Enter your phone number"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
         <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter your Address/city"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            placeholder="Enter new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="save-btn">
          Save Changes
        </button>

        <hr />

        <div className="delete-section">
          <h3>Delete Account</h3>
          <p>Please enter your email to confirm account deletion.</p>

          <input
            type="email"
            name="deleteEmail"
            placeholder="Confirm email"
            value={formData.deleteEmail}
            onChange={handleChange}
          />

          <button
            type="button"
            className="delete-btn"
            onClick={handleDelete}
          >
            I want to delete my account
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyAccount;
