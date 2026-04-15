import express from "express";
import { taskController } from "../controllers/tasks";
import { validate } from "../middleware/validation/validate";
import { TaskSchema, TaskUpdateSchema } from "../middleware/validation/schemas/tasks";
import { auth } from "../middleware/authentication/auth";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post(
    "/",
    auth.withAuth,
    validate(TaskSchema),
    taskController.postTask
);

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

// TASK APPLICATION
router.post("/:taskId/apply", auth.withAuth, taskController.applyForTask);
router.put("/:taskId/apply/:userId/accept", auth.withAuth, taskController.acceptApplication);
router.put("/:taskId/apply/:userId/reject", auth.withAuth, taskController.rejectApplication);
router.delete("/:taskId/apply/:userId", auth.withAuth, taskController.unAssignTask);

// TASK STATUS PATCH
router.patch("/:taskId/status", auth.withAuth, taskController.patchTaskStatus);

// TASK PATCH
router.patch(
    "/:taskId",
    auth.withAuth,
    validate(TaskUpdateSchema),
    taskController.putTask
);

// TASK DELETE
router.delete("/:taskId", auth.withAuth, taskController.deleteTask);

export default router;
