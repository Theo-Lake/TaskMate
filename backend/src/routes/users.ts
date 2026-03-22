import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occuro
import { userController } from "../controllers/users";

// USER DATA GET all Users ENDPOINT
router.get("/", userController.getAllUsers);

// USER DATA POST ENDPOINT
router.post("/", userController.postUser);

// USER DATA PUT ENDPOINT
router.put("/:id", userController.putUser);

// USER DATA PUT ENDPOINT
router.delete("/:id", userController.deleteUser);

export default router;


