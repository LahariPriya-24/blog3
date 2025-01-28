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
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,"./public/images");
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('thumbnail'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Log file info (optional, for debugging)
    console.log(req.file);

    // Return the file URL (assuming it's stored in the 'public/images' directory)
    const fileUrl = `http://localhost:9001/images/${req.file.filename}`;
    return res.status(200).json({ fileUrl });
});

// Routes
app.get("/", (req, res) => {
    res.send("API is running..");
});

app.use("/api/v1", authRoutes);

// Start the Server
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
