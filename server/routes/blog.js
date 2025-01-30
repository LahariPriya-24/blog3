import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";

import checkIsUserAuthenticated from "../middlewares/authMiddleWare.js";

const router = express.Router();

// Multer configuration for file uploads


// Public routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);

// Protected routes
router.get("/get/allblogs",BlogController.getAllBlogs);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);
router.post("/add/blog", checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/categories", CategoryController.getAllCategories);
router.post("/add/category", CategoryController.addNewCategory);



export default router;
