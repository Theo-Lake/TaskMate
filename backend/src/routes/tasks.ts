import express from "express";
import { taskController } from "../controllers/tasks";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post("/:publisherId", taskController.postTask);

// TASK GET all tasks
router.get("/", taskController.getAllTasks);

// TASK GET all tasks BY USERID
router.get("/byUserId/:userId", taskController.getAllTasksByUserID);

// TASK GET by ID
router.get("/byTaskId/:taskId", taskController.getTaskByID);

// TASK ASSIGNMENT GET ALL
router.get("/assignments", taskController.getTaskAllTaskAssignments);

// TASK ASSIGNMENT GET by taskID
router.get(
    "/assignments/byTaskId/:taskId",
    taskController.getTaskAssignmentByTaskID
);

// TASK ASSIGNMENT GET by userIDs
router.get(
    "/assignments/byUserId/:userId",
    taskController.getTaskAssignmentByUserID
);

router.put("/:taskId/assign/:userId", taskController.assignTask);

router.delete("/:taskId/assign/:userId", taskController.unAssignTask);

// TASK PUT
router.put("/:taskId", taskController.putTask);

// TASK DELETE
router.delete("/:taskId", taskController.deleteTask);

export default router;
