import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllTasks() {
    return await db.task.findMany();
}

//TODO get taskByID

export async function createTask(body: JsonObject) {
    //TODO create
}

export async function updateTask(body: JsonObject) {
    //TODO create
}

export async function deleteTask(body: JsonObject) {
    //TODO create
}

export const taskServices = {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
};
