import React, { useState, useEffect } from "react";
import "../assets/css/login.css";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import {
  resetPassword as resetPasswordEndpoint,
} from "../../src/config/config";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetPasswordToken, setResetPasswordToken] = useState("");
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const [searchParams] = useSearchParams(); // Use useSearchParams

  useEffect(() => {
    // Get the token and email from URL parameters
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (token) {
      setResetPasswordToken(token);
    }
    if (email) {
      setForgotPasswordEmail(email);
    }
  }, [searchParams]); // Dependency on searchParams

  const handleResetPassword = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords do not match.");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}${resetPasswordEndpoint}`, {
        email: forgotPasswordEmail,
        token: resetPasswordToken,
        new_password: newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Password reset successfully. You can now login.");
        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login");
        }, 3000);
      } else {
        setErrorMessage(response.data.message || "Failed to reset password.");
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Password reset failed:", error);
      let message = "Failed to reset password. Please try again.";

      if (error.response && error.response.data && error.response.data.message) {
          message = error.response.data.message;
      } else if (error.message) {
          message = error.message;
      }

      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container" id="login">
      <section className="vh-100 shorter-section">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-start h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="Reset Password"
                      className="img-fluid img-login"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                          <span className="h1 fw-bold mb-0 logo-text">
                            Logo
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          Reset Your Password
                        </h5>

                        <p className="mb-4">
                          Enter your new password below.
                        </p>

                         {successMessage && (
                            <div className="alert alert-success" role="alert">
                              {successMessage}
                            </div>
                          )}

                          {errorMessage && (
                            <div className="alert alert-danger" role="alert">
                              {errorMessage}
                            </div>
                          )}

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExampleNewPassword"
                            className="form-control form-control-lg rounded-input"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExampleConfirmPassword"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) =>
                              setConfirmNewPassword(e.target.value)
                            }
                            required
                            disabled={loading}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={handleResetPassword}
                            disabled={loading}
                          >
                            {loading ? "Resetting..." : "Reset Password"}
                          </button>
                        </div>

                        <div>
                          <Link to="/login">Back to Login</Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ResetPassword;