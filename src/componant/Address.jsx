import React, { useState } from "react";
import "../css/Address.css";
import Header from "./Header";
import axios from "axios";
import Swal from "sweetalert2";

export default function AddressForm({ onSave }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/addAddress",
      { formData }).then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "add details successfull!",
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

  return (
    <>
      <Header />
      <div className="address-form-container">
        <h2>Add Address</h2>

        <form className="address-form" >
          <div className="form-row">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Contact </label>
              <input
                type="number"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address Line</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Zip Code</label>
              <input
                type="text"
                name="zip"
                className="zip"
                value={formData.zip}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button type="submit" className="save-btn"
            onClick={handleSubmit}>
            Save Address
          </button>
        </form>
      </div>
    </>
  );
}
