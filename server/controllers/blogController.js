import blogModel from "../models/blogModel.js";

class BlogController {
  // Get all blogs for a specific user
  static getAllBlogs = async (req, res) => {
    try {
      const fetchAllBlogs = await blogModel.find({ user: req.user._id });
      return res.status(200).json(fetchAllBlogs);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // Add a new blog (no file upload)
  static addNewBlog = async (req, res) => {
    const { title, category, description } = req.body;

    try {
      if (title && category && description) { // Ensure all required fields are provided
        const addBlog = new blogModel({
          title: title,
          description: description,
          category: category, // Use the category directly without file handling
          user: req.user._id, // Store the logged-in user's ID
        });

        const savedBlog = await addBlog.save();
        if (savedBlog) {
          return res.status(200).json({ message: "Blog Added Successfully" });
        } else {
          return res.status(400).json({ message: "Failed to save the blog" });
        }
      } else {
        return res.status(400).json({ message: "All fields (title, category, description) are required." });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };

  // Get a single blog by ID
  static getSingleBlog = async (req, res) => {
    const { id } = req.params;

    try {
      if (id) {
        const fetchBlogsById = await blogModel.findById(id);
        return res.status(200).json(fetchBlogsById);
      } else {
        return res.status(400).json({ message: "Invalid URL" });
      }
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  };
}

export default BlogController;
