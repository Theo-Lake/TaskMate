import { de } from "zod/locales";
import { db } from "../db";
import { Status, EventTypes } from "../generated/prisma/enums";
import { JsonObject } from "../generated/prisma/internal/prismaNamespace";

async function getAllEvents() {
    return await db.emailVerificationToken.findMany();
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


export const eventServices = {
    getAllEvents,
    getEventByEventID,
    getEventsByPublisherID,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventStatus,
};