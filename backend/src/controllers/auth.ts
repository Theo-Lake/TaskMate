import { Request, Response } from "express";
import { userServices } from "../services/users";
import { auth } from "../middleware/authentication/auth";
import { authServices } from "../services/auth";

export async function login(req: Request, res: Response) {
    try {
        const { email, username, password } = req.body;

        const user = await userServices.getUserByEmailOrUsername(
            email,
            username
        );

        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const valid = await auth.comparePassword(password, user.password_hash);

        if (!valid) {
            res.status(401).json({ error: "Invalid Credentials" });
            return;
        }

        const accessToken = await auth.generateAccessToken(user.userID);
        const refreshToken = await authServices.createRefreshToken(user.userID);

        res.cookie("refreshToken", refreshToken.token, {
            httpOnly: true,
            secure: true,
        });

        console.log("User Authentication accepted.");
        res.status(200).json({
            Message: `User successfully Authenticated`,
            accessToken,
        });
    } catch (error) {
        console.log(`An error occured while authenticating the user: ${error}`);
        res.status(500).json({ error: error });
    }
}

export async function logOut(req: Request, res: Response) {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            await authServices.revokeRefreshToken(token);
        }
        res.clearCookie("refreshToken");
        res.status(200).json({ Message: "Logged out" });
    } catch (error) {
        console.log(`An error occured while Logging out the user: ${error}`);
        res.status(500).json({ error: error });
    }
}

export async function refresh(req: Request, res: Response) {
    try {
        const token = req.cookies.refreshToken;
        if (!token) {
            res.status(401).json({ error: "No refresh token" });
            return;
        }

        const payload = auth.verifyRefreshToken(token);

        const stored = await authServices.findRefreshToken(token);
        if (!stored || stored.used) {
            res.status(401).json({ error: "Invalid refresh token" });
            return;
        }

        await authServices.revokeRefreshToken(token);
        const newRefreshToken = await authServices.createRefreshToken(
            payload.userID
        );

        const accessToken = await auth.generateAccessToken(payload.userID);
        res.cookie("refreshToken", newRefreshToken.token, {
            httpOnly: true,
            secure: true,
        });
        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(401).json({ error: "Invalid refresh token" });
    }
}

export const authController = {
    login,
    logOut,
    refresh,
};
