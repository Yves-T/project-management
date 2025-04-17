import express from "express";
import { createProject, getProjects } from "../controllers/projectController";

const router = express.Router();

router.get("/", getProjects);
router.post("/", createProject);

export default router;
