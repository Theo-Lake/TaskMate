import { Request, Response } from "express";
import { transactionServices } from "../services/transactions";


async function getAllTransactions(req: Request, res: Response) {
    try {
        const transactions = await transactionServices.getAllTransactions();
        if (!transactions) {
            res.status(404).json({ error: "Could not find any transactions." });
            return;
        }

        console.log("Get all transactions accepted.");
        res.status(200).json({ transactions: transactions });
    } catch (error) {
        console.log(`An error occured whilst trying to get all transactions: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getTransactionById(req: Request, res: Response) {
    try {
        const transactionId = Number(req.params.transactionId);
        const transaction = await transactionServices.getTransactionById(transactionId);
        if (!transaction) {
            res.status(404).json({ error: `Could not find a transaction for transaction ID ${transactionId}.` });
            return;
        }

        console.log("Get transaction by transaction ID accepted.");
        res.status(200).json({ transaction: transaction });
    } catch (error) {
        console.log(`An error occured whilst trying to get transaction by transaction ID: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getAllTransactionsByUserId(req: Request, res: Response) {
    try {
        const userId = req.user!.userID;
        const transactions = await transactionServices.getAllTransactionsByUserId(userId);
        if (!transactions) {
            res.status(404).json({ error: "Could not find any transactions." });
            return;
        }

        console.log("Get all transactions by user ID accepted.");
        res.status(200).json({ transactions: transactions });
    } catch (error) {
        console.log(`An error occured whilst trying to get all transactions by user ID: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function processTransaction(req: Request, res: Response) {
    try {
        const taskId = Number(req.params.taskId);
        const userId = req.user!.userID;
        await transactionServices.processTransaction(userId, taskId);
        console.log("Tansaction Processed!");
        res.status(200).json({ message: "Transaction successfully processed!"});
    } catch (error) {
        console.log(`An error occured whilst trying to process a transaction: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}


export const transactionController = {
    getAllTransactions,
    getTransactionById,
    getAllTransactionsByUserId,
    processTransaction,
}