import React, { useState } from "react";
import "../assets/css/login.css"; // Use existing CSS for consistent styling
import { Link } from "react-router-dom";
import OTPInput from "./OTPInput"; // Import the OTPInput component

function OTPReset() {
  const [otpValue, setOtpValue] = useState("");
  const [isOTPVerified, setIsOTPVerified] = useState(false); // New state
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleOTPComplete = (otp) => {
    console.log("Completed OTP:", otp);
    setOtpValue(otp);
    // **IMPORTANT**: In a real application, you would *not*
    // immediately set isOTPVerified to true here.
    // Instead, you would send the OTP to your backend for verification.
    // Only set isOTPVerified to true *after* the backend confirms
    // that the OTP is valid.
    // For this example, we'll simulate a successful verification after a short delay.
    setTimeout(() => {
      setIsOTPVerified(true); // Simulate successful OTP verification
    }, 1000); // Simulate 1 second delay for verification
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your submission logic here
    // - Ensure newPassword and confirmNewPassword match
    // - Send newPassword to backend to reset (only if isOTPVerified is true)

    if (!isOTPVerified) {
      alert("Please verify the OTP first."); // Show an error message
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("Passwords do not match."); // Show an error message
      return;
    }

    console.log("Submitting:", {
      otp: otpValue,
      newPassword: newPassword,
      confirmNewPassword: confirmNewPassword,
    });

    // In a REAL application, you would now send newPassword to the backend
    // to reset the password.
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
                      alt="OTP Reset"
                      className="img-fluid img-login"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                          <span className="h1 fw-bold mb-0 logo-text">
                            Logo
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          OTP Verification
                        </h5>

                        <p className="mb-4">
                          Please enter the OTP sent to your email/phone.
                        </p>

                        <div className="form-outline mb-4">
                          <OTPInput
                            length={6}
                            onOTPComplete={handleOTPComplete}
                          />
                        </div>

                        {isOTPVerified && (
                          <>
                            <div className="form-outline mb-4">
                              <input
                                type="password"
                                id="form2ExampleNewPassword"
                                className="form-control form-control-lg rounded-input"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                              />
                            </div>
                          </>
                        )}

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="submit"
                            disabled={!isOTPVerified}
                          >
                            Reset Password
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

export default OTPReset;
