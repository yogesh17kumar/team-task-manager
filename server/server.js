const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();

// Import Routes
const authRoutes = require("./routes/authRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Protected Dashboard Route
app.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        msg: "Welcome to Dashboard",
        user: req.user
    });
});

// Admin Route
app.get(
    "/admin",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            msg: "Welcome Admin Panel"
        });
    }
);

// Home Route
app.get("/", (req, res) => {
    res.send("API Running");
});

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));
// Server Start
app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port ${process.env.PORT}`);
});