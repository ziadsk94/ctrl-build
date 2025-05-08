import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [selectedService, setSelectedService] = useState(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (section) => {
    setActiveSection(section);
    setIsMenuOpen(false);
    setSelectedService(null);
    window.location.hash = section; // Update URL hash
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Set active section based on URL hash on initial load or hash change
  useEffect(() => {
    const updateActiveSection = () => {
      const hash = window.location.hash.replace("#", "") || "home";
      if (["home", "about", "projects", "services", "contact"].includes(hash)) {
        setActiveSection(hash);
      } else {
        setActiveSection("home");
      }
    };

    updateActiveSection(); // Run on initial load
    window.addEventListener("hashchange", updateActiveSection); // Listen for hash changes

    return () => window.removeEventListener("hashchange", updateActiveSection);
  }, []);

  const services = [
    {
      id: "web-development",
      title: "Web Development",
      description:
        "We build responsive, high-performance websites using modern frameworks like React and Next.js, ensuring fast load times and seamless cross-device experiences. Our solutions are optimized for SEO and accessibility, driving user engagement and business growth.",
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description:
        "Our user-centric designs blend stunning visuals with intuitive navigation, crafted using tools like Figma and Adobe XD. We conduct user testing to ensure interfaces enhance engagement, accessibility, and conversion rates for your brand.",
    },
    {
      id: "backend-solutions",
      title: "Backend Solutions",
      description:
        "We develop secure, scalable server-side systems with Node.js, Python, and AWS, delivering robust APIs and efficient data management. Our solutions ensure high availability and performance, supporting your application’s growth and reliability.",
    },
    {
      id: "mobile-app-development",
      title: "Mobile App Development",
      description:
        "We create native and cross-platform mobile apps using React Native and Swift, delivering seamless performance on iOS and Android. Our apps prioritize user experience, integrating features like push notifications and offline capabilities to boost engagement.",
    },
    {
      id: "cloud-solutions",
      title: "Cloud Solutions",
      description:
        "Our cloud architecture services leverage AWS, Azure, and Google Cloud to ensure scalability, security, and cost-efficiency. We implement serverless solutions and CI/CD pipelines, enabling rapid deployment and reliable application performance.",
    },
  ];

  const toggleService = (serviceId) => {
    setSelectedService(selectedService === serviceId ? null : serviceId);
  };

  useEffect(() => {
    const header = document.querySelector("header");

    header.style.opacity = "1";
    header.style.pointerEvents = "auto";

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
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
              <div className="services-header">
                <h2>WHY WORK WITH US</h2>
                <p className="catchy-paragraph">
                  Transform your vision into reality with our cutting-edge
                  solutions. We deliver unparalleled quality and innovation,
                  tailored to drive your success.
                </p>
              </div>
              <ul className="services-list">
                {services.map((service) => (
                  <li
                    key={service.id}
                    className={selectedService === service.id ? "active" : ""}
                  >
                    <button onClick={() => toggleService(service.id)}>
                      {service.title}
                    </button>
                    <div
                      className={`service-details ${
                        selectedService === service.id ? "visible" : ""
                      }`}
                    >
                      <p>{service.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
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
