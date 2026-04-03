import express from "express";
import { userController } from "../controllers/users";
import { validate } from "../middleware/validation/validate";
import { UserSchema } from "../middleware/validation/schemas/users";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occuro

// USER DATA GET all users
router.get("/", userController.getAllUsers);

// USER DATA GET user BY USERID
router.get("/:userId", userController.getUserById);

// USER DATA POST
router.post("/", validate(UserSchema), userController.createUser);

// USER DATA PUT
router.put("/:userId", validate(UserSchema), userController.updateUser);

// USER DATA PUT
router.delete("/:userId", userController.deleteUser);

export default router;
