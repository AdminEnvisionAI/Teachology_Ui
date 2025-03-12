// EnterIdentifier.js
import React, { useState } from "react";
import "../assets/css/login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function EnterIdentifier() {
  const [identifier, setIdentifier] = useState(""); // Can be email or mobile
  const navigate = useNavigate();
  const [identifierError, setIdentifierError] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [alertVariant, setAlertVariant] = useState("danger"); // 'success' or 'danger'

  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const sendOtpEndpoint = "/send-otp"; // Replace with your actual endpoint

  const validateIdentifier = () => {
    if (!identifier) {
      setIdentifierError("Email or Mobile Number is required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/; // Assumes 10 digits for phone number

    if (!emailRegex.test(identifier) && !phoneRegex.test(identifier)) {
      setIdentifierError("Invalid email or mobile number format.");
      return false;
    }

    setIdentifierError("");
    return true;
  };

  const sendOtp = async () => {
    if (!validateIdentifier()) return;

    setLoading(true);
    setErrorMessage("");
    setSuccessMessage(""); // Clear success message
    setIsOtpSent(false);
    setAlertVariant("danger");

    try {
      const payload = identifier.includes("@")
        ? { email: identifier }
        : { phone: identifier };

      const response = await axios.post(`${apiUrl}${sendOtpEndpoint}`, payload);
      if (response.data.status === 200) { //Adapt based on actual response
        setIsOtpSent(true);
        setSuccessMessage("OTP sent successfully!"); // Set success message
        setAlertVariant("success"); // Set alert to green
        setTimeout(() => {
          setSuccessMessage("");
        }, 5000);

          navigate("/verify-mobile-otp", { state: { identifier: identifier } }); // Pass identifier
      } else {
        setErrorMessage(response.data.message);
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response);
      let message = "Failed to send OTP. Please try again.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }

      setErrorMessage(message);
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      setIsOtpSent(false);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-container">
      <section className="vh-100 shorter-section">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-start h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="Enter Email or Mobile Number"
                      className="img-fluid img-login"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default submission */}
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                          <span className="h1 fw-bold mb-0 logo-text">
                            Logo
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          Enter Email or Mobile Number
                        </h5>

                        <p className="mb-4">
                          Please enter your email or mobile number to receive an
                          OTP for login.
                        </p>

                        {successMessage && (
                          <div className={`alert alert-${alertVariant}`} role="alert">
                            {successMessage}
                          </div>
                        )}
                        {errorMessage && (
                          <div className={`alert alert-danger`} role="alert">
                            {errorMessage}
                          </div>
                        )}

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="identifier"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email or Mobile Number"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                           />
                          {identifierError && (
                            <div className="text-danger">{identifierError}</div>
                          )}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={sendOtp}
                            disabled={loading || isOtpSent} // Disable after OTP is sent or while loading
                          >
                            {loading
                              ? "Sending OTP..."
                              : isOtpSent
                              ? "OTP Sent"
                              : "Send OTP"}
                          </button>
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

export default EnterIdentifier;