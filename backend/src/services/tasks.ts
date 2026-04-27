import { db } from "../db";
import {
    ApplicationStatus,
    Status,
    TaskTypes,
} from "../generated/prisma/enums";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";
import { refundPayment, releasePayment } from "./transactions";

async function getAllTasks() {
    return await db.task.findMany();
}

async function getTaskByID(taskID: Number) {
    return await db.task.findUnique({
        where: {
            taskID: Number(taskID),
        },
    });
}

async function getAllTasksByUserID(userID: Number) {
    return await db.task.findMany({
        where: {
            publisherID: Number(userID),
        },
    });
}

async function getTaskAllTaskAssignments() {
    return await db.taskAssignment.findMany();
}

async function getTaskAssignmentsByUserID(userID: Number) {
    return await db.taskAssignment.findMany({
        where: {
            assigneeID: Number(userID),
        },
    });
}

async function getTaskAssignmentsByTaskID(taskID: Number) {
    return await db.taskAssignment.findMany({
        where: {
            taskID: Number(taskID),
        },
    });
}

async function createTask(publisherID: Number, body: JsonObject) {
    let {
        name,
        type,
        payment,
        dueDate,
        description,
        images,
        location,
        peopleRequired,
        hashtags,
    } = body;

    return await db.task.create({
        data: {
            publisherID: Number(publisherID),
            name: name as string,
            type: type as TaskTypes,
            payment: payment as number,
            location: location as string,
            peopleRequired: peopleRequired as number,
            dueDate: new Date(dueDate as string),
            description: description as string,
            images: images as string[] | undefined,
            hashtags: hashtags
                ? {
                      connectOrCreate: (hashtags as string[]).map((tag) => ({
                          where: { name: tag },
                          create: { name: tag },
                      })),
                  }
                : undefined,
        },
    });
}

async function applyForTask(taskID: Number, userID: Number) {
    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
        select: { publisherID: true },
    });
    if (!task) throw new Error(`Task ${taskID} not found`);

    const existing = await db.taskAssignment.findFirst({
        where: { taskID: Number(taskID), assigneeID: Number(userID) },
    });
    if (existing)
        throw new Error(`User ${userID} has already applied to task ${taskID}`);

    if (task.publisherID === Number(userID))
        throw new Error("Publisher cannot apply to their own task");

    await db.taskAssignment.create({
        data: { taskID: Number(taskID), assigneeID: Number(userID) },
    });
}

async function acceptApplication(taskID: Number, userID: Number) {
    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
        select: { publisherID: true },
    });
    if (!task) throw new Error(`Task ${taskID} not found`);

    const application = await db.taskAssignment.findFirst({
        where: { taskID: Number(taskID), assigneeID: Number(userID) },
    });
    if (!application)
        throw new Error(
            `No application found for user ${userID} on task ${taskID}`
        );
    if (application.status === ApplicationStatus.accepted)
        throw new Error(`Application already accepted`);

    await db.$transaction([
        db.taskAssignment.update({
            where: { assignmentID: application.assignmentID },
            data: { status: ApplicationStatus.accepted },
        }),
        db.conversation.create({
            data: {
                taskCID: Number(taskID),
                user1ID: task.publisherID,
                user2ID: Number(userID),
            },
        }),
        db.task.update({
            where: { taskID: Number(taskID) },
            data: { status: Status.pending },
        }),
    ]);
}

async function rejectApplication(taskID: Number, userID: Number) {
    const application = await db.taskAssignment.findFirst({
        where: { taskID: Number(taskID), assigneeID: Number(userID) },
    });
    if (!application)
        throw new Error(
            `No application found for user ${userID} on task ${taskID}`
        );

    await db.taskAssignment.delete({
        where: { assignmentID: application.assignmentID },
    });
}

async function unAssignTask(taskID: Number, userID: Number) {
    const conversation = await db.conversation.findFirst({
        //This finds the first Conversation row where both taskCID and userID match. findUnique couldn't be used here because the filter is on a combination of non-unique fields — findUnique requires a single unique/primary key field.
        where: {
            taskCID: Number(taskID),
            user2ID: Number(userID),
        },
        select: { conversationID: true },
    });
    if (!conversation)
        throw new Error(
            `Conversation for task ${taskID} and user ${userID} not found`
        );

    const user = await db.taskAssignment.findFirst({
        where: {
            taskID: Number(taskID),
            assigneeID: Number(userID),
        },
    });

    if (!user)
        throw new Error(`User ${userID} is not assigned to task ${taskID}`);

    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
        select: { publisherID: true },
    });
    if (!task) throw new Error(`Task ${taskID} not found`);

    if (task.publisherID === Number(userID))
        throw new Error("Publisher can't be unassigned from their own task.");

    await db.$transaction([
        db.taskAssignment.deleteMany({
            where: {
                taskID: Number(taskID),
                assigneeID: Number(userID),
            },
        }),
        db.conversation.delete({
            where: { conversationID: conversation.conversationID },
        }),
    ]);
}

async function updateTask(taskID: Number, body: JsonObject) {
    const task = await getTaskByID(taskID);

    if (!task)
        throw new Error(
            `Task ${taskID} can't be updated as it does not exist.`
        );

    let {
        name,
        type,
        status,
        payment,
        dueDate,
        completedDate,
        description,
        location,
        peopleRequired,
        images,
        hashtags,
    } = body;

    return await db.task.update({
        where: { taskID: Number(taskID) },
        data: {
            name: name as string | undefined,
            type: type as TaskTypes | undefined,
            status: status as Status | undefined,
            payment: payment as number | undefined,
            dueDate: dueDate ? new Date(dueDate as string) : undefined,
            completedDate: completedDate
                ? new Date(completedDate as string)
                : undefined,
            description: description as string | undefined,
            images: images as string[] | undefined,
            location: location as string | undefined,
            peopleRequired: peopleRequired as number | undefined,
            hashtags: hashtags
                ? {
                      set: [],
                      connectOrCreate: (hashtags as string[]).map((tag) => ({
                          where: { name: tag },
                          create: { name: tag },
                      })),
                  }
                : undefined,
        },
    });
}

async function updateTaskStatus(taskID: Number, status: Status) {
    const task = await getTaskByID(taskID);
    if (!task) throw new Error(`Task ${taskID} not found`);

    if (status === Status.complete) {
        await releasePayment(Number(taskID));
    } else if (status === Status.cancelled) {
        await refundPayment(Number(taskID));
    }

    return await db.task.update({
        where: { taskID: Number(taskID) },
        data: {
            status,
            completedDate: status === Status.complete ? new Date() : undefined,
        },
    });
}

async function deleteTask(taskID: Number) {
    await refundPayment(Number(taskID));
    return await db.task.delete({
        where: {
            taskID: Number(taskID),
        },
    });
}

export const taskServices = {
    getAllTasks,
    getTaskByID,
    getAllTasksByUserID,
    getTaskAllTaskAssignments,
    getTaskAssignmentsByTaskID,
    getTaskAssignmentsByUserID,
    applyForTask,
    acceptApplication,
    rejectApplication,
    unAssignTask,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
};
