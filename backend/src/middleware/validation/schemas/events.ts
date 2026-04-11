import { z } from "zod";
import { Status, EventTypes } from "../../../generated/prisma/enums";

export const EventSchema = z.object({
    name: z
        .string()
        .min(4, "Event name is too small!")
        .max(40, "Event name is too large!"),
    type: z.enum(EventTypes),
    status: z.enum(Status).optional(),
    location: z.string(),
    dueDate: z.coerce.date().refine((d) => d > new Date(), {
        message: "Due date must be in the future!",
    }),
    completedDate: z.coerce.date().optional(),
    description: z
        .string()
        .min(10, "Description is too short!")
        .max(500, "Description is too long!"),
    images: z.array(z.url({ message: "Invalid image URL" })).optional(),
});

export const EventUpdateSchema = EventSchema.partial();

export type Event = z.infer<typeof EventSchema>;
