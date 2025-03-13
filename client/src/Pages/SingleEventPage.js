import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./SingleEventPage.css"; // Import custom CSS

const SingleEventPage = () => {
  const { index } = useParams(); // Get event index from URL
  const [event, setEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [canRegister, setCanRegister] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventDetails = storedEvents[index];
    
    if (eventDetails) {
      setEvent(eventDetails);

      // Load registrations for this event
      const storedRegistrations = JSON.parse(localStorage.getItem("registrations")) || {};
      const eventRegistrations = storedRegistrations[eventDetails.id] || [];
      setRegistrations(eventRegistrations);

      // Check if the event date has passed
      const eventDate = new Date(eventDetails.date);
      const currentDate = new Date();

      if (eventDate < currentDate) {
        setCanRegister(false);
      }

      // Check if event is full
      if (eventDetails.capacity && eventRegistrations.length >= eventDetails.capacity) {
        setCanRegister(false);
      }
    }
  }, [index]);

  const handleRegistration = (e) => {
    e.preventDefault();
    
    if (!event) return;

    // Get stored registrations
    const storedRegistrations = JSON.parse(localStorage.getItem("registrations")) || {};

    // Register the user
    const newRegistration = { name, email };
    const updatedRegistrations = [...registrations, newRegistration];

    // Save updated registrations
    storedRegistrations[event.id] = updatedRegistrations;
    localStorage.setItem("registrations", JSON.stringify(storedRegistrations));

    // Save event ID to user's registered events
    const registeredEventIds = JSON.parse(localStorage.getItem("myRegisteredEvents")) || [];
    if (!registeredEventIds.includes(event.id)) {
      registeredEventIds.push(event.id);
      localStorage.setItem("myRegisteredEvents", JSON.stringify(registeredEventIds));
    }

    // Update state
    setRegistrations(updatedRegistrations);
    alert(`Successfully registered for ${event.title}`);

    // Check if event is now full
    if (event.capacity && updatedRegistrations.length >= event.capacity) {
      setCanRegister(false);
    }

    // Clear form fields
    setName("");
    setEmail("");
  };

  return (
    <div className="container mt-5 single-event-container">
      {event ? (
        <div className="event-content">
          {/* Left side: Event details */}
          <div className="event-details-left">
            <h2 className="event-title">{event.title}</h2>
            <img
              src={event.image || "https://via.placeholder.com/150"}
              alt={event.title}
              className="img-fluid event-image"
            />
            <div className="event-description">
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Capacity:</strong> {event.capacity || "101"}</p>
              <p><strong>Registrations:</strong> {registrations.length}</p>
              {event.capacity && (
                <p><strong>Remaining Spots:</strong> {Math.max(event.capacity - registrations.length, 0)}</p>
              )}
            </div>
          </div>

          {/* Right side: Registration form */}
          <div className="event-register-right">
            {canRegister ? (
              <div className="registration-form">
                <h3>Register for this Event</h3>
                <form onSubmit={handleRegistration}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              </div>
            ) : (
              <p className="registration-closed">
                {event.capacity && registrations.length >= event.capacity
                  ? "This event is full. No more registrations allowed."
                  : "Sorry, this event has already passed. You cannot register for it."}
              </p>
            )}
          </div>
        </div>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default SingleEventPage;
