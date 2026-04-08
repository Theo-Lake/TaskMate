import { Request, Response } from "express";
import { eventServices } from "../services/events";

async function getAllEvents(req: Request, res: Response) {
    try {
        const events = await eventServices.getAllEvents();
        console.log("Events GET all accepted.");
        res.status(200).json({ events: events });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getEventByEventID(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const event = await eventServices.getEventByEventID(eventID);

        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }

        console.log("Event GET by event id accepted.");
        res.status(200).json({ events: event });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function getEventsByPublisherID(req: Request, res: Response) {
    try {
        const publisherID = Number(req.params.publisherId);
        const events = await eventServices.getEventsByPublisherID(publisherID);

        if (!events) {
            res.status(404).json({ error: "Event not found" });
            return;
        }

        console.log("Events GET by publisher id accepted.");
        res.status(200).json({ events: events });

    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function createEvent(req: Request, res: Response) {
    try {
        const publisherID = Number(req.params.publisherId);

        if (publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Request userID does not match authenticated user" });
            return;
        }

        await eventServices.createEvent(publisherID, req.body);
        console.log("Event POST accepted");
        res.status(200).json({ Message: "Event successfully created" });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function deleteEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const event = await eventServices.deleteEvent(eventID);

        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }

        console.log("Event DELETE accepted.");
        res.status(200).json({ Message: `Event ${eventID} successfully deleted` });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function updateEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        await eventServices.updateEvent(eventID, req.body);
        console.log("Event UPDATE accepted.");
        res.status(200).json({ Message: `Event ${eventID} successfully updated.` });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}

async function patchEventStatus(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const { status } = req.body;
        await eventServices.updateEventStatus(eventID, status);
        console.log("Event status UPDATE accepted.");
        res.status(200).json({ Message: "Event status successfully updated" });
    } catch (error) {
        console.log(`An error occured while trying to get Tasks data: ${error}`);
        res.status(500).json({ error: error instanceof Error ? error.message : error, });
    }
}


export const eventController = {
    getAllEvents,
    getEventByEventID,
    getEventsByPublisherID,
    createEvent,
    deleteEvent,
    updateEvent,
    patchEventStatus,
};