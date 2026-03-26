import { db } from "../db";
import { TaskTypes } from "../generated/prisma/enums";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllTasks() {
    return await db.task.findMany();
}

export async function getTaskByID(taskID: Number) {
    return await db.task.findUnique({
        where: {
            taskID: Number(taskID),
        },
    });
}

export async function getAllTasksByUserID(userID: Number) {
    return await db.task.findMany({
        where: {
            publisherID: Number(userID),
        },
    });
}

export async function createTask(publisherID: Number, body: JsonObject) {
    let { 
        name, 
        type, 
        payment, 
        dueDate, 
        description, 
        images, 
        hashtags 
    } = body;

    return await db.task.create({
        data: {
            publisherID: Number(publisherID),
            name: name as string,
            type: type as TaskTypes,
            payment: payment as number,
            dueDate: new Date(dueDate as string),
            description: description as string,
            images: images as string | undefined,
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

export async function assignTask(taskID: Number, userID: Number) {
    const task = await db.task.findUnique({
        where: { taskID: Number(taskID) },
        select: { publisherID: true },
    });
    if (!task) throw new Error(`Task ${taskID} not found`);

    await db.$transaction([
        //EITHER ALL SUCCEED OR ALL FAIL.
        db.taskAssignment.create({
            data: {
                taskID: Number(taskID),
                assigneeID: Number(userID),
            },
        }),
        db.conversation.create({
            data: {
                taskCID: Number(taskID),
                user1ID: task.publisherID,
                user2ID: Number(userID),
            },
        }),
    ]);
}

export async function unAssignTask(taskID: Number, userID: Number) {
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

export async function updateTask(taskID: Number, body: JsonObject) {
    let {
        name,
        type,
        status,
        payment,
        dueDate,
        completedDate,
        description,
        images,
        hashtags,
    } = body;

    return await db.task.update({
        where: { taskID: Number(taskID) },
        data: {
            name: name as string | undefined,
            type: type as TaskTypes | undefined,
            status: status as any | undefined,
            payment: payment as number | undefined,
            dueDate: dueDate ? new Date(dueDate as string) : undefined,
            completedDate: completedDate
                ? new Date(completedDate as string)
                : undefined,
            description: description as string | undefined,
            images: images as string | undefined,
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

export async function deleteTask(taskID: Number) {
    await db.task.delete({
        where: {
            taskID: Number(taskID),
        },
    });

    return;
}

export const taskServices = {
    getAllTasks,
    getTaskByID,
    getAllTasksByUserID,
    assignTask,
    unAssignTask,
    createTask,
    updateTask,
    deleteTask,
};
