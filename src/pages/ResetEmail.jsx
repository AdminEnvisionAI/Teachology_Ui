import React from "react";
import "../assets/css/login.css";
import { Link } from "react-router-dom";

function ResetEmail() {
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
                      alt="Enter Email"
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
                          Enter Your Email
                        </h5>

                        <p className="mb-4">
                          To reset your password, please enter your registered
                          email address. We will send you an OTP to verify your
                          identity.
                        </p>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2ExampleEmail"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email address"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="button"
                          >
                            Send OTP
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

export default ResetEmail;
