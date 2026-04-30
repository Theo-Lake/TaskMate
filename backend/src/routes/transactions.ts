import express from "express";
import { transactionController } from "../controllers/transactions";
import { auth } from "../middleware/authentication/auth";
const router = express.Router();

// Get all transactions
router.get("/", auth.withAuth, transactionController.getAllTransactions);

// Get transaction by transaction ID
router.get("/byTransactionId/:transactionId", auth.withAuth, transactionController.getTransactionById);

// Get all transactions by userID
router.get("/allByUserId", auth.withAuth, transactionController.getAllTransactionsByUserId);

// Process a transaction
// router.post("/:taskId", auth.withAuth, transactionController.processTransaction);

export default router;