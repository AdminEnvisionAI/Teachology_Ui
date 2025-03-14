import React from "react";
import "../assets/css/footer.css"; // Import the CSS file

function Footer() {
  return (
    <footer id="footer" className="footer">
      <div className="container">
        <div className="copyright">
          <p>
            <strong className="sitename">Email: Contact@envisionaitech.com</strong>{" "}
          </p>
        </div>
        <div className="social-links">
          <a href="#">
            <i className="bi bi-twitter-x"></i>
          </a>
          <a href="#">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#">
            <i className="bi bi-instagram"></i>
          </a>
          <a href="#">
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      
      </div>
    </footer>
  );
}

export default Footer;
