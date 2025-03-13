import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RequestEvent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const loggedInUser = localStorage.getItem("username"); // Get logged-in user

    if (!loggedInUser) {
      alert("You must be logged in to request an event.");
      return;
    }

    const imageUrl = image ? URL.createObjectURL(image) : null;

    const newEventRequest = { 
      title, 
      category, 
      description, 
      date, 
      image: imageUrl, 
      createdBy: loggedInUser, // Store creator's username
      status: "pending", // Mark event as pending
    };

    const pendingEvents = JSON.parse(localStorage.getItem("pendingEvents")) || [];
    pendingEvents.push(newEventRequest);
    localStorage.setItem("pendingEvents", JSON.stringify(pendingEvents));

    navigate("/"); // Redirect to home page or events page
  };

  return (
    <div className="container mt-5">
      <h2>Request Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            <option value="hackathon">Hackathon</option>
            <option value="workshop">Workshop</option>
            <option value="extracurricular">Extracurricular</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date</label>
          <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Image</label>
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button type="submit" className="btn btn-primary">Request Event</button>
      </form>
    </div>
  );
};

export default RequestEvent;
