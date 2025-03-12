// NotFound.js
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">
          Oops! The page you're looking for can't be found.
        </p>
        <Link to="/" className="not-found-link">
          Go back to the homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
