import React, { useState } from "react";
import "../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";

// Function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

function Login() {
  const navigate = useNavigate();
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleLoginClick = async () => {
    if (!validateForm()) {
      return;
    }
    navigate("/home");

    setLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${apiUrl}/login`, // Replace with your actual login API endpoint
        {
          email: email,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      dispatch(
        setUser({
          user: email,
          token: response.data.access_token,
          username: response.data.username,
          profile_image: response.data.profile_image,
          user_id: response.data.user_id,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error.response);
      let message = "Login failed. Please check your credentials.";

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message = error.response.data.message;
      }

      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLoginClick = () => {
    // Your Facebook login logic here

    // After successful Facebook login (simulated here), navigate to the home screen
    navigate("/"); // Navigate to the home screen
  };

  const handleGoogleLoginSuccess = async (tokenResponse) => {
    try {
      const accessToken = tokenResponse.access_token;

      // Use access token to fetch user data from Google API
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const userEmail = response.data.email;
      const profileImage = response.data.picture;
      const username = response.data.name;

      // Send user data to your backend
      const backendResponse = await axios.post(
        `${apiUrl}/google_login`,
        {
          email: userEmail,
          username: username,
          profile_image: profileImage,
          password: accessToken, // Or any other suitable identifier
          role: "teacher",
        },
        {
          withCredentials: true,
        }
      );

      dispatch(
        setUser({
          user: userEmail,
          token: accessToken,
          username: username,
          profile_image: profileImage,
          user_id: backendResponse.data.id,
        })
      );
      navigate("/home");
    } catch (error) {
      console.error("Google login failed:", error);
      setErrorMessage("Google login failed. Please try again.");
    }
  };

  const handleGoogleLoginError = () => {
    console.error("Google login failed");
    setErrorMessage("Google login failed. Please try again.");
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
                      alt="login form"
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
                          Sign into your account
                        </h5>

                        {errorMessage && (
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        )}

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={() => {
                              if (!email) {
                                setEmailError("Email is required");
                              } else if (!isValidEmail(email)) {
                                setEmailError("Invalid email format");
                              } else {
                                setEmailError("");
                              }
                            }}
                          />
                          {emailError && (
                            <div className="text-danger">{emailError}</div>
                          )}
                        </div>

                        <div className="form-outline mb-4">
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              id="form2Example27"
                              className="form-control form-control-lg rounded-input"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              onBlur={() => {
                                if (!password) {
                                  setPasswordError("Password is required");
                                } else {
                                  setPasswordError("");
                                }
                              }}
                            />
                            <button
                              className="btn btn-outline-secondary"
                              type="button"
                              onClick={togglePasswordVisibility}
                            >
                              <FontAwesomeIcon
                                icon={showPassword ? faEyeSlash : faEye}
                              />
                            </button>
                          </div>
                          {passwordError && (
                            <div className="text-danger">{passwordError}</div>
                          )}
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={handleLoginClick}
                            disabled={loading}
                          >
                            {loading ? "Logging in..." : "Login"}
                          </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <p className="mb-0">Or login with:</p>
                        </div>

                        <div>
                          <GoogleOAuthProvider clientId={clientId}>
                            {/* Conditionally render only when within GoogleOAuthProvider */}
                            <GoogleLoginButton
                              handleGoogleLoginSuccess={
                                handleGoogleLoginSuccess
                              }
                              handleGoogleLoginError={handleGoogleLoginError}
                            />
                          </GoogleOAuthProvider>

                          <button
                            className="btn btn-lg btn-block btn-facebook"
                            onClick={handleFacebookLoginClick}
                          >
                            <FontAwesomeIcon
                              icon={faFacebook}
                              className="me-2"
                            />
                            Login with Facebook
                          </button>
                        </div>

                        <Link
                          className="small text-muted"
                          to="/forgot-password"
                        >
                          Forgot password?
                        </Link>
                        <p className="mb-5 pb-lg-2 register-text">
                          Don't have an account?
                          <Link to="/signup" className="register-link">
                            Register here
                          </Link>
                        </p>
                        <a href="#!" className="small text-muted">
                          Terms of use.
                        </a>
                        <a href="#!" className="small text-muted">
                          Privacy policy
                        </a>
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

// Create a separate component to encapsulate Google Login logic
const GoogleLoginButton = ({
  handleGoogleLoginSuccess,
  handleGoogleLoginError,
}) => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const googleLogin = useGoogleLogin({
    clientId: clientId,
    onSuccess: (tokenResponse) => {
      handleGoogleLoginSuccess(tokenResponse);
    },
    onError: (error) => {
      handleGoogleLoginError();
    },
  });

  return (
    <button
      className="btn btn-lg btn-block btn-google mb-2"
      onClick={() => googleLogin()}
    >
      <FontAwesomeIcon icon={faGoogle} className="me-2" />
      Login with Google
    </button>
  );
};

export default Login;
