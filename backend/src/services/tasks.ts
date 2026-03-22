import { db } from "../db";
import { TaskTypes } from "../generated/prisma/enums";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllTasks() {
    return await db.task.findMany();
}

export async function getTaskByID(taskID: Number) {
    return await db.task.findUnique({
        where: {
            taskID: Number(taskID), //TODO why is Number() needed?
        },
    });
}

export async function getAllTasksByUserID(userID: Number) {
    return await db.task.findMany({
        where: {
            publisherID: Number(userID),
        },
    });
    //TODO is this needed?
}

export async function createTask(publisherID: Number, body: JsonObject) {
    let { name, type, payment, dueDate, String, images, hashtags } = body;
    //TODO do i destructure hashtags and conversation too? A convo should be created foreach assignee. that is assigned a task
    // await db.task.create({
    //     data: {
    //         name: String(name),
    //         type: TaskTypes(type)
    //     }
    // })
    return;
    //TODO create
}

export async function updateTask(taskID: Number, body: JsonObject) {
    //TODO create
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
    createTask,
    updateTask,
    deleteTask,
};
