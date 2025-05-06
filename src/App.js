import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const header = document.querySelector("header");

    // Ensure header is always visible initially
    header.style.opacity = "1";
    header.style.pointerEvents = "auto";

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Show header when at the top, hide when scrolled down
      if (scrollPosition > 50) {
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
              <a
                href="#home"
                className={activeSection === "home" ? "active" : ""}
                onClick={() => handleNavClick("home")}
              >
                HOME
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={activeSection === "about" ? "active" : ""}
                onClick={() => handleNavClick("about")}
              >
                ABOUT
              </a>
            </li>
            <li>
              <a
                href="#projects"
                className={activeSection === "projects" ? "active" : ""}
                onClick={() => handleNavClick("projects")}
              >
                PROJECTS
              </a>
            </li>
            <li>
              <a
                href="#services"
                className={activeSection === "services" ? "active" : ""}
                onClick={() => handleNavClick("services")}
              >
                SERVICES
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={activeSection === "contact" ? "active" : ""}
                onClick={() => handleNavClick("contact")}
              >
                CONTACT
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        {activeSection === "home" && (
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
                <p className="line4">
                  performance, scalability, and innovation
                </p>
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
              <p>
                From UI/UX design to robust backend systems, we build it all
              </p>
              <p>Partner with us to transform ideas into digital success</p>
            </div>
          </section>
        )}
        {activeSection === "about" && (
          <section className="about-section" id="about">
            <div className="about-content">
              <h2>About Us</h2>
              <p>
                CTRL+Build is a team of passionate developers and designers
                dedicated to creating innovative digital solutions.
              </p>
            </div>
          </section>
        )}
        {activeSection === "projects" && (
          <section className="projects-section" id="projects">
            <div className="projects-content">
              <h2>Our Projects</h2>
              <p>
                Explore our portfolio of cutting-edge web applications and
                designs.
              </p>
            </div>
          </section>
        )}
        {activeSection === "services" && (
          <section className="services-section" id="services">
            <div className="services-content">
              <h2>Our Services</h2>
              <p>
                We offer a range of services including web development, UI/UX
                design, and backend solutions.
              </p>
            </div>
          </section>
        )}
        {activeSection === "contact" && (
          <section className="contact-section" id="contact">
            <div className="contact-content">
              <h2>Contact Us</h2>
              <p>
                Reach out to discuss your project or inquire about our services.
              </p>
              <form action="https://formspree.io/f/mvgaalrn" method="POST">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <button type="submit">Send Message</button>
              </form>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
