import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from "../assets/images/logo.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logo} alt="CTRL+Build Logo" className="logo-image" />
          <span className="logo-bold">CTRL</span>+Build
        </div>
        <nav className="footer-nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="#portfolio">Portfolio</a>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className="footer-contact">
          <a href="mailto:contact@ctrl-build.com">contact@ctrl-build.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 CTRL+Build. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
