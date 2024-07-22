import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import "../styles/nav.css";

const SideNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    navigate("/login");
  };

  return (
    <div className="nav--container">
      <ul className="nav-ul">
        <li className={`nav-li ${location.pathname === "/home" && "active"}`}>
          <Link to="/home">Dashboard</Link>
        </li>
        <li className={`nav-li ${location.pathname === "/users" && "active"}`}>
          <Link to="/users">Users</Link>
        </li>
        <li className={`nav-li ${location.pathname === "/shop" && "active"}`}>
          <Link to="/shop">Shop</Link>
        </li>
        <li className={`nav-li ${location.pathname === "/dealer" && "active"}`}>
          <Link to="/dealer">Dealer</Link>
        </li>
      </ul>

      <div className="log-bo">
        <IconButton onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
      </div>
    </div>
  );
};

export default SideNav;
