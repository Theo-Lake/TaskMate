import { db } from "../db";

//TODO revisit

const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export async function createRefreshToken(userID: number, token: string) {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRY_DAYS);

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
