import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddEvent = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);  // State to store the image
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Handle file URL conversion (for simplicity, we assume the image is uploaded somewhere)
    const imageUrl = image ? URL.createObjectURL(image) : null;
    
    const newEvent = { title, category, description, date, image: imageUrl };
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    storedEvents.push(newEvent);
    localStorage.setItem("events", JSON.stringify(storedEvents));

    navigate("/"); // Redirect to home page
  };

  return (
    <div className="container mt-5">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
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
