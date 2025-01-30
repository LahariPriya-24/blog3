import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [input, setInput] = useState({
    title: "",
    description: "",
    category: "",
  });
  const [file, setFile] = useState(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await axios.get("http://localhost:9001/api/v1/get/categories", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCategories(res.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchAllCategories();
  }, []);

  // Handle file upload
  const upload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("thumbnail", file);

    try {
      const res = await axios.post("http://localhost:9001/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",  // Ensure this header is set
        },
      });

      if (res.data && res.data.filePath) {
        setUploadedFileUrl(res.data.filePath); // Update file URL from response
        alert("File uploaded successfully!");
      } else {
        throw new Error("No file path received from the server");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedFileUrl) {
      alert("Please upload a thumbnail before submitting.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:9001/api/v1/add/blog",
        {
          title: input.title,
          category: input.category,
          description: input.description,
          thumbnail: uploadedFileUrl, // Use the uploaded file URL
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(res.data.message);
      navigate("/"); // Redirect to home page after success
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(error.response?.data?.message || "An error occurred while adding the blog.");
    }
  };

  return (
    <div className="container shadow">
      <h2 className="text-center my-3">Add a New Blog</h2>
      <div className="col-xl-12 my-3 d-flex items-center justify-content-center">
        <div className="row">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={input.title}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                id="formGroupExampleInput"
                placeholder="Blog Title"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Category</label>
              <select
                className="form-control"
                name="category"
                value={input.category}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              >
                <option disabled>Select Category</option>
                {categories && categories.length > 0 ? (
                  categories.map((item) =>
                    item._id && item.title ? (
                      <option key={item._id} value={item._id}>
                        {item.title}
                      </option>
                    ) : null
                  )
                ) : (
                  <option>No categories available</option>
                )}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Description</label>
              <textarea
                name="description"
                value={input.description}
                onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
                className="form-control"
                placeholder="Blog Description"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="formGroupExampleInput" className="form-label">Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                onChange={(e) => setFile(e.target.files[0])}
                className="form-control"
                id="formGroupExampleInput"
              />
              <button
                type="button"
                className="btn btn-secondary mt-2"
                onClick={upload}
              >
                Upload Thumbnail
              </button>
            </div>

            <div className="mb-3">
              <button type="submit" className="btn btn-primary btn-block">Add Blog</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
