import { Link } from "react-router-dom";
import React from "react";
import "./navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar_pages">
        <Link to="/">Home</Link>
        <Link to="/new">New job add</Link>
      </div>
      <div className="navbar_registration">
        <Link to="/login">Login</Link>
        <Link to="/register">Sign up</Link>
      </div>
    </div>
  );
};

export default Navbar;
