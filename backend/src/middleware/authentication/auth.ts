import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

async function generateAccessToken(userID: number) {
    return jwt.sign({ userID }, JWT_SECRET, { expiresIn: "15m" });
}

async function generateRefreshToken(userID: number) {
    return jwt.sign({ userID }, REFRESH_TOKEN_SECRET, { expiresIn: "30d" });
}

function verifyAccessToken(token: string): { userID: number } {
    return jwt.verify(token, JWT_SECRET) as { userID: number };
}

function verifyRefreshToken(token: string): { userID: number } {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as { userID: number };
}

async function hashPassword(password: string) {
    let salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
}

async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

export const auth = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    hashPassword,
    comparePassword,
};
