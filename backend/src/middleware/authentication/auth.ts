import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Runs BEFORE controllers on any protected route.
// Verifies the JWT from the Authorization header and attaches userId to req.user.
//
// Usage on a route:
//   router.get("/profile", authMiddleware, userController.getProfile);
//
// The mobile app must send every request with:
//   Authorization: Bearer <token>

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = "7d"; // Token stays valid 7 days — standard for mobile

// ─── Token Utilities ────────────────────────────────────────────────────────

// Call this in your login/register controller after verifying credentials.
// Returns a signed JWT containing the userId.
export function generateToken(userId: string): string {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// ─── Auth Middleware ─────────────────────────────────────────────────────────

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or malformed Authorization header" });
        return;
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.user = { userId: decoded.userId }; // Available as req.user in all downstream controllers
        next();
    } catch {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

// ─── TODO ────────────────────────────────────────────────────────────────────
// 1. Create POST /auth/register  → hash password with bcrypt, save user, return generateToken(userId)
// 2. Create POST /auth/login     → find user by username, bcrypt.compare(), return generateToken(userId)
// 3. Add authMiddleware to every route except /auth/register and /auth/login
// 4. Set JWT_SECRET in your .env file (long random string — never commit it)