import axios from "axios";
import { API_URL } from "./client";
import { storeTokens, clearTokens, getRefreshToken } from "../auth/auth";

// Plain axios is used here (not client) because auth endpoints don't need a token

export async function login(email: string, password: string) {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    await storeTokens(res.data.accessToken, res.data.refreshToken);
}

export async function logout() {
    const refreshToken = await getRefreshToken();
    await axios.post(`${API_URL}/auth/logout`, { refreshToken });
    await clearTokens();
}

export async function verifyEmail(userId: number, token: string) {
    const res = await axios.post(`${API_URL}/auth/verifyEmail/${userId}`, { token });
    await storeTokens(res.data.accessToken, res.data.refreshToken);
    return res.data;
}

export async function requestPasswordReset(email: string) {
    await axios.post(`${API_URL}/auth/requestPasswordReset`, { email });
}

export async function resetPassword(token: string, newPassword: string) {
    await axios.post(`${API_URL}/auth/resetPassword`, { token, newPassword });
}
