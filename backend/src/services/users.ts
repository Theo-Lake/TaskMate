import { db } from "../db";
import { JsonObject, Or } from "../generated/prisma/internal/prismaNamespace";
import { auth } from "../middleware/authentication/auth";

export async function getAllUsers() {
    return await db.user.findMany();
}

export async function getUserById(userID: Number) {
    return await db.user.findUnique({
        where: {
            userID: Number(userID),
        },
    });
}

export async function getUserByEmailOrUsername(
    email: String,
    username?: String
) {
    const conditions: any[] = [{ email: String(email) }];
    if (username !== undefined) conditions.push({ username: String(username) });

    return db.user.findFirst({
        where: { OR: conditions },
    });
}

export async function createUser(body: JsonObject) {
    let {
        username,
        firstName,
        lastName,
        universityID,
        email,
        password,
        occupation,
        profilePicture,
    } = body;

    const password_hash = await auth.hashPassword(password as string);

    const existingUser = await db.user.findFirst({
        where: {
            OR: [{ username: username as string }, { email: email as string }],
        },
    });

    if (existingUser) {
        throw new Error(
            existingUser.username === username
                ? "Username already taken"
                : "Email already in use"
        );
    }

    return await db.user.create({
        data: {
            username: username as string,
            firstName: firstName as string,
            lastName: lastName as string,
            universityID: Number(universityID),
            profilePicture: profilePicture as string,
            email: email as string,
            password_hash: password_hash as string,
            occupation: occupation as string,
        },
    });
}

export async function updateUser(userID: Number, body: JsonObject) {
    let {
        username,
        firstName,
        lastName,
        password,
        occupation,
        profilePicture,
    } = body;

    const password_hash =
        password !== undefined
            ? await auth.hashPassword(password as string)
            : undefined;

    return await db.user.update({
        where: { userID: Number(userID) },
        data: {
            username: username as string | undefined,
            firstName: firstName as string | undefined,
            lastName: lastName as string | undefined,
            password_hash: password_hash,
            occupation: occupation as string | undefined,
            profilePicture: profilePicture as string | undefined,
        },
    });
}

export async function deleteUser(userID: Number) {
    await db.user.delete({
        where: {
            userID: Number(userID),
        },
    });

    return;
}

export const userServices = {
    getAllUsers,
    getUserById,
    getUserByEmailOrUsername,
    createUser,
    updateUser,
    deleteUser,
};
