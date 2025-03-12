// VerifyMobileOTP.js
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import "../assets/css/login.css"; // For consistent styling
import "../assets/css/OTPInput.css"; //  A separate CSS file for OTP specific styling
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice"; // Import redux functions
import { Form } from "react-bootstrap";

function VerifyMobileOTP() {
  const length = 6; // OTP length, can be dynamic in the future
  const [otp, setOtp] = useState(""); // Changed to single string
  const navigate = useNavigate();
  const location = useLocation();
  const identifier = location.state?.identifier; // Get the identifier
  const dispatch = useDispatch(); // redux dispatch
  const otpInputRefs = useRef([]);
  const [loading, setLoading] = useState(false); //Added loading
  const [errorMessage, setErrorMessage] = useState(""); //Added error message
  const [successMessage, setSuccessMessage] = useState(""); //Added success message
  const [alertVariant, setAlertVariant] = useState("danger"); //Added alertVariant
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const verifyOtpEndpoint = "/verify-otp"; // Replace with your actual endpoint

  useEffect(() => {
    otpInputRefs.current = Array(6).fill(null).map(() => React.createRef());
  }, []);

  const handleOtpChange = useCallback(
    (value, index) => {
      if (!/^\d*$/.test(value)) {
        return;
      }

      const newOtp = otp.split("");
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      if (value && index < 5 && otpInputRefs.current[index + 1]) {
        otpInputRefs.current[index + 1].focus();
      }
    },
    [otp]
  );

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!e.target.value && index > 0) {
        otpInputRefs.current[index - 1].focus();
        const newOtp = otp.split("");
        newOtp[index - 1] = "";
        setOtp(newOtp.join(""));
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");

    if (pastedData.length === 6 && /^\d+$/.test(pastedData)) {
      const pastedOtp = pastedData.split("");
      setOtp(pastedOtp.join(""));

      pastedOtp.forEach((digit, index) => {
        if (otpInputRefs.current[index]) {
          otpInputRefs.current[index].value = digit;
        }
      });

      if (otpInputRefs.current[5]) {
        otpInputRefs.current[5].focus();
      }
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage(""); // Clear success message
    setAlertVariant("danger");

    try {
      const payload = identifier.includes("@")
        ? { email: identifier, otp }
        : { phone: identifier, otp };

      const response = await axios.post(
        `${apiUrl}${verifyOtpEndpoint}`,
        payload,
        {
          withCredentials: true,
        }
      );
      dispatch(
        setUser({
          user: identifier,
          token: response.data.access_token,
          username: response.data.username,
          profile_image: response.data.profile_image,
          user_id: response.data.user_id,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Error verifying OTP:", error.response);
      let message = "Failed to verify OTP. Please try again.";

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
                      alt="Verify OTP"
                      className="img-fluid img-login"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={(e) => e.preventDefault()}>
                        {" "}
                        {/* Prevent default submission */}
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 logo-icon"></i>
                          <span className="h1 fw-bold mb-0 logo-text">
                            Logo
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          Verify OTP
                        </h5>

                        {identifier && (
                          <p className="mb-4">
                            Enter the 6-digit OTP sent to {identifier}.
                          </p>
                        )}

                        {errorMessage && (
                          <div className={`alert alert-danger`} role="alert">
                            {errorMessage}
                          </div>
                        )}

                        {/* OTP Input Fields */}
                        <div className="otp-container">
                          {Array(6)
                            .fill()
                            .map((_, index) => (
                              <Form.Control
                                key={index}
                                type="text"
                                maxLength="1"
                                className="otp-input mx-1"
                                value={otp[index] || ""}
                                onChange={(e) =>
                                  handleOtpChange(e.target.value, index)
                                }
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                ref={(el) => (otpInputRefs.current[index] = el)}
                                style={{ width: "40px", textAlign: "center" }}
                                autoComplete="one-time-code"
                                onPaste={handleOtpPaste}
                              />
                            ))}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={verifyOtp}
                            disabled={loading}
                          >
                            {loading ? "Verifying..." : "Verify OTP"}
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

export default VerifyMobileOTP;