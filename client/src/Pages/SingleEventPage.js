import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleEventPage = () => {
  const { index } = useParams(); // Get event index from URL
  const [event, setEvent] = useState(null);
  const [canRegister, setCanRegister] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const eventDetails = storedEvents[index];
    setEvent(eventDetails);

    // Check if the event date has passed
    const eventDate = new Date(eventDetails.date);
    const currentDate = new Date();
    if (eventDate < currentDate) {
      setCanRegister(false); // Disable registration if the event date has passed
    }
  }, [index]);

  const handleRegistration = (e) => {
    e.preventDefault();
    // You can add registration logic here (e.g., send data to a server)
    alert(`Successfully registered for ${event.title}`);
  };

  return (
    <div className="container mt-5">
      {event ? (
        <>
          <h2>{event.title}</h2>
          <img
            src={event.image || "https://via.placeholder.com/150"}
            alt={event.title}
            className="img-fluid"
          />
          <p><strong>Category:</strong> {event.category}</p>
          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>

          {/* Only show registration form if the event date hasn't passed */}
          {canRegister ? (
            <form onSubmit={handleRegistration}>
              <h3>Register for this Event</h3>
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
          ) : (
            <p>Sorry, this event has already passed. You cannot register for it.</p>
          )}
        </>
      ) : (
        <p>Loading event details...</p>
      )}
    </div>
  );
};

export default SingleEventPage;
