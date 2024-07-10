import express from "express";
import * as ProjectsController from "../controllers/projects";

const router = express.Router();

router.get("/", ProjectsController.getProjects);

export default router;
