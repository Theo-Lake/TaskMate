import { db } from "../db";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

export async function getAllUsers() {
    return db.user.findMany();
}

//TODO get UserById

export async function createUser(body: JsonObject) {
    //TODO create
}

export async function updateUser(body: JsonObject) {
    //TODO create
}

export async function deleteUser(body: JsonObject) {
    //TODO create
}

export const userServices = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
