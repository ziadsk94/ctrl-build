import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, useLocation, Link } from "react-router-dom";
import "./App.css";
import logo from "./assets/images/logo.png";
import About from "./components/About";
import Services from "./components/Services";
import ServiceDetails from "./components/ServiceDetails";
import Portfolio from "./components/Portfolio";
import terenImage from "./assets/images/teren.png";

function AppContent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const location = useLocation();
  const cursorRef = useRef(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

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

  // Cursor movement effect
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e) => {
      if (animationFrameId.current) return;

      animationFrameId.current = requestAnimationFrame(() => {
        targetPositionRef.current = {
          x: e.clientX - cursor.offsetWidth / 2,
          y: e.clientY - cursor.offsetHeight / 2,
        };
        animationFrameId.current = null;
      });
    };

    const handleMouseEnter = () => {
      cursor.classList.remove("fade-out");
      cursor.style.opacity = "1";
    };

    const handleMouseLeave = () => {
      cursor.classList.add("fade-out");
    };

    const handleHoverStart = (e) => {
      cursor.classList.add("hover");

      // Magnetic effect for buttons and links
      if (e.target.tagName === "BUTTON" || e.target.tagName === "A") {
        const rect = e.target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;

        // Apply magnetic effect
        targetPositionRef.current = {
          x: centerX + distanceX * 0.3 - cursor.offsetWidth / 2,
          y: centerY + distanceY * 0.3 - cursor.offsetHeight / 2,
        };
      }
    };

    const handleHoverEnd = () => {
      cursor.classList.remove("hover");
    };

    // Add hover effect to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, select, textarea'
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleHoverStart);
      element.addEventListener("mouseleave", handleHoverEnd);
    });

    // Animation loop for smooth cursor movement
    const animateCursor = () => {
      const target = targetPositionRef.current;
      const current = currentPositionRef.current;

      // Smooth interpolation with slower speed
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;

      cursor.style.transform = `translate(${current.x}px, ${current.y}px)`;
      requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    animateCursor();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleHoverStart);
        element.removeEventListener("mouseleave", handleHoverEnd);
      });
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

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
            <a href="#services" className="get-started-button">
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
            <span className="portfolio-year">2025</span>
          </div>
          <div className="portfolio-grid">
            <div className="project-card">
              <div className="project-image">
                <img src={terenImage} alt="TEREN Project" />
                <div className="project-overlay">
                  <div className="project-overlay-content">
                    <h3>TEREN</h3>
                    <p>
                      A comprehensive platform connecting football enthusiasts
                      with local games.
                    </p>
                    <div className="project-links">
                      <a
                        href="http://teren-1.onrender.com"
                        className="project-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Live
                      </a>
                      <Link
                        to="/portfolio"
                        className="project-link project-link-secondary"
                      >
                        Case Study
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="portfolio-cta">
            <Link to="/portfolio" className="cta-button">
              <span>View All Projects</span>
            </Link>
          </div>
        </section>

        <section id="services" className="snap-section services">
          <div className="services-header">
            <h2>Our Services</h2>
          </div>
          <div className="services-list">
            <div className="service-item">
              <div className="service-content">
                <h3>01</h3>
                <div className="service-details">
                  <h4>Web Development</h4>
                  <p>Custom web applications built with modern technologies.</p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("web-development")}
              >
                →
              </button>
            </div>
            <div className="service-item">
              <div className="service-content">
                <h3>02</h3>
                <div className="service-details">
                  <h4>UI/UX Design</h4>
                  <p>
                    Beautiful and intuitive user interfaces that engage users.
                  </p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("ui-ux-design")}
              >
                →
              </button>
            </div>
            <div className="service-item">
              <div className="service-content">
                <h3>03</h3>
                <div className="service-details">
                  <h4>Digital Strategy</h4>
                  <p>Strategic planning to help your business grow online.</p>
                </div>
              </div>
              <button
                className="service-link"
                onClick={() => handleServiceClick("digital-strategy")}
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
      </div>
    );
  };

  return (
    <>
      <div ref={cursorRef} className="cursor" />
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
