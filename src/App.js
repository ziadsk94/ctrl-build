import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, useLocation, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/images/logo.png";
import terenImage from "./assets/images/teren.png";
import About from "./components/About";
import Services from "./components/Services";
import ServiceDetails from "./components/ServiceDetails";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState(null);
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

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      targetPositionRef.current = { x: e.clientX - 0, y: e.clientY - 0 };
    };

    const animate = () => {
      const lerp = (start, end, factor) => start + (end - start) * factor;
      currentPositionRef.current.x = lerp(
        currentPositionRef.current.x,
        targetPositionRef.current.x,
        0.05
      );
      currentPositionRef.current.y = lerp(
        currentPositionRef.current.y,
        targetPositionRef.current.y,
        0.05
      );

      cursor.style.left = `${currentPositionRef.current.x}px`;
      cursor.style.top = `${currentPositionRef.current.y}px`;

      requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const renderContent = () => {
    if (location.pathname === "/about") {
      return <About />;
    }
    if (location.pathname === "/services") {
      return <Services />;
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
                    <a href="#portfolio" onClick={toggleMenu}>
                      Portfolio
                    </a>
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

        <section className="snap-section partners">
          <div className="partners-header">
            <h2>Selected Partners</h2>
            <span className="partners-year">2025 ©</span>
          </div>
          <div className="partners-content">
            <div className="partner-section">
              <div className="partner-main">
                <a
                  href="https://teren-1.onrender.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="partner-link"
                  onMouseEnter={() => setHoveredPartner("TEREN")}
                  onMouseLeave={() => setHoveredPartner(null)}
                >
                  {Array.from("TEREN").map((letter, index) => (
                    <span key={index} className="partner-letter">
                      {letter}
                    </span>
                  ))}
                </a>
                <div className="partner-info">
                  <h3>Football Game Finder</h3>
                  <p>
                    A comprehensive platform connecting football enthusiasts
                    with local games. Features include a user-friendly frontend
                    for game discovery and booking, a powerful backend system
                    for real-time updates, and a dedicated venue management
                    dashboard. Users can create, join, or organize games, while
                    venue managers can efficiently handle bookings and facility
                    management.
                  </p>
                  <div className="tech-stack">
                    <span>React</span>
                    <span>Node.js</span>
                    <span>MongoDB</span>
                    <span>Express</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
                  <a href="#portfolio">Portfolio</a>
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
      <div
        className={`cursor ${hoveredPartner ? "cursor-image" : ""}`}
        ref={cursorRef}
      >
        {hoveredPartner === "TEREN" && (
          <img src={terenImage} alt="TEREN" className="cursor-partner-image" />
        )}
      </div>
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
