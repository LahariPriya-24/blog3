import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import "./Login.css"; // Import custom styles

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9001/api/v1/user/login", // Adjust this according to your backend URL
        input
      );
      alert(res.data.message);
      // Save token, username, and role in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.name);
      localStorage.setItem("role", res.data.role);  // Store role
      navigate("/");  // Redirect to the homepage
      console.log(res.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card shadow-lg">
        <h2 className="text-center mb-4">Welcome Back</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="emailInput">
              <FaEnvelope className="input-icon" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              placeholder="Enter your email"
              id="emailInput"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="passwordInput">
              <FaLock className="input-icon" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              placeholder="Enter your password"
              id="passwordInput"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <a href="/register" className="register-link">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
