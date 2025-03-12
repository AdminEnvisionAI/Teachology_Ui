import React, { useState } from "react";
import "../assets/css/login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { register as registerEndpoint } from "../../src/config/config";
import CreatableSelect from "react-select/creatable";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_APP_API_BASE_URL;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const roleOptions = [
    { value: "student", label: "Student" },
    { value: "teacher", label: "Teacher" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    if (!name || !username || !email || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      setLoading(false);
      return;
    }

    if (!role) {
      setErrorMessage("Please select a role.");
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role.value);
      if (profileImage) {
        formData.append("profile_image", profileImage);
      }

      const response = await axios.post(
        `${apiUrl}${registerEndpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.data.status === 200 || response.data.status === 201) {
        setSuccessMessage(response.data.message || "Signup successful!");
        // Clear form fields after successful signup
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setProfileImage(null);
        setRole(null);

        setTimeout(() => {
          setSuccessMessage("");
          navigate("/login"); // Navigate only on success
        }, 2000);
      } else {
        // Use response.data.message for error message if available
        setErrorMessage(response.data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Signup failed:", error);

      if (error.response) {
        setErrorMessage(error.response.data.message || "Signup failed.");
      } else {
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

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
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="signup form"
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
                          Create your account
                        </h5>

                        {errorMessage && (
                          <div className="alert alert-danger" role="alert">
                            {errorMessage}
                          </div>
                        )}
                        {successMessage && (
                          <div className="alert alert-success" role="alert">
                            {successMessage}
                          </div>
                        )}

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2ExampleName"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="form2ExampleUsername"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="form2ExampleEmail"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExamplePassword"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="form2ExampleConfirmPassword"
                            className="form-control form-control-lg rounded-input"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label htmlFor="role" className="form-label">
                            Role
                          </label>
                          <CreatableSelect
                            id="role"
                            options={roleOptions}
                            value={role}
                            onChange={(selectedOption) => setRole(selectedOption)}
                            placeholder="Select a role"
                            isClearable
                            isValidNewOption={() => false}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label htmlFor="profileImage" className="form-label">
                            Profile Image (Optional)
                          </label>
                          <input
                            type="file"
                            className="form-control form-control-lg rounded-input"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button
                            className="btn btn-dark btn-lg btn-block login-button"
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? "Registering..." : "Register"}
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