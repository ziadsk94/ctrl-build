import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";
import Footer from "./Footer";

function Services() {
  const services = [
    {
      id: "service1",
      number: "01",
      title: "Web Development",
      description: "Modern web applications built with precision and care.",
      details: [
        "Custom web applications using React and Next.js",
        "Full-stack development with Node.js",
        "API development and integration",
        "Performance optimization and SEO",
        "Progressive Web Apps (PWA)",
        "E-commerce solutions",
      ],
      technologies: ["React", "Next.js", "Node.js", "MongoDB", "PostgreSQL"],
    },
    {
      id: "service2",
      number: "02",
      title: "Mobile Development",
      description: "Native mobile experiences that feel natural.",
      details: [
        "Cross-platform development with React Native",
        "Native iOS and Android apps",
        "Mobile UI/UX design",
        "App store optimization",
        "Push notifications and analytics",
        "Offline functionality",
      ],
      technologies: ["React Native", "Swift", "Kotlin", "Firebase"],
    },
    {
      id: "service3",
      number: "03",
      title: "Design & Strategy",
      description: "Strategic design solutions for digital growth.",
      details: [
        "User research and experience design",
        "Visual design and branding",
        "Digital transformation consulting",
        "Technology stack planning",
        "Growth strategy development",
        "Performance analytics and optimization",
      ],
      technologies: ["Figma", "Adobe XD", "Analytics", "SEO", "CRM"],
    },
  ];

  return (
    <div className="services-page">
      <div className="services-hero">
        <Link to="/" className="back-button">
          ← Back
        </Link>
        <h1>Services</h1>
        <p>Transforming ideas into exceptional digital experiences.</p>
      </div>

      <div className="services-container">
        {services.map((service) => (
          <div key={service.id} className="service-section">
            <div className="service-header">
              <span className="service-number">{service.number}</span>
              <h2>{service.title}</h2>
            </div>
            <p className="service-description">{service.description}</p>
            <div className="service-content">
              <div className="service-details">
                {service.details.map((detail, index) => (
                  <div key={index} className="detail-item">
                    {detail}
                  </div>
                ))}
              </div>
              <div className="service-tech">
                {service.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <a href="mailto:contact@ctrl-build.com" className="service-cta">
              Get Started
            </a>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Services;
