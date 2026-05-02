const express = require("express");
const router = express.Router();

const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// Create Project
router.post(
    "/create",
    authMiddleware,
    adminMiddleware,
    async (req,res)=>{
        try{

            const {title,description,deadline,members} = req.body;

            const project = await Project.create({
                title,
                description,
                deadline,
                members,
                createdBy:req.user.id
            });

            res.status(201).json(project);

        }catch(error){
            res.status(500).json({msg:error.message});
        }
    }
);

// Get All Projects
router.get(
    "/all",
    authMiddleware,
    async(req,res)=>{
        try{

            const projects = await Project.find()
            .populate("createdBy","name email")
            .populate("members","name email");

            res.json(projects);

        }catch(error){
            res.status(500).json({msg:error.message});
        }
    }
);

module.exports = router;