// Logout.js
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearUser } from "../redux/authSlice"; // Import clearUser action

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      // Dispatch the clearUser action to reset user state
      dispatch(clearUser());

      // Optionally clear cookies on the server (if applicable)
      // await axios.post("http://localhost:8000/logout");
      // Redirect to the login page
      navigate("/login");
    };

    logout();
  }, [dispatch, navigate]);

  return <div>Logging out...</div>; // Or a loading spinner
};

export default Logout;
