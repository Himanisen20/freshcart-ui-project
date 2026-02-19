import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import "../css/login.css"
import Swal from "sweetalert2";


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState({});

  let inputValue = (e) => {
    setLogin(
      { ...login, [e.target.name]: e.target.value })
  }
  console.log(login);

  let loc = useNavigate();

  let loginbtn= (e) => {
     e.preventDefault();

  // Basic validations
  if (!login.email || !login.password) {
    Swal.fire({
      icon: "warning",
      title: "Missing fields",
      text: "Please fill in all fields",
    });
    return;
  }
    
    axios.post("http://localhost:8080/login", {login})
   .then((res) => {
      if (res.data.status) {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
        });
        loc("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "User not found!",
        });
        loc("/Signup")
      }
    })
    .catch((err) => {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
      });
      console.error(err);
    });

  }

  return (
    < div className="  min-h-screen flex items-center justify-center bg-gray-200">
      <div className=" main bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">

        < h2 className="text-3xl font-bold  text-center mb-6">Welcome Back</h2>

        <form className="space-y-5">

          {/* Email */}
          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={inputValue}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required/>
          </div>

          {/* Password */}
          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                name="password"
                onChange={inputValue}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required/>

              {/* Toggle icon */}
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <i className="fa-solid fa-eye-slash"></i>
                ) : (
                  <i className="fa-solid fa-eye"></i>
                )}
              </span>
            </div>
          </div>

          {/* Forgot Password */}
          <Link to="/resetpass">
          <p className="text-right text-green-800 cursor-pointer hover:underline">
            Forgot Password?
          </p>
          </Link>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full  text-white font-semibold py-2  transition"
            onClick={loginbtn}>
            Login
          </button>

        </form>

        {/* Signup Link */}
        <p className="mt-5 text-center text-gray-600">
          Don’t have an account?
          <Link to="/signup">
            <span className="text-green-800 cursor-pointer hover:underline ml-1">
              Sign Up
            </span>
          </Link>
        </p>

      </div>
    </div>
  );
}
