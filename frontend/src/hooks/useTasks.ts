import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getAllTasks,
    getAllTasksByUser,
    getTaskById,
    createTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    applyForTask,
    acceptApplication,
    rejectApplication,
    getTaskAssignmentsByTaskId,
    getTaskAssignmentsByUserId,
} from "../api/tasks";

// ─── How to use these hooks in a screen ───────────────────────────────────────
//
// READING DATA (useQuery):
//   const { data, isLoading, isError } = useAllTasks();
//
//   data      → the actual response from the backend (array of tasks etc.)
//   isLoading → true while the request is in flight — use this to show a spinner
//   isError   → true if the request failed — use this to show an error message
//
//   Example:
//     if (isLoading) return <ActivityIndicator />;
//     if (isError)   return <Text>Something went wrong</Text>;
//     return <FlatList data={data} ... />;
//
//
// CREATING / UPDATING / DELETING (useMutation):
//   const { mutate, isPending } = useCreateTask(publisherId);
//
//   mutate    → the function you call to trigger the request, pass it your data
//   isPending → true while the request is in flight (same idea as isLoading)
//
//   Example:
//     const { mutate: createTask } = useCreateTask(publisherId);
//     createTask({ name: "Study buddy", payment: 10, ... });
//
//
// After any mutation succeeds, the "tasks" cache is automatically invalidated
// so every screen showing tasks refetches fresh data without you doing anything.

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAllTasks() {
    return useQuery({
        queryKey: ["tasks"],
        queryFn: getAllTasks,
    });
}

export function useAllTasksByUser(userId: number) {
    return useQuery({
        queryKey: ["tasks", "user", userId],
        queryFn: () => getAllTasksByUser(userId),
    });
}

export function useTask(taskId: number) {
    return useQuery({
        queryKey: ["tasks", taskId],
        queryFn: () => getTaskById(taskId),
    });
}

export function useCreateTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => createTask(data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useUpdateTask(taskId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: unknown) => updateTask(taskId, data),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useUpdateTaskStatus(taskId: number) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (status: string) => updateTaskStatus(taskId, status),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useDeleteTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: number) => deleteTask(taskId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useApplyForTask() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId: number) => applyForTask(taskId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useAcceptApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, userId }: { taskId: number; userId: number }) =>
            acceptApplication(taskId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useRejectApplication() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ taskId, userId }: { taskId: number; userId: number }) =>
            rejectApplication(taskId, userId),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
    });
}

export function useTaskAssignmentsByTask(taskId: number) {
  return useQuery({
    queryKey: ["tasks", taskId, "assignments"],
    queryFn: () => getTaskAssignmentsByTaskId(taskId),
    enabled: !!taskId,
  });
}

export function useTaskAssignmentsByUser(userId: number) {
  return useQuery({
    queryKey: ["tasks", "assignments", "user", userId],
    queryFn: () => getTaskAssignmentsByUserId(userId),
    enabled: !!userId,
  });
}