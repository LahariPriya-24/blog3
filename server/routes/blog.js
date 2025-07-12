import express from "express";
import AuthController from "../controllers/authController.js";


const router = express.Router();

// Multer configuration for file uploads


// Public routes
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);




export default router;
