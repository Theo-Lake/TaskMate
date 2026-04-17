import AsyncStorage from "@react-native-async-storage/async-storage";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export async function storeTokens(accessToken: string, refreshToken: string, userId?: number) {
	await AsyncStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
	await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
	if (userId !== undefined) {
		await AsyncStorage.setItem("userId", String(userId));
	}
}

export async function getAccessToken() {
	return AsyncStorage.getItem(ACCESS_TOKEN_KEY);
}

export async function getRefreshToken() {
	return AsyncStorage.getItem(REFRESH_TOKEN_KEY);
}

export async function clearTokens() {
	await AsyncStorage.removeItem(ACCESS_TOKEN_KEY);
	await AsyncStorage.removeItem(REFRESH_TOKEN_KEY);
	await AsyncStorage.removeItem("userId");
}

// // Store both tokens after login/verify email
// storeTokens(accessToken, refreshToken)

// // Read tokens back out
// getAccessToken()
// getRefreshToken()

// // Wipe both on logout
// clearTokens()

// // Call POST /auth/refresh, store the new pair, return new access token
// refreshAccessToken()

// // The most important one — a wrapper around fetch() that:
// //   1. Attaches Authorization: Bearer <accessToken> header automatically
// //   2. If response is 401, calls refreshAccessToken() and retries once
// //   3. If refresh also fails, clears tokens and throws (user needs to log in again)
// authorizedFetch(url, options)
