import express from "express";
import { userController } from "../controllers/users";
import { validate } from "../middleware/validation/validate";
import {
    UserSchema,
    UserUpdateSchema,
} from "../middleware/validation/schemas/users";
import { auth } from "../middleware/authentication/auth";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occuro

// USER DATA GET all users
router.get("/", userController.getAllUsers);

// USER DATA GET user BY USERID
router.get("/:userId", userController.getUserById);

// USER DATA POST
router.post("/", validate(UserSchema), userController.createUser);

// USER DATA PATCH
router.patch(
    "/:userId",
    auth.withAuth,
    validate(UserUpdateSchema),
    userController.updateUser
);

// USER DATA DELETE
router.delete("/:userId", auth.withAuth, userController.deleteUser);

export default router;
