import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


 function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, setSignup] = useState({});

  const inputValue = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  console.log(signup);

  const signupbtn = async(e) => {
     e.preventDefault();

    if (!signup.fullname || !signup.email || !signup.password || !signup.cpassword) {
      Swal.fire("Error", "All fields are required", "warning");
      return;
    }

  if (signup.password === signup.cpassword) {
            axios.post("http://localhost:8080/signup", {signup})
            .then((res) => {
              if (res.data.status) {
                Swal.fire({
                  title: "signup successfull!",
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
          }else{
             Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Password not match!",
          }
             )
  };
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className=" main bg-white shadow-xl p-8 rounded-2xl w-full max-w-md">

        <h2 className="text-3xl font-bold text-green-800 text-center mb-6">Create Account</h2>

        <form className="space-y-5">

          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullname"
              onChange={inputValue}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={inputValue}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>

          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                onChange={inputValue}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer"
              >
               <i className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          <div className="inputfield">
            <label className="block text-gray-700 font-medium mb-1">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="cpassword"
                onChange={inputValue}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer"
              >
              <i className={`fa-solid ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </span>
            </div>
          </div>

          <button
            type="submit"
            onClick={signupbtn}
            className="w-full  text-white  py-2 rounded-lg "
          >
            Create Account
          </button>
        </form>

        <p className="mt-5 text-center text-gray-600">
          Already have an account?
          <Link to="/login" className="text-green-600 ml-1 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );

};

export default Signup;
