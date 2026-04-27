import { z } from "zod";
import { Status, EventTypes } from "../../enums";

//TODO fix
export const EventSchema = z.object({
	name: z
		.string()
		.min(4, "Event name is too small!")
		.max(40, "Event name is too large!"),
	type: z.enum(EventTypes),
	location: z.string(),
	peopleRequired: z
		.number()
		.max(500, "Too many people.")
		.min(1, "At least one person is required"),
	dueDate: z.coerce.date().refine((d) => d > new Date(), {
		message: "Due date required",
	}),
	description: z
		.string()
		.min(10, "Description is too short!")
		.max(500, "Description is too long!"),
	images: z.array(z.url({ message: "Invalid image URL" })).optional(),
});

export const EventUpdateSchema = EventSchema.partial();

export type Event = z.infer<typeof EventSchema>;
