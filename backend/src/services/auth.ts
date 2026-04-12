import { db } from "../db";
import { auth } from "../middleware/authentication/auth";
import crypto from "crypto";

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

async function verifyEmailToken(userID: number, token: string) {
    const existing = await db.emailVerificationToken.findFirst({
        where: {
            token: token,
            userID: userID,
        },
    });

    if (!existing) {
        throw new Error(
            `Token ${token} does not exist or not assigned to User ${userID}`
        );
    }

    if (existing.expiresAt <= new Date(Date.now())) {
        await db.emailVerificationToken.delete({
            where: {
                token: token,
            },
        });
        throw new Error(`Token ${token} has expired.`);
    }

    console.log(`User ${userID}'s email was verified using token: ${token}`);

    await db.user.update({
        where: {
            userID: userID,
        },
        data: { emailVerified: true },
    });

    await db.emailVerificationToken.delete({
        where: {
            token: token,
        },
    });
}

async function generateEmailVerificationToken(userID: number) {
    const token = crypto.randomBytes(4).toString("hex"); // random 8-char string
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); //10 minutes (its in miliseconds)
    await db.emailVerificationToken.create({
        data: {
            userID,
            token,
            expiresAt,
        },
    });

    return token;
}

async function verifyPasswordResetToken(token: string) {
    const existing = await db.emailVerificationToken.findFirst({
        where: { token },
    });

    if (!existing) {
        throw new Error("Invalid or expired token.");
    }

    if (existing.expiresAt <= new Date()) {
        await db.emailVerificationToken.delete({ where: { token } });
        throw new Error("Token has expired.");
    }

    await db.emailVerificationToken.delete({ where: { token } });

    return existing.userID;
}

export const authServices = {
    createRefreshToken,
    findRefreshToken,
    revokeRefreshToken,
    verifyEmailToken,
    generateEmailVerificationToken,
    verifyPasswordResetToken,
};
