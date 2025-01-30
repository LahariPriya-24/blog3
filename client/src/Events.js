import React, { useState, useEffect } from "react";
import ReactCalendar from "react-calendar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles
import './Events.css'; // Import your custom CSS

const EventsPage = () => {
  // Example of event data with dates
  const [events, setEvents] = useState([]);
  
  // Load events from local storage
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);
  
  // Get all event dates
  const eventDates = events.map((event) => new Date(event.date));

  // Function to highlight dates with events
  const highlightDates = (date) => {
    return eventDates.some(
      (eventDate) => eventDate.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="container">
      <div className="content">
        <h2>Events Page</h2>
        {/* Event list */}
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={index} className="event-card">
                <h5>{event.title}</h5>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {event.date}</p>
                <Link to={`/event/${index}`} className="btn btn-primary">
                  Read More
                </Link>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>

      {/* Sidebar with Calendar */}
      <div className="sidebar">
        <h3>Upcoming Events Calendar</h3>
        <ReactCalendar
          onChange={() => {}}
          value={new Date()}
          tileClassName={({ date }) => highlightDates(date) ? 'highlighted-date' : null}
        />
      </div>
    </div>
  );
};

export default EventsPage;
