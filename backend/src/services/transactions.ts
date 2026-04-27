import { db } from "../db";
import {
    ApplicationStatus,
    TransactionType,
    Status,
} from "../generated/prisma/enums";

const PLATFORM_USER_ID = Number(process.env.PLATFORM_USER_ID);

export async function getAllTransactions() {
    return await db.transactions.findMany();
}

export async function getTransactionById(transactionId: Number) {
    return await db.transactions.findUnique({
        where: { transactionID: Number(transactionId) },
    });
}

export async function getAllTransactionsByUserId(userId: Number) {
    return await db.transactions.findMany({
        where: {
            OR: [{ payerID: Number(userId) }, { receiverID: Number(userId) }],
        },
    });
}

export async function processTransaction(userID: Number, taskID: Number) {
    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
    });
    if (!task) throw new Error("Task not found.");

    let type: TransactionType;
    let payerID: Number;
    let receiverID: Number;

    if (task.status === Status.not_Complete) {
        type = "ESCROW";
        payerID = userID;
        receiverID = PLATFORM_USER_ID;
        console.log("Taking money");
    } else {
        throw new Error("Invalid task status for Transaction.");
    }

    return await db.transactions.create({
        data: {
            taskID: taskID as number,
            payerID: payerID as number,
            receiverID: receiverID as number,
            amount: task.payment,
            transactionType: type as TransactionType,
            status: Status.pending,
        },
    });
}

async function updateTransactionStatus(transactionID: Number, transactionStatus: Status) {
    return await db.transactions.update({
        where: { transactionID: Number(transactionID) },
        data: { status: transactionStatus }
    });
}

export async function refundPayment(taskID: Number) {
    const transaction = await db.transactions.findFirst({
        where: { taskID: Number(taskID), transactionType: TransactionType.ESCROW }
    });
    if (!transaction) return;

    return await updateTransactionStatus(transaction.transactionID, Status.cancelled)
}

export async function releasePayment(taskID: Number) {
    const transaction = await db.transactions.findFirst({
        where: { taskID: Number(taskID), transactionType: TransactionType.ESCROW }
    });
    if (!transaction) throw new Error(`No transaction found for taskID: ${taskID}`);
    await updateTransactionStatus(transaction.transactionID, Status.complete);

    const assignment = await db.taskAssignment.findFirst({
        where: { taskID: Number(taskID), status: ApplicationStatus.accepted }
    });
    if (!assignment) throw new Error("No assignment related to this transaction!");

    return await db.transactions.create({
        data: {
            taskID: taskID as number,
            payerID: PLATFORM_USER_ID,
            receiverID: assignment.assigneeID,
            amount: transaction.amount,
            transactionType: TransactionType.RELEASE,
            status: Status.complete
        }
    })
}

export const transactionServices = {
    getAllTransactions,
    getTransactionById,
    getAllTransactionsByUserId,
    processTransaction,
    refundPayment, 
    releasePayment,
};
