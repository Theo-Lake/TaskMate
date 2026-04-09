import { z } from "zod";
import { Status, TaskTypes } from "../../../generated/prisma/enums";
import Filter  from "bad-words";
const filter = new Filter()

//TODO Use AI for description suggestion in form of a function call, check if empty and bad words (use of )
// allow for same title if not from same author (but always different author)


export const TaskSchema = z.object({
    eventID: z.never(),
    publisherID: z.never(),
    name: z
        .string()
        .trim()
        .min(5, "Event name is too small!")
        .max(20, "Event name is too Large!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    type: z.enum(TaskTypes),
    status: z.enum(Status).optional(),

    completedDate: z.coerce.date().optional(),
    dueDate: z.coerce.date().refine((d) => d > new Date(), {
        message: "Due date must be in the future",
    }),
    description: z
        .string()
        .trim()
        .min(15, "Description is too short!")
        .max(200, "Description is too large!")
        .refine((text) => !filter.isProfane(text), {
            message:"Don't use bad words!"
        }),
    images: z.array(z.url({ message: "Invalid image URL" })).optional(),
    created_at: z.never(),
    updated_at: z.never(),
});

export const TaskUpdateSchema = TaskSchema.partial();

export type Task = z.infer<typeof TaskSchema>;
