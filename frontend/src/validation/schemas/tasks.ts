import { z } from "zod";
import { Status, TaskTypes } from "../../enums";

//TODO fix

export const TaskSchema = z.object({
	name: z
		.string()
		.min(5, "Task name is too small!")
		.max(20, "Task name is too Large!"),
	type: z.enum(TaskTypes),
	status: z.enum(Status).optional(),
	location: z
		.string()
		.min(5, "Location name is too small!")
		.max(30, "Task name is too Large!"),
	payment: z
		.number()
		.positive("Payment must be greater than 0")
		.max(1000, "Payment limit Exceeded"),
	peopleRequired: z
		.number()
		.max(100, "Too many people Required.")
		.min(1, "A person is required."),
	dueDate: z.coerce.date().refine((d) => d > new Date(), {
		message: "Due date must be in the future",
	}),
	description: z
		.string()
		.min(15, "Description is too short!")
		.max(200, "Description is too large!"),
	images: z.array(z.string().check(z.url({ message: "Invalid image URL" }))).optional(),
});

export const TaskUpdateSchema = TaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
