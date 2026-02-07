// src/AuthPage.jsx
import React, { useState } from "react";
import '../css/AuthPage.css'

const AuthPage = () => {
  const [mode, setMode] = useState("login"); // "login" or "signup"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      // TODO: login API call
      alert("Login form submitted");
    } else {
      // TODO: signup API call
      alert("Signup form submitted");
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <button
            className={`auth-tab ${mode === "login" ? "active" : ""}`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`auth-tab ${mode === "signup" ? "active" : ""}`}
            onClick={() => setMode("signup")}
          >
            Signup
          </button>
        </div>

        <h2 className="auth-title">
          {mode === "login" ? "Welcome Back 👋" : "Create Account 🛒"}
        </h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="Enter your name" required />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" required />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="********" required />
          </div>

          {mode === "signup" && (
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="********" required />
            </div>
          )}

          {mode === "login" && (
            <div className="form-row">
              <label className="remember">
                <input type="checkbox" /> Remember me
              </label>
              <button type="button" className="link-btn">
                Forgot password?
              </button>
            </div>
          )}

          <button type="submit" className="auth-btn">
            {mode === "login" ? "Login" : "Create Account"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login" ? "Don't have an account? " : "Already a member? "}
          <button
            type="button"
            className="link-btn"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
          >
            {mode === "login" ? "Signup" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
