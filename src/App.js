import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const header = document.querySelector("header");
    const firstSection = document.querySelector(".first-section");

    const handleScroll = () => {
      const firstSectionBottom = firstSection.getBoundingClientRect().bottom;
      if (firstSectionBottom < header.offsetHeight) {
        header.style.opacity = "0";
        header.style.pointerEvents = "none";
      } else {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="App">
      <header>
        <div className="logo">CTRL+Build</div>
        <nav className={isMenuOpen ? "open" : ""}>
          <button className="hamburger" onClick={toggleMenu}>
            <span className="top-line"></span>
            <span className="bottom-line"></span>
          </button>
          <button className="close-menu" onClick={toggleMenu}>
            <span></span>
            <span></span>
          </button>
          <ul>
            <li>
              <a href="#home" onClick={() => setIsMenuOpen(false)}>
                HOME
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setIsMenuOpen(false)}>
                ABOUT
              </a>
            </li>
            <li>
              <a href="#projects" onClick={() => setIsMenuOpen(false)}>
                PROJECTS
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setIsMenuOpen(false)}>
                SERVICES
              </a>
            </li>
            <li>
              <a href="#contacts" onClick={() => setIsMenuOpen(false)}>
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="first-section" id="home">
          <div className="landing-content">
            <div className="title">
              <span>CTRL+</span>
              <span>Build</span>
            </div>
            <div className="description">
              <p className="line1">is your partner for cutting-edge</p>
              <p className="line2">web development and design,</p>
              <p className="line3">crafted for businesses that demand</p>
              <p className="line4">performance, scalability, and innovation</p>
            </div>
          </div>
          <div className="additional-content">
            <p>
              We deliver bespoke websites and applications tailored to your
              vision
            </p>
            <p>
              Our full-stack expertise ensures seamless, high-performance
              solutions
            </p>
            <p>From UI/UX design to robust backend systems, we build it all</p>
            <p>Partner with us to transform ideas into digital success</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
