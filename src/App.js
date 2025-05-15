import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/images/logo.png";
import brnchImage from "./assets/images/brnch.png";
import aligneImage from "./assets/images/aligne.png";
import frostAndFoundImage from "./assets/images/frost-and-found.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const cursorRef = useRef(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  useEffect(() => {
    const cursor = cursorRef.current;

    const handleMouseMove = (e) => {
      targetPositionRef.current = { x: e.clientX - 50, y: e.clientY - 50 }; // Adjust for larger image cursor
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
              className={`menu-button ${isMenuOpen ? "menu-button-open" : ""}`}
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
                  <a href="#home" onClick={toggleMenu}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#portfolio" onClick={toggleMenu}>
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#services" onClick={toggleMenu}>
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={toggleMenu}>
                    About
                  </a>
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
        <h2>About</h2>
        <p>
          At CTRL+Build, we are a passionate team of developers dedicated to
          crafting cutting-edge web experiences. With a focus on innovation and
          precision, we transform ideas into dynamic digital solutions tailored
          to your needs.
        </p>
        <button className="about-button">Our Approach</button>
      </section>

      <section className="snap-section partners">
        <div className="partners-header">
          <h2>Selected Partners</h2>
          <span className="partners-year">2025 ©</span>
        </div>
        <div className="partners-content">
          <ul className="partners-list">
            <li
              onMouseEnter={() => setHoveredPartner("BRNCH")}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <a
                href="https://brnch-5eaa3.firebaseapp.com"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                {Array.from("BRNCH").map((letter, index) => (
                  <span key={index} className="partner-letter">
                    {letter}
                  </span>
                ))}
              </a>
            </li>
            <li
              onMouseEnter={() => setHoveredPartner("ALIGNÉ STUDIO")}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <a
                href="https://aligne-pilates.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                {Array.from("ALIGNÉ STUDIO").map((letter, index) => (
                  <span key={index} className="partner-letter">
                    {letter}
                  </span>
                ))}
              </a>
            </li>
            <li
              onMouseEnter={() => setHoveredPartner("FROST & FOUND")}
              onMouseLeave={() => setHoveredPartner(null)}
            >
              <a
                href="https://frost-and-found.web.app"
                target="_blank"
                rel="noopener noreferrer"
                className="partner-link"
              >
                {Array.from("FROST & FOUND").map((letter, index) => (
                  <span key={index} className="partner-letter">
                    {letter}
                  </span>
                ))}
              </a>
            </li>
          </ul>
        </div>
        <div
          className={`cursor ${hoveredPartner ? "cursor-image" : ""}`}
          ref={cursorRef}
        >
          {hoveredPartner === "BRNCH" && (
            <img
              src={brnchImage}
              alt="BRNCH"
              className="cursor-partner-image"
            />
          )}
          {hoveredPartner === "ALIGNÉ STUDIO" && (
            <img
              src={aligneImage}
              alt="Aligné Studio"
              className="cursor-partner-image"
            />
          )}
          {hoveredPartner === "FROST & FOUND" && (
            <img
              src={frostAndFoundImage}
              alt="Frost & Found"
              className="cursor-partner-image"
            />
          )}
        </div>
      </section>

      <section className="snap-section services">
        <h2>Services</h2>
        <p>
          Discover our tailored digital solutions designed to elevate your brand
          and spark innovation. Explore each service to see how we can transform
          your vision into reality.
        </p>
        <ul className="services-list">
          <li>
            <span className="service-number">01</span>
            <div className="service-content">
              <div className="service-title-wrapper">
                <h3>Web Development</h3>
                <a href="#service1" className="service-link">
                  Read More
                </a>
              </div>
            </div>
          </li>
          <li>
            <span className="service-number">02</span>
            <div className="service-content">
              <div className="service-title-wrapper">
                <h3>UI/UX Design</h3>
                <a href="#service2" className="service-link">
                  Read More
                </a>
              </div>
            </div>
          </li>
          <li>
            <span className="service-number">03</span>
            <div className="service-content">
              <div className="service-title-wrapper">
                <h3>Digital Strategy</h3>
                <a href="#service3" className="service-link">
                  Read More
                </a>
              </div>
            </div>
          </li>
          <li>
            <span className="service-number">04</span>
            <div className="service-content">
              <div className="service-title-wrapper">
                <h3>Maintenance & Support</h3>
                <a href="#service4" className="service-link">
                  Read More
                </a>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default App;
