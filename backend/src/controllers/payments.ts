import { Request, Response } from "express";
import { paymentServices } from "../services/payments";


async function getAllPayments(req: Request, res: Response) {
    try {
        const payments = await paymentServices.getAllPayments();
        if (!payments) {
            res.status(404).json({ error: "Could not find any payments." });
            return;
        }

        console.log("Get all payments accepted.");
        res.status(200).json({ payments: payments });
    } catch (error) {
        console.log(`An error occured whilst trying to get all payments: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getPaymentById(req: Request, res: Response) {
    try {
        const transactionId = Number(req.params.transactionId);
        const payment = await paymentServices.getPaymentById(transactionId);
        if (!payment) {
            res.status(404).json({ error: `Could not find a payment for transaction ID ${transactionId}.` });
            return;
        }

        console.log("Get payment by transaction ID accepted.");
        res.status(200).json({ payment: payment });
    } catch (error) {
        console.log(`An error occured whilst trying to get payment by transaction ID: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getAllPaymentsByUserId(req: Request, res: Response) {
    try {
        const userId = req.user!.userID;
        const payments = await paymentServices.getAllPaymentsByUserId(userId);
        if (!payments) {
            res.status(404).json({ error: "Could not find any payments." });
            return;
        }

        console.log("Get all payments by user ID accepted.");
        res.status(200).json({ payments: payments });
    } catch (error) {
        console.log(`An error occured whilst trying to get all payments by user ID: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function processPayment(req: Request, res: Response) {
    try {
        const taskId = Number(req.params.taskId);
        const userId = req.user!.userID;
        await paymentServices.processPayment(userId, taskId);
        console.log("Payment Processed!");
        res.status(200).json({ message: "Payment successfully processed!"});
    } catch (error) {
        console.log(`An error occured whilst trying to process a payment: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}


export const paymentController = {
    getAllPayments,
    getPaymentById,
    getAllPaymentsByUserId,
    processPayment
}