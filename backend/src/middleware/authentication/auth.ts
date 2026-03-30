import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

async function generateAccessToken(userID: number): Promise<string> {
    //promise means that it will eventually return a string since its an async function
    return jwt.sign({ userID }, JWT_SECRET, { expiresIn: "15m" });
}

async function generateRefreshToken(userID: number): Promise<string> {
    //promise means that it will eventually return a string since its an async function
    return jwt.sign({ userID }, JWT_SECRET, { expiresIn: "30d" });
}

//TODO create refreshToken table in prisma

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10); // Increase num for more security though slower hashing
}

async function comparePassword(
    password: string,
    hash: string
): Promise<boolean> {
    return bcrypt.compare(password, hash);
}

//TODO create POST for auth in login and refresh

// Need to wrap every endpoint with withAuth and verify token

export const auth = {
    generateAccessToken,
    hashPassword,
    comparePassword,
};
