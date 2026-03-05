import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post("/tasks" /* TODO */);

// TASK PUT
router.put("/tasks" /* TODO */);

// TASK GET
router.get("/tasks" /* TODO */);

export default router;
