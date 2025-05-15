import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import logo from "./assets/images/logo.png";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      targetPositionRef.current = { x: e.clientX - 10, y: e.clientY - 10 };
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

      <div className="cursor" ref={cursorRef}></div>
    </div>
  );
}

export default App;
