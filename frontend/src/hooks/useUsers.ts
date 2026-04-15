import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
} from "../api/users";

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

//registeres user
export const useCreateUser = () => {
	return useMutation({
		mutationFn: createUser,
	});
};
//updates user data
export const useUpdateUser = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: ({
			userId,
			updateData,
		}: {
			userId: string;
			updateData: any;
		}) => updateUser(userId, updateData),
		//reffreshing
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
			queryClient.invalidateQueries({
				queryKey: ["users", variables.userId],
			});
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
