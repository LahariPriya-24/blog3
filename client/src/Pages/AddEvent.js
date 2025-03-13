import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
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
      alert("You must be logged in to add an event.");
      navigate("/login"); // Redirect to login page if not logged in
      return;
    }

    const imageUrl = image ? URL.createObjectURL(image) : null;

    const newEvent = { 
      title, 
      category, 
      description, 
      date, 
      image: imageUrl, 
      createdBy: loggedInUser // Store creator's username
    };

    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(storedEvents));

    navigate("/"); // Redirect to home page after adding the event
  };

  return (
    <div className="container mt-5">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-control" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required
          >
            <option value="">Select a category</option>
            <option value="Hackathon">Hackathon</option>
            <option value="Workshop">Workshop</option>
            <option value="Extra Curricular Activities">Extra Curricular Activities</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea 
            className="form-control" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input 
            type="date" 
            className="form-control" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Image</label>
          <input 
            type="file" 
            className="form-control" 
            onChange={(e) => setImage(e.target.files[0])} 
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
