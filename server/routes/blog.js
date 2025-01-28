import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "./public/images"),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
});

const upload = multer({ storage });

// Public routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// Protected routes
router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);
router.post("/add/blog", checkIsUserAuthenticated, upload.single("thumbnail"), BlogController.addNewBlog);
router.get("/get/categories", CategoryController.getAllCategories);
router.post("/add/category", CategoryController.addNewCategory);
router.post(
  "/upload",
  checkIsUserAuthenticated,
  upload.single("thumbnail"), // Multer handles file upload
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "File not uploaded" });
      }
      res.status(200).json({
        message: "File uploaded successfully",
        filePath: `/images/${req.file.filename}`, // Relative file path
      });
    } catch (error) {
      res.status(500).json({ message: "Error uploading file", error: error.message });
    }
  }
);


export default router;
