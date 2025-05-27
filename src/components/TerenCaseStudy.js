import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import terenScreenshot1 from "../assets/images/teren-screenshot-1.png";
import terenScreenshot2 from "../assets/images/teren-screenshot-2.png";
import terenScreenshot3 from "../assets/images/teren-screenshot-3.png";
import logo from "../assets/images/logo.png";

const TerenCaseStudy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="case-study">
      <div className="case-study-header">
        <Link to="/portfolio" className="back-button">
          <span>← Back to Portfolio</span>
        </Link>
        <img src={logo} alt="CTRL+Build Logo" className="case-study-logo" />
      </div>

      <div className="case-study-content">
        <h1>Teren – Sports Venue Booking Platform</h1>

        <div className="case-study-overview">
          <div className="overview-item">
            <h3>Company</h3>
            <p>CTRL+Build</p>
          </div>
          <div className="overview-item">
            <h3>Technologies</h3>
            <p>React, Node.js, Express, MongoDB, Render</p>
          </div>
          <div className="overview-item">
            <h3>Timeline</h3>
            <p>3 weeks</p>
          </div>
        </div>

        <section className="case-study-section">
          <h2>Objective</h2>
          <p>
            Develop a platform for users to discover and book sports venues in
            real time.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Approach</h2>
          <p>
            Utilized React for the frontend, Node.js and Express for the
            backend, MongoDB for data management, and deployed on Render.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Key Features</h2>
          <ul>
            <li>Real-time venue availability</li>
            <li>Responsive design for mobile and desktop</li>
            <li>User-friendly booking system</li>
          </ul>
        </section>

        <section className="case-study-section">
          <h2>Challenges & Solutions</h2>
          <div className="challenge">
            <h3>Challenge: Managing performance with cold starts on Render</h3>
            <p>
              Solution: Implemented request queue buffering and route caching
            </p>
          </div>
          <div className="challenge">
            <h3>Challenge: Designing intuitive UX for bookings</h3>
            <p>Solution: Adopted familiar e-commerce flow models</p>
          </div>
        </section>

        <section className="case-study-section">
          <h2>Outcome</h2>
          <p>
            Successfully deployed at teren-1.onrender.com, scalable MVP ready
            for onboarding venue owners, received positive user feedback for
            UI/UX simplicity.
          </p>
        </section>

        <section className="case-study-section">
          <h2>Visuals</h2>
          <div className="case-study-images">
            <img src={terenScreenshot1} alt="Teren Screenshot 1" />
            <img src={terenScreenshot2} alt="Teren Screenshot 2" />
            <img src={terenScreenshot3} alt="Teren Screenshot 3" />
          </div>
        </section>

        <section className="case-study-section">
          <h2>Contact</h2>
          <p>contact@ctrl-build.com</p>
        </section>
      </div>
    </div>
  );
};

export default TerenCaseStudy;
