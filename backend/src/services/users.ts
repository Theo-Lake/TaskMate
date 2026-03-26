import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllUsers() {
    return await db.user.findMany();
}

export async function getUserById(userID: Number) {
    //TODO
}

export async function createUser(body: JsonObject) {
    //TODO create
}

export async function updateUser(userID: Number) {
    //TODO create
}

export async function deleteUser(userID: Number) {
    //TODO create
}

export const userServices = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};
