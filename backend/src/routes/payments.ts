import express from "express";
import { paymentController } from "../controllers/payments";
import { auth } from "../middleware/authentication/auth";
const router = express.Router();

// Get all payments
router.get("/", auth.withAuth, paymentController.getAllPayments);

// Get payment by transaction ID
router.get("/byTransactionId/:transactionId", auth.withAuth, paymentController.getPaymentById);

// Get all payments by userID
router.get("/allByUserId", auth.withAuth, paymentController.getAllPaymentsByUserId);

// Process a payment
router.post("/:taskId", auth.withAuth, paymentController.processPayment);

export default router;