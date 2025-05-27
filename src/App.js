import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, useLocation, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/images/logo.png";
import About from "./components/About";
import Services from "./components/Services";
import ServiceDetails from "./components/ServiceDetails";
import Portfolio from "./components/Portfolio";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const cursorRef = useRef(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
  };

  const closeServiceDetails = () => {
    setSelectedService(null);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const renderContent = () => {
    if (location.pathname === "/about") {
      return <About />;
    }
    if (location.pathname === "/services") {
      return <Services />;
    }
    if (location.pathname === "/portfolio") {
      return <Portfolio />;
    }

    return (
      <div className="App scroll-container">
        <section className="snap-section header-hero-section">
          <header className="header">
            <div className="logo">
              <img src={logo} alt="CTRL+Build Logo" className="logo-image" />
              <span className="logo-bold">CTRL</span>+Build
            </div>
            <div className="menu-container">
              <button
                className={`menu-button ${
                  isMenuOpen ? "menu-button-open" : ""
                }`}
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
                aria-controls="main-menu"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? "Close" : "Menu"}
              </button>
              <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
                <ul>
                  <li>
                    <Link to="/" onClick={toggleMenu}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/portfolio" onClick={toggleMenu}>
                      Portfolio
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" onClick={toggleMenu}>
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" onClick={toggleMenu}>
                      About
                    </Link>
                  </li>
                  <li>
                    <a
                      href="mailto:contact@ctrl-build.com"
                      onClick={toggleMenu}
                      style={{ color: "#808080" }}
                    >
                      contact@ctrl-build.com
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </header>
          <div className="hero">
            <h1>Master Your Digital Craft with CTRL+Build</h1>
            <h3>Crafting Innovative Web Solutions with Precision.</h3>
            <a href="#get-started" className="get-started-button">
              Get Started
            </a>
          </div>
        </section>

        <section className="snap-section about">
          <h2>Our Vision</h2>
          <p>
            We're a fresh, ambitious team of developers on a mission to
            revolutionize web development. Born from a passion for clean code
            and innovative solutions, we're building the future of digital
            experiences one project at a time.
          </p>
          <div className="about-stats">
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Startup Energy</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Innovation Mode</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">∞</span>
              <span className="stat-label">Growth Potential</span>
            </div>
          </div>
          <Link to="/about" className="about-button">
            Join Our Journey
          </Link>
        </section>

        <section className="snap-section portfolio">
          <div className="portfolio-header">
            <h2>Selected Works</h2>
            <span className="portfolio-year">2025 ©</span>
          </div>
          <div className="portfolio-grid">
            <div className="project-card" data-project="teren">
              <div className="project-header">
                <h3>TEREN</h3>
                <span className="project-year">2025</span>
              </div>
              <p className="project-description">
                A comprehensive platform connecting football enthusiasts with
                local games. Features include a user-friendly frontend for game
                discovery and booking, a powerful backend system for real-time
                updates, and a dedicated venue management dashboard.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">Express</span>
              </div>
              <div className="project-links">
                <a
                  href="https://teren-1.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  View Live →
                </a>
                <a href="#" className="project-link project-link-secondary">
                  Case Study →
                </a>
              </div>
            </div>
          </div>
          <Link to="/portfolio" className="portfolio-button">
            View All Projects
          </Link>
        </section>

        <section className="snap-section services">
          <div className="services-header">
            <h2>Services</h2>
          </div>

          <div className="services-list">
            <div className="service-item">
              <div className="service-content">
                <h3>01</h3>
                <div className="service-details">
                  <h4>Web Development</h4>
                  <p>Modern web applications built with precision and care.</p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("service1")}
              >
                →
              </button>
            </div>

            <div className="service-item">
              <div className="service-content">
                <h3>02</h3>
                <div className="service-details">
                  <h4>Mobile Development</h4>
                  <p>Native mobile experiences that feel natural.</p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("service3")}
              >
                →
              </button>
            </div>

            <div className="service-item">
              <div className="service-content">
                <h3>03</h3>
                <div className="service-details">
                  <h4>Design & Strategy</h4>
                  <p>Strategic design solutions for digital growth.</p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("service2")}
              >
                →
              </button>
            </div>
          </div>
        </section>

        <footer className="footer snap-section">
          <div className="footer-content">
            <div className="footer-logo">
              <img src={logo} alt="CTRL+Build Logo" className="logo-image" />
              <span className="logo-bold">CTRL</span>+Build
            </div>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="#home">Home</a>
                </li>
                <li>
                  <Link to="/portfolio">Portfolio</Link>
                </li>
                <li>
                  <a href="#services">Services</a>
                </li>
                <li>
                  <a href="#about">About</a>
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
      </div>
    );
  };

  return (
    <>
      {renderContent()}
      {selectedService && (
        <ServiceDetails
          service={selectedService}
          onClose={closeServiceDetails}
        />
      )}
      {isMenuOpen && <div className="menu-overlay" onClick={closeMenu} />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
