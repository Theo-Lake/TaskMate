import client from "./client";

// ─── API Functions ────────────────────────────────────────────────────────────
// These are the raw calls to the backend. Don't call these directly in screens
// — use the hooks in src/hooks/useTasks.ts instead.

export async function getAllTasks() {
	const res = await client.get("/tasks");
	return res.data;
}

export async function getAllTasksByUser(userId: number) {
	const res = await client.get(`/tasks/byUserId/${userId}`);
	return res.data;
}

export async function getTaskById(taskId: number) {
	const res = await client.get(`/tasks/byTaskId/${taskId}`);
	return res.data;
}

export async function createTask(data: unknown) {
	const res = await client.post(`/tasks`, data);
	return res.data;
}

export async function updateTask(taskId: number, data: unknown) {
	const res = await client.patch(`/tasks/${taskId}`, data);
	return res.data;
}

export async function updateTaskStatus(taskId: number, status: string) {
	const res = await client.patch(`/tasks/${taskId}/status`, { status });
	return res.data;
}

export async function deleteTask(taskId: number) {
	const res = await client.delete(`/tasks/${taskId}`);
	return res.data;
}

export async function applyForTask(taskId: number) {
	const res = await client.post(`/tasks/${taskId}/apply`);
	return res.data;
}

export async function acceptApplication(taskId: number, userId: number) {
	const res = await client.put(`/tasks/${taskId}/apply/${userId}/accept`);
	return res.data;
}

export async function rejectApplication(taskId: number, userId: number) {
	const res = await client.put(`/tasks/${taskId}/apply/${userId}/reject`);
	return res.data;
}
