import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  // If user is logged in, render the children (the component being protected)
  return children;
};

export default ProtectedRoute;
