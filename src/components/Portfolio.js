import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";
import Footer from "./Footer";
import terenImage from "../assets/images/teren.png";

function Portfolio() {
  const [hoveredTech, setHoveredTech] = useState(null);

  const projects = [
    {
      id: "teren",
      title: "TEREN",
      year: "2025",
      description:
        "A comprehensive platform connecting football enthusiasts with local games. Features include a user-friendly frontend for game discovery and booking, a powerful backend system for real-time updates, and a dedicated venue management dashboard.",
      longDescription:
        "TEREN is a full-stack web application that revolutionizes how football enthusiasts find and book local games. The platform features a modern, responsive design with real-time updates, secure authentication, and an intuitive booking system. The venue management dashboard provides powerful tools for administrators to manage games, users, and facilities.",
      technologies: [
        {
          name: "React",
          description:
            "Frontend development with modern React practices and hooks",
        },
        {
          name: "Node.js",
          description: "Robust backend server with Express.js framework",
        },
        {
          name: "MongoDB",
          description: "Scalable NoSQL database for flexible data storage",
        },
        {
          name: "Express",
          description: "RESTful API development with Express.js",
        },
      ],
      features: [
        "Real-time game updates and notifications",
        "Secure user authentication and authorization",
        "Interactive venue booking system",
        "Admin dashboard for venue management",
        "Responsive design for all devices",
        "Performance optimized for fast loading",
      ],
      link: "https://teren-1.onrender.com",
      image: terenImage,
    },
  ];

  return (
    <div className="portfolio-page">
      <div className="portfolio-hero">
        <Link to="/" className="back-button">
          ← Back
        </Link>
        <h1>Portfolio</h1>
        <p className="portfolio-subtitle">Selected works from our journey</p>
      </div>

      <div className="portfolio-grid">
        {projects.map((project) => (
          <div
            key={project.id}
            className="project-card"
            data-project={project.id}
          >
            <div className="project-header">
              <h2>{project.title}</h2>
              <span className="project-year">{project.year}</span>
            </div>
            <div className="project-content">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-info">
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  <h3>Key Features</h3>
                  <ul>
                    {project.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="project-tech">
                  <h3>Technologies</h3>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <div
                        key={index}
                        className="tech-tag"
                        onMouseEnter={() => setHoveredTech(tech)}
                        onMouseLeave={() => setHoveredTech(null)}
                      >
                        {tech.name}
                        {hoveredTech === tech && (
                          <div className="tech-tooltip">{tech.description}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="project-links">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Live →
                  </a>
                  <Link
                    to="/case-study/teren"
                    className="project-link project-link-secondary"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="portfolio-cta">
        <h2>Have a project in mind?</h2>
        <p>Let's create something amazing together.</p>
        <a href="mailto:contact@ctrl-build.com" className="cta-button">
          Get in Touch
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default Portfolio;
