import React from "react";
import { Link } from "react-router-dom";
import "./About.css";
import Footer from "./Footer";

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <Link to="/" className="back-button">
          ← Back
        </Link>
        <h1>Our Story</h1>
        <p className="about-subtitle">
          Building the future of web development, one line of code at a time.
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Who We Are</h2>
          <p>
            We're a team of passionate developers who believe in the power of
            clean code and innovative solutions. Born from a shared vision of
            making web development more accessible and efficient, we're on a
            mission to transform how businesses approach their digital presence.
          </p>
        </section>

        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            To empower businesses with cutting-edge web solutions that drive
            growth and innovation. We're not just building websites – we're
            crafting digital experiences that make a difference.
          </p>
        </section>

        <section className="about-section">
          <h2>Why Choose Us</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>Innovation First</h3>
              <p>
                We stay ahead of the curve, implementing the latest technologies
                and best practices.
              </p>
            </div>
            <div className="feature-item">
              <h3>Agile Development</h3>
              <p>
                Quick iterations and continuous delivery ensure your project
                stays on track.
              </p>
            </div>
            <div className="feature-item">
              <h3>Transparent Process</h3>
              <p>
                Clear communication and regular updates keep you involved every
                step of the way.
              </p>
            </div>
            <div className="feature-item">
              <h3>Future-Ready</h3>
              <p>Scalable solutions that grow with your business needs.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Our Values</h2>
          <div className="values-list">
            <div className="value-item">
              <span className="value-number">01</span>
              <div className="value-content">
                <h3>Excellence</h3>
                <p>We strive for perfection in every line of code we write.</p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-number">02</span>
              <div className="value-content">
                <h3>Innovation</h3>
                <p>
                  Constantly pushing boundaries to deliver cutting-edge
                  solutions.
                </p>
              </div>
            </div>
            <div className="value-item">
              <span className="value-number">03</span>
              <div className="value-content">
                <h3>Collaboration</h3>
                <p>Working together to achieve extraordinary results.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section cta-section">
          <h2>Ready to Start Your Journey?</h2>
          <p>Let's build something amazing together.</p>
          <a href="mailto:contact@ctrl-build.com" className="cta-button">
            Get in Touch
          </a>
        </section>
      </div>

      <Footer />
    </div>
  );
}

export default About;
