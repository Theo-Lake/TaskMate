import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../api/users";

//Gets current user
export const useCurrentUser = () => {
	return useQuery({
		queryKey: ["myUser"],
		queryFn: async () => {
			const userId = await AsyncStorage.getItem("userId");
			if (!userId) throw new Error("ID is null. relogin");
			return getUserById(userId);
		},
	});
};

//gets al users and saves in cache
export const useAllUsers = () => {
	return useQuery({
		queryKey: ["users"],
		queryFn: getAllUsers,
	});
};
//gets ONE user
export const useUser = (userId: string) => {
	return useQuery({
		queryKey: ["users", userId],
		queryFn: () => getUserById(userId),
		enabled: !!userId,
	});
};

//registers user
export const useCreateUser = () => {
	return useMutation({
		mutationFn: createUser,
	});
};
//updates user data
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (updateData: any) => updateUser(updateData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({ queryKey: ["myUser"] });
		},
	});
};

//deleting user(not not sure that we are going to have it? Should add to frontend)
export const useDeleteUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: deleteUser,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
};
