import axios from "axios";
import { getAccessToken, getRefreshToken, storeTokens, clearTokens } from "../auth/auth";
import { signOut } from "../auth/authState";

export const API_URL = process.env.EXPO_PUBLIC_API_URL!;

const client = axios.create({ baseURL: API_URL });

// Runs before every request — attaches the access token to the Authorization header
client.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Runs after every response
// If we get a 401 (token expired), try to refresh once and retry the original request
// If refresh also fails, wipe tokens so the user gets sent back to login
client.interceptors.response.use(
    (response) => response,
    async (error) => {
        const original = error.config;

        if (error.response?.status === 401 && !original._retry) {
            original._retry = true; // flag to prevent infinite retry loop

            try {
                const refreshToken = await getRefreshToken();
                // Use plain axios here, NOT client — avoids triggering this interceptor again
                const res = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
                await storeTokens(res.data.accessToken, res.data.refreshToken);
                original.headers.Authorization = `Bearer ${res.data.accessToken}`;
                return client(original); // retry the original request with the new token
            } catch {
                await clearTokens();
                signOut();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default client;
