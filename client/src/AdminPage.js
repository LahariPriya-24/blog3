import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AdminPage = () => {
  const [pendingEvents, setPendingEvents] = useState([]);

  useEffect(() => {
    const storedPendingEvents = JSON.parse(localStorage.getItem("pendingEvents")) || [];
    setPendingEvents(storedPendingEvents);
  }, []);

  const approveEvent = (index) => {
    const eventToApprove = pendingEvents[index];
    eventToApprove.status = "approved"; // Change status to approved

    // Add the approved event to the main events list
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents.push(eventToApprove);
    localStorage.setItem("events", JSON.stringify(storedEvents));

    // Remove the event from the pending list
    const updatedPendingEvents = pendingEvents.filter((_, i) => i !== index);
    setPendingEvents(updatedPendingEvents);
    localStorage.setItem("pendingEvents", JSON.stringify(updatedPendingEvents));
  };

  const rejectEvent = (index) => {
    const updatedPendingEvents = pendingEvents.filter((_, i) => i !== index);
    setPendingEvents(updatedPendingEvents);
    localStorage.setItem("pendingEvents", JSON.stringify(updatedPendingEvents));
  };

  return (
    <div className="container mt-5">
      <h2>Pending Event Requests</h2>
      {pendingEvents.length > 0 ? (
        <div className="list-group">
          {pendingEvents.map((event, index) => (
            <div className="list-group-item" key={index}>
              <h5>{event.title}</h5>
              <p>{event.description}</p>
              <p><strong>Category:</strong> {event.category}</p>
              <p><strong>Date:</strong> {event.date}</p>
              <button className="btn btn-success" onClick={() => approveEvent(index)}>Approve</button>
              <button className="btn btn-danger" onClick={() => rejectEvent(index)}>Reject</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending event requests.</p>
      )}
    </div>
  );
};

export default AdminPage;
