const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
    "/stats",
    authMiddleware,
    async (req, res) => {
        try {

            const totalTasks = await Task.countDocuments();

            const pendingTasks = await Task.countDocuments({
                status: "Pending"
            });

            const inProgressTasks = await Task.countDocuments({
                status: "In Progress"
            });

            const completedTasks = await Task.countDocuments({
                status: "Completed"
            });

            const today = new Date().toISOString().split("T")[0];

            const overdueTasks = await Task.countDocuments({
                dueDate: { $lt: today },
                status: { $ne: "Completed" }
            });

            res.json({
                totalTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
                overdueTasks
            });

        } catch (error) {
            res.status(500).json({
                msg: error.message
            });
        }
    }
);

module.exports = router;