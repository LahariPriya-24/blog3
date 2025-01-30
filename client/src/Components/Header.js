import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <Link className="navbar-brand text-white mx-3" to="/">
        Event Linker
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto text-white">
          <li className="nav-item">
            <Link className="nav-link text-white" to="/home">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white" to="/add-event">
              ➕ Add Event
            </Link>
          </li>
          {/* New "Events" link added here */}
          <li className="nav-item">
            <Link className="nav-link text-white" to="/events">
              📅 Events
            </Link>
          </li>
        </ul>
        <div className="div-inline mx-auto my-2 my-lg-0">
          {token ? (
            <>
              <button className="btn btn-light">Welcome: {username}</button>
              <button onClick={handleLogout} className="btn btn-light">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <button className="btn btn-light">Login</button>
              </Link>
              <Link to={"/register"}>
                <button className="btn btn-light">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
