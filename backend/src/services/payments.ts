import { db } from "../db";
import {
    ApplicationStatus,
    TransactionType,
    Status,
} from "../generated/prisma/enums";

const PLATFORM_USER_ID = Number(process.env.PLATFORM_USER_ID);

export async function getAllPayments() {
    return await db.transactions.findMany();
}

export async function getPaymentById(transactionId: Number) {
    return await db.transactions.findUnique({
        where: { transactionID: Number(transactionId) },
    });
}

export async function getAllPaymentsByUserId(userId: Number) {
    return await db.transactions.findMany({
        where: {
            OR: [{ payerID: Number(userId) }, { receiverID: Number(userId) }],
        },
    });
}

export async function processPayment(userID: Number, taskID: Number) {
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
    } else if (task.status === Status.complete) {
        const assignment = await db.taskAssignment.findFirst({
            where: {
                taskID: Number(taskID),
                status: ApplicationStatus.accepted,
            },
        });
        if (!assignment) throw new Error("No accepted assignment found.");

        type = "RELEASE";
        payerID = PLATFORM_USER_ID;
        receiverID = assignment.assigneeID;
    } else {
        throw new Error("Invalid task status for payment.");
    }

    return await db.transactions.create({
        data: {
            taskID: taskID as number,
            payerID: payerID as number,
            receiverID: receiverID as number,
            amount: task.payment,
            transactionType: type as TransactionType,
            status: Status.complete,
        },
    });
}

export const paymentServices = {
    getAllPayments,
    getPaymentById,
    getAllPaymentsByUserId,
    processPayment,
};
