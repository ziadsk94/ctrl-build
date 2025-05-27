import React from "react";
import "./ServiceDetails.css";

function ServiceDetails({ service, onClose }) {
  const services = {
    service1: {
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
    service2: {
      title: "UI/UX Design",
      description: "Clean, intuitive interfaces that users love.",
      details: [
        "User research and analysis",
        "Wireframing and prototyping",
        "Visual design and branding",
        "User testing and iteration",
        "Design systems and style guides",
        "Accessibility compliance",
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision"],
    },
    service3: {
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
    service4: {
      title: "Digital Strategy",
      description: "Strategic solutions for digital growth.",
      details: [
        "Digital transformation consulting",
        "Technology stack planning",
        "Growth strategy development",
        "Performance analytics and optimization",
        "Market research and analysis",
        "Competitive analysis",
      ],
      technologies: ["Analytics", "SEO", "Marketing Automation", "CRM"],
    },
  };

  const selectedService = services[service];

  return (
    <div className="service-details-overlay" onClick={onClose}>
      <div
        className="service-details-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-button" onClick={onClose}>
          ×
        </button>

        <div className="service-details-content">
          <h2>{selectedService.title}</h2>
          <p className="service-description">{selectedService.description}</p>

          <div className="service-features">
            <h3>What We Offer</h3>
            <ul>
              {selectedService.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>

          <div className="service-technologies">
            <h3>Technologies</h3>
            <div className="tech-tags">
              {selectedService.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <a href="mailto:contact@ctrl-build.com" className="contact-button">
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServiceDetails;
