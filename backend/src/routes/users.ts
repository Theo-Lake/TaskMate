import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occuro
import { userController } from "../controllers/users";

// USER DATA GET all users
router.get("/", userController.getAllUsers);

// USER DATA GET user BY USERID
router.get("/:userId", userController.getUserById);

// USER DATA POST
router.post("/", userController.createUser);

// USER DATA PUT
router.put("/:userId", userController.updateUser);

// USER DATA PUT
router.delete("/:userId", userController.deleteUser);

export default router;
