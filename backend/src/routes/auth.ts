import express from "express";
const router = express.Router(); // Creating a different router for every route, so circular dependency does not occuro
import { authController } from "../controllers/auth";

router.post("/login", authController.login);
router.post("/logout", authController.logOut);
router.post("/refresh", authController.refresh);

export default router;
