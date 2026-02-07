import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ResetPassword = () => {
    const [reset, setReset] = useState({});

    let inputValue=(e) => {
        setReset(
     { ...reset, [e.target.name]: e.target.value })
    }
    console.log(reset);

    const handleSubmit = (e) => {
  e.preventDefault();

  if (reset.password === reset.cpassword) {
    axios.post("http://localhost:8080/resetpassword", {
      email: reset.email,
      password: reset.password
    })
    .then(res => {
      if (res.data.status) {
        Swal.fire({
                         title: "reset password successfull!",
                          icon: "success"
                        });
      } else {
         Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!"  })
                    
      }
    })
    .catch(err => {
       Swal.fire({
                      icon: "error",
                      title: "Oops...",
                      text: "Server error!"})
    });

  } else {
     Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "password not match!"})
  }
};

  
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className=" main bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-green-900 mb-4">
                    Reset Password
                </h2>


                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div className="mb-4 inputfield">
                        <label className="block text-gray-700 text-sm mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            onChange={inputValue}
                            required />
                    </div>

                    {/* New Password */}
                    <div className="mb-4 inputfield">
                        <label className="block text-gray-700 text-sm mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                            name="password"
                            onChange={inputValue}
                            required />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-6 inputfield">
                        <label className="block text-gray-700 text-sm mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm new password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                            name="cpassword"
                            onChange={inputValue}
                            required />
                    </div>

                    <button
                        type="submit"
                        className="w-full  text-white py-2 rounded-md  transition"
                    >
                        Update Password
                    </button>
                </form>

                <div className="text-center mt-4">
                    <Link to="/login"
                        className="text-green-600 text-sm hover:underline">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
