import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:9001/api/v1/user/login",
        input
      );
      alert(res.data.message);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("username",res.data.name);
      navigate("/");
      console.log(res.data);
    } catch(error){
      alert(error.response.data.message);
    }
  };

      
  

  return (
    <>
      <div className="container shadow">
        <h2 className="text-center my-3">Log into your Account</h2>
        <div className="col-md-12 my-3 d-flex items-center justify-content-center">
          <div className="row">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="emailInput" className="form-label">
                  Email
                </label>
                <input
                  type="email" // Corrected: Use 'email' for email input
                  name="email"
                  value={input.email}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control"
                  placeholder="Enter Email"
                  id="emailInput"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password" // Corrected: Use 'password' for password input
                  name="password"
                  value={input.password}
                  onChange={(e) =>
                    setInput({ ...input, [e.target.name]: e.target.value })
                  }
                  className="form-control"
                  placeholder="Enter Password"
                  id="passwordInput"
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
