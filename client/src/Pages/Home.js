import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [categorizedEvents, setCategorizedEvents] = useState({});

  // Load events from local storage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
    categorizeEvents(storedEvents);
  }, []);

  // Categorize events
  const categorizeEvents = (eventsList) => {
    const categories = {};
    eventsList.forEach((event) => {
      if (!categories[event.category]) {
        categories[event.category] = [];
      }
      categories[event.category].push(event);
    });
    setCategorizedEvents(categories);
  };

  // Function to remove an event (only the creator can remove their event)
  const removeEvent = (index) => {
    const updatedEvents = events.filter((_, i) => i !== index);
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    categorizeEvents(updatedEvents);
  };

  return (
    <>
      <main className="my-5">
        <div className="container shadow-lg">
          <section className="text-center">
            <h2 className="mb-5 my-3">
              <strong>Latest Events</strong>
            </h2>

            {Object.keys(categorizedEvents).length > 0 ? (
              Object.keys(categorizedEvents).map((category, catIndex) => (
                <div key={catIndex}>
                  <h3 className="category-title">{category}</h3>
                  <div className="row">
                    {categorizedEvents[category].map((event, index) => (
                      <div className="col-lg-4 col-md-12 mb-4" key={index}>
                        <div className="card">
                          <div
                            className="bg-image hover-overlay ripple"
                            data-mdb-ripple-color="light"
                          >
                            <img
                              src={event.image || "https://via.placeholder.com/150"}
                              className="img-fluid event-card-image"
                              alt={event.title}
                            />
                          </div>
                          <div className="card-body" style={{ padding: "20px", backgroundColor: "#f8f9fa" }}>
                            <h5 className="card-title" style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
                              {event.title}
                            </h5>
                            <p className="card-text" style={{ fontSize: "1rem", color: "#333" }}>
                              {event.description}
                            </p>
                            <p style={{ fontSize: "1rem", color: "#555" }}>
                              <strong>Date:</strong> {event.date}
                            </p>
                            <Link to={`/event/${index}`} className="btn btn-primary" style={{ marginTop: "10px", padding: "8px 16px" }}>
                              Read More
                            </Link>
                            <button
                              className="btn btn-danger mx-2"
                              onClick={() => removeEvent(index)}
                              style={{
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                padding: "8px 16px",
                                cursor: "pointer",
                                marginTop: "10px",
                              }}
                            >
                              Remove Event
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p>No events available</p>
            )}
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
