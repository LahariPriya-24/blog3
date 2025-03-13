import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { Link } from "react-router-dom";
import 'react-calendar/dist/Calendar.css';
import './Events.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [countdown, setCountdown] = useState({});

  // Load events from local storage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);

    // Start countdown timer
    const timer = setInterval(() => {
      const updatedCountdown = {};
      storedEvents.forEach((event, index) => {
        updatedCountdown[index] = calculateTimeRemaining(event.date);
      });
      setCountdown(updatedCountdown);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Function to calculate countdown
  const calculateTimeRemaining = (eventDate) => {
    const now = new Date();
    const eventTime = new Date(eventDate);
    const timeDifference = eventTime - now;

    if (timeDifference <= 0) return "Event Passed";

    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
    const seconds = Math.floor((timeDifference / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  // Highlight dates with events
  const eventDates = events.map(event => new Date(event.date).toDateString());
  const highlightDates = ({ date }) => eventDates.includes(date.toDateString()) ? 'highlighted-date' : '';

  return (
    <div className="events-container">
      <div className="events-content">
        <h2 className="section-title">Upcoming Events</h2>

        {/* Event List */}
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="event-card">
                <img
                  src={event.image || "https://via.placeholder.com/150"}
                  alt={event.title}
                  className="event-image"
                />
                <div className="event-details">
                  <h5>{event.title}</h5>
                  <p>{event.description}</p>
                  <p><strong>Date:</strong> {event.date}</p>
                  <Link to={`/event/${index}`} className="btn btn-primary">Read More</Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-events">No events available</p>
          )}
        </div>

        {/* Countdown Section */}
        <div className="countdown-section">
          <h3 className="section-title">Event Countdown</h3>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="countdown-card">
                <h5>{event.title}</h5>
                <p><strong>Time Remaining:</strong> {countdown[index]}</p>
              </div>
            ))
          ) : (
            <p className="no-events">No upcoming events</p>
          )}
        </div>
      </div>

      {/* Sidebar with Calendar */}
      <div className="events-sidebar">
        <h3 className="section-title">Event Calendar</h3>
        <ReactCalendar
          tileClassName={highlightDates}
        />
      </div>
    </div>
  );
};

export default EventsPage;
