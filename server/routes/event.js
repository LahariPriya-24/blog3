import express from "express";
import EventController from "../controllers/eventController.js";
import checkIsUserAuthenticated from "../middlewares/authMiddleWare.js";

const router = express.Router();

// Protected routes
router.get("/get/allEvents", checkIsUserAuthenticated, EventController.getAllEvents);
router.post("/add/event", checkIsUserAuthenticated, EventController.addNewEvent);

export default router;
