import React, { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const header = document.querySelector("header");
    const firstSection = document.querySelector(".first-section");

    const handleScroll = () => {
      const firstSectionBottom = firstSection.getBoundingClientRect().bottom;
      // Hide header if scrolled past the first section
      if (firstSectionBottom < header.offsetHeight) {
        header.style.opacity = "0";
        header.style.pointerEvents = "none"; // Disable interactions
      } else {
        header.style.opacity = "1";
        header.style.pointerEvents = "auto";
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  return (
    <div className="App">
      <header>
        <div className="logo">CTRL+Build</div>
        <nav>
          <ul>
            <li>
              <a href="#home">HOME</a>
            </li>
            <li>
              <a href="#about">ABOUT</a>
            </li>
            <li>
              <a href="#projects">PROJECTS</a>
            </li>
            <li>
              <a href="#services">SERVICES</a>
            </li>
            <li>
              <a href="#contacts">CONTACT</a>
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
