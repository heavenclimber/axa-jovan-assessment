import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <Link to="/" className="home-button">
          Home
        </Link>
        <div>AXA - Jovan</div>
      </div>
    </div>
  );
};

export default TopBar;
