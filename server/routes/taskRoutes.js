const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");


// Create Task (Admin Only)
router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    async (req, res) => {
        try {

            const {
                title,
                description,
                projectId,
                assignedTo,
                dueDate
            } = req.body;

            const task = await Task.create({
                title,
                description,
                projectId,
                assignedTo,
                dueDate
            });

            res.status(201).json(task);

        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
);


// Get All Tasks
router.get(
    "/all",
    authMiddleware,
    async (req, res) => {
        try {

            const tasks = await Task.find()
                .populate("assignedTo", "name email")
                .populate("projectId", "title");

            res.json(tasks);

        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
);


// Update Task Status
router.put(
    "/update/:id",
    authMiddleware,
    async (req, res) => {
        try {

            const { status } = req.body;

            const task = await Task.findByIdAndUpdate(
                req.params.id,
                { status },
                { new: true }
            );

            res.json(task);

        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    }
);

module.exports = router;