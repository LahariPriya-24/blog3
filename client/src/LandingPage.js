import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';  // Optional if you want to add specific styles

const LandingPage = () => {
  return (
    <section id="About" className="landing-page">
      <div className="container">
        <div className="row parentDiv">
          {/* Text Content */}
          <div className="col-12 col-md-6 text-container">
            <p className="welcome-text">
              <b>Welcome to the Centralized Portal for Learning, Innovation, and Networking!</b>
            </p>
            <div className="description">
              <p>
                Discover workshops, hackathons, and extracurricular activities that will help you build your skills, grow your network, and unlock new opportunities. Join us today and take the next step in your learning journey!
              </p>
            </div>
            {/* Ready to Join */}
            <div className="cta-container">
              <h3>Ready to join the community?</h3>
              <Link to="/home" className="explore-btn">
                Explore Events
              </Link>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-12 col-md-6 image-container">
            <img
              src="/images/image1.png" // Replace with the actual image path
              alt="Learning and Innovation"
              className="image-style"
              width="600"
              height="350"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingPage;
