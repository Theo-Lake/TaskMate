import { db } from "../db";
import { auth } from "../middleware/authentication/auth";

const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export async function createRefreshToken(userID: number) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

    const token = await auth.generateRefreshToken(userID);

    return db.refreshToken.create({
        data: { token, userID, expiresAt },
    });
}

export async function findRefreshToken(token: string) {
    return db.refreshToken.findUnique({
        where: { token },
    });
}

export async function revokeRefreshToken(token: string) {
    return db.refreshToken.update({
        where: { token },
        data: { used: true },
    });
}

export const authServices = {
    createRefreshToken,
    findRefreshToken,
    revokeRefreshToken,
};
