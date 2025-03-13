import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Register.css'; // Import Register.css

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:9001/api/v1/user/register", // Adjust this according to your backend URL
        input
      );
      alert(res?.data?.message || "Registration successful");

      // Optionally, you can handle setting the role here or on login
      navigate("/login");  // Redirect to login page after successful registration
    } catch (error) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="text-center my-3">Sign Up Here</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={input.username}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              id="username"
              placeholder="Enter Name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              id="email"
              placeholder="Enter Email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              className="form-control"
              id="password"
              placeholder="Enter Password"
            />
          </div>

          <div className="form-group">
            <button type="submit" className="btn-primary btn-block">
              Sign Up
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <p>Already have an account?</p>
          <a href="/login" className="register-link">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
