import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from './routes/blog.js';
import multer from "multer";
const app = express();
const PORT = 9001;
connectToMongo();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Configure multer storage for file uploads





// Routes
app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use("/api/v1", authRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
