import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
/*I have changed the way how functions getting Access tockens, 
because with old way was to fast for app to load tockens
PS Theo, sorry for modifying backend)*/

async function generateAccessToken(userID: number) {
    return jwt.sign({ userID }, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: "15m" });
}

async function generateRefreshToken(userID: number) {
    return jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: "30d" });
}

function verifyAccessToken(token: string): { userID: number } {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as { userID: number };
}

function verifyRefreshToken(token: string): { userID: number } {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as { userID: number };
}

function withAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "No token" });
        return;
    }
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        next();
    } catch {
        res.status(401).json({ error: "Invalid token" });
    }
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
    withAuth,
    hashPassword,
    comparePassword,
};
