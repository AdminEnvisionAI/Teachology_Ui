import React, { useState } from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";
import {
  forgotPassword as forgotPasswordEndpoint,
} from "../../src/config/config";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleRequestResetLink = async () => {
    setLoading(true); // Set loading to true when the request starts
    setErrorMessage(""); // Clear any existing error messages
    setSuccessMessage(""); // Clear any existing success messages

    try {
      const response = await fetch(`${apiUrl}${forgotPasswordEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      const data = await response.json();

      if (response.status === 200) { // Check response.status instead of data.status
        setSuccessMessage(
          "A password reset link has been sent to your email address."
        );
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);
      } else {
        // Handle non-200 status codes
        setErrorMessage(data.message || "Failed to request password reset."); // Use data.message if available
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Forgot password request failed:", error);
      let message = "Failed to request password reset. Please try again.";

      //Improved error handling: use error.message for a basic error message
      if (error.message) {
        message = error.message;
      }
      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } finally {
      setLoading(false); // Set loading to false when the request finishes (success or failure)
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
                      alt="Forgot Password"
                      className="img-fluid img-login"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                          <span className="h1 fw-bold mb-0 logo-text">
                            Logo
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          Forgot Password?
                        </h5>

                        <p className="mb-4">
                          Enter your email address below and we'll send you
                          instructions on how to reset your password.
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
                            type="email"
                            id="form2ExampleEmail"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading} // Disable input while loading
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={handleRequestResetLink}
                            disabled={loading} // Disable button while loading
                          >
                            {loading ? "Sending..." : "Reset Password"}
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

export default ForgotPassword;