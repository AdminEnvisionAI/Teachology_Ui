import React from "react";
import "../assets/css/login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    // Your login logic here (e.g., API call)

    // After successful login (simulated here), navigate to the home screen
    navigate("/home"); // Navigate to the home screen
  };

  const handleGoogleLoginClick = () => {
    // Your Google login logic here

    // After successful Google login (simulated here), navigate to the home screen
    navigate("/"); // Navigate to the home screen
  };

  const handleFacebookLoginClick = () => {
    // Your Facebook login logic here

    // After successful Facebook login (simulated here), navigate to the home screen
    navigate("/"); // Navigate to the home screen
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
                            {/* Logo */}
                          </span>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3 login-title">
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2Example17"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email address"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2Example27"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Password"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                            onClick={handleLoginClick} // Add onClick handler
                          >
                            Login
                          </button>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <p className="mb-0">Or login with:</p>
                        </div>

                        <div>
                          <button
                            className="btn btn-lg btn-block btn-google mb-2"
                            onClick={handleGoogleLoginClick}
                          >
                            <FontAwesomeIcon icon={faGoogle} className="me-2" />
                            Login with Google
                          </button>

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

export default Login;
