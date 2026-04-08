import { de } from "zod/locales";
import { db } from "../db";
import { ApplicationStatus, Status, EventTypes } from "../generated/prisma/enums";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

async function getAllEvents() {
    return await db.event.findMany();
}

async function getEventByEventID(eventID: Number) {
    return await db.event.findUnique({
        where: { eventID: Number(eventID) }
    });
}

async function getEventsByPublisherID(publisherID: Number) {
    return await db.event.findMany({
        where: { publisherID: Number(publisherID) }
    });
}

async function createEvent(publisherID: Number, body: JsonObject) {
    let {
        name,
        type,
        location,
        peopleRequired,
        dueDate,
        description,
        images,
        hashtags
    } = body;

    return await db.event.create({
        data: {
            publisherID: Number(publisherID),
            name: name as string,
            type: type as EventTypes,
            location: location as string,
            peopleRequired: peopleRequired as number,
            dueDate: new Date(dueDate as string),
            description: description as string,
            images: images as string | undefined,
            hashtags: hashtags 
                ? {
                    connectOrCreate: (hashtags as string[]).map((tag) => ({
                        where: { name: tag},
                        create: { name: tag},
                    })),
                }
                : undefined,
        }
    });
}

async function deleteEvent(eventID: Number) {
    return await db.event.delete({
        where: { eventID: Number(eventID) }
    })
}

async function updateEvent(eventID: Number, body: JsonObject) {
    const event = await getEventByEventID(eventID);

    if (!event) throw new Error(`Event ${eventID} can't be updated as it does not exist.`);

    let {
        name,
        type,
        status,
        location,
        peopleRequired,
        dueDate,
        completedDate,
        description,
        images,
        hashtags
    } = body;

    return await db.event.update({
        where: { eventID: Number(eventID) },
        data: {
            name: name as string | undefined,
            type: type as EventTypes | undefined,
            status: status as Status | undefined,
            location: location as string | undefined,
            peopleRequired: peopleRequired as number,
            dueDate: dueDate ? new Date(dueDate as string) : undefined,
            completedDate: completedDate ? new Date(completedDate as string) : undefined,
            description: description as string | undefined,
            images: images as string | undefined,
            hashtags: hashtags
                ? {
                      set: [],
                      connectOrCreate: (hashtags as string[]).map((tag) => ({
                          where: { name: tag },
                          create: { name: tag },
                      })),
                  }
                : undefined,
        }
    });
}

async function updateEventStatus(eventID: Number, status: Status) {
    const event = await getEventByEventID(eventID);
    if (!event) throw new Error(`Event ${eventID} does not exist.`);
    
    return await db.event.update({
        where: { eventID: Number(eventID) },
        data: {
            status,
            completedDate: status === Status.complete ? new Date() : undefined,
        }
    });
}

async function applyForEvent(eventID: Number, userID: Number) {
    const event = await db.event.findUnique({
        where: { eventID: Number(eventID) },
        select: { publisherID: true },
    });
    if (!event) throw new Error(`Event ${eventID} not found`);

    const existing = await db.eventAssignment.findFirst({
        where: { eventID: Number(eventID), assigneeID: Number(userID) },
    });
    if (existing)
        throw new Error(`User ${userID} has already applied to event ${eventID}`);

    if (event.publisherID === Number(userID))
        throw new Error("Publisher cannot apply to their own event");

    await db.eventAssignment.create({
        data: { eventID: Number(eventID), assigneeID: Number(userID) },
    });
}

async function acceptApplication(eventID: Number, userID: Number) {
    const event = await db.event.findUnique({
        where: { eventID: Number(eventID) },
        select: { publisherID: true },
    });
    if (!event) throw new Error(`Event ${eventID} not found`);

    const application = await db.eventAssignment.findFirst({
        where: { eventID: Number(eventID), assigneeID: Number(userID) },
    });
    if (!application)
        throw new Error(
            `No application found for user ${userID} on event ${eventID}`
        );
    if (application.status === ApplicationStatus.accepted)
        throw new Error(`Application already accepted`);

    await db.$transaction([
        db.eventAssignment.update({
            where: { eventAssignmentID: application.eventAssignmentID },
            data: { status: ApplicationStatus.accepted },
        }),
        db.conversation.create({
            data: {
                eventEventID: Number(eventID),
                user1ID: event.publisherID,
                user2ID: Number(userID),
            },
        }),
        db.event.update({
            where: { eventID: Number(eventID) },
            data: { status: Status.pending },
        }),
    ]);
}

async function rejectApplication(eventID: Number, userID: Number) {
    const application = await db.eventAssignment.findFirst({
        where: { eventID: Number(eventID), assigneeID: Number(userID) },
    });
    if (!application)
        throw new Error(
            `No application found for user ${userID} on event ${eventID}`
        );

    await db.eventAssignment.delete({
        where: { eventAssignmentID: application.eventAssignmentID },
    });
}

async function unassignEvent(eventID: Number, userID: Number) {
    const conversation = await db.conversation.findFirst({
        //This finds the first Conversation row where both eventEventID and userID match. findUnique couldn't be used here because the filter is on a combination of non-unique fields — findUnique requires a single unique/primary key field.
        where: {
            eventEventID: Number(eventID),
            user2ID: Number(userID),
        },
        select: { conversationID: true },
    });
    if (!conversation)
        throw new Error(
            `Conversation for event ${eventID} and user ${userID} not found`
        );

    const user = await db.eventAssignment.findFirst({
        where: {
            eventID: Number(eventID),
            assigneeID: Number(userID),
        },
    });

    if (!user)
        throw new Error(`User ${userID} is not assigned to event ${eventID}`);

    const event = await db.event.findUnique({
        where: { eventID: Number(eventID) },
        select: { publisherID: true },
    });
    if (!event) throw new Error(`Event ${eventID} not found`);

    if (event.publisherID === Number(userID))
        throw new Error("Publisher can't be unassigned from their own event.");

    await db.$transaction([
        db.eventAssignment.deleteMany({
            where: {
                eventID: Number(eventID),
                assigneeID: Number(userID),
            },
        }),
        db.conversation.delete({
            where: { conversationID: conversation.conversationID },
        }),
    ]);
}


export const eventServices = {
    getAllEvents,
    getEventByEventID,
    getEventsByPublisherID,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventStatus,
    applyForEvent,
    acceptApplication,
    rejectApplication,
    unassignEvent,
};