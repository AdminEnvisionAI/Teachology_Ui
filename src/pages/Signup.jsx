import React from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="signup-container" id="signup">
      <section className="vh-100 shorter-section">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-start h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp" // Same image as Login
                      alt="signup form"
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
                          Create your account
                        </h5>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2ExampleUsername"
                            className="form-control form-control-lg rounded-input" // Added rounded-input
                            placeholder="Username" // Added placeholder
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2ExampleEmail"
                            className="form-control form-control-lg rounded-input" // Added rounded-input
                            placeholder="Email address" // Added placeholder
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExamplePassword"
                            className="form-control form-control-lg rounded-input" // Added rounded-input
                            placeholder="Password" // Added placeholder
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExampleConfirmPassword"
                            className="form-control form-control-lg rounded-input" // Added rounded-input
                            placeholder="Confirm Password" // Added placeholder
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                          >
                            Register
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2 register-text">
                          Already have an account?
                          <Link to="/login" className="register-link">
                            Login here
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

export default Signup;
