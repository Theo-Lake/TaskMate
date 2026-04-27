import { useMutation } from "@tanstack/react-query";
import {
	login,
	logout,
	verifyEmail,
	requestPasswordReset,
	resetPassword,
} from "../api/auth";
import { signOut } from "../auth/authState";

export const useLogin = () => {
	return useMutation({
		mutationFn: (credentials: {
			password: string;
			email?: string;
			username?: string;
		}) => login(credentials),
	});
};

export const useLogout = () => {
	return useMutation({
		mutationFn: logout,
		onSuccess: () => signOut(),
	});
};

export const useVerifyEmail = () => {
	return useMutation({
		mutationFn: ({ userId, token }: { userId: number; token: string }) =>
			verifyEmail(userId, token),
	});
};

export const useRequestPasswordReset = () => {
	return useMutation({
		mutationFn: async (email: string) => {
			await requestPasswordReset(email);
		},
	});
};

export const useResetPassword = () => {
	return useMutation({
		mutationFn: async (data: { token: string; newPassword: string }) => {
			await resetPassword(data.token, data.newPassword);
		},
	});
};
