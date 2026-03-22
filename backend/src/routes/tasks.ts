import express from "express";
import { taskController } from "../controllers/tasks";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post("/:publisherId", taskController.postTask);

// TASK GET all tasks
router.get("/:taskId", taskController.getAllTasks);

// TASK GET by ID
router.get("/:taskId", taskController.getTaskByID);

// TASK PUT
router.put("/:taskId", taskController.putTask);

// TASK DELETE
router.delete("/:taskId", taskController.deleteTask);

export default router;
