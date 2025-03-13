import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaCalendarAlt, FaSignInAlt, FaUserPlus } from "react-icons/fa";
import "./Header.css"; // Import custom styles

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("Logout successful");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
      <Link className="navbar-brand text-dark mx-3" to="/">
        Event Linker
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/home">
              <FaHome className="nav-icon" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/add-event">
              <FaPlus className="nav-icon" /> Add Event
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/events">
              <FaCalendarAlt className="nav-icon" /> My Events
            </Link>
          </li>
         
        </ul>
        <div className="d-flex ml-auto">
          {token ? (
            <>
              <button className="btn btn-light me-2 welcome-btn">
                Welcome, {username}
              </button>
              <button onClick={handleLogout} className="btn btn-danger logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="btn btn me-2 login-btn">
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to="/register">
                <button className="btn btn register-btn">
                  <FaUserPlus /> Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
