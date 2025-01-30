import React from "react";
import { Link } from "react-router-dom";
import './LandingPage.css';  // Optional if you want to add specific styles

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <header className="landing-header">
        <h1 className="app-title">Event Linker</h1> {/* App Name */}
        <p className="app-description">
          A platform to explore, manage, and register for exciting events.
        </p>
      </header>

      <section className="about-section">
        <h2>About the App</h2>
        <p>
          Event Linker is a simple event management app that lets you explore 
          various events, register for upcoming ones, and even add your own events.
          Whether you're looking for a workshop, seminar, or meetup, we make it easy
          to find and join events of interest. You can create events, see event details, 
          and register for events happening around you.
        </p>
      </section>

      <section className="call-to-action">
        <h3>Ready to join the community?</h3>
        <Link to="/home" className="btn btn-primary">
          Explore Events
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
