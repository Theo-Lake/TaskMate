import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occur

// TASK POST (no need for conversation post since if a task is created so is a convo)
router.post("/" /* TODO */);

router.get("/:id" /*TODO*/);

// TASK PUT
router.put("/" /* TODO */);

// TASK GET
router.get("/" /* TODO */);

export default router;
