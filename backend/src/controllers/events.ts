import { Request, Response } from "express";
import { eventServices } from "../services/events";

async function getAllEvents(req: Request, res: Response) {
    try {
        const events = await eventServices.getAllEvents();
        console.log("Events GET all accepted.");
        res.status(200).json({ events: events });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
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
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getEventsByPublisherID(req: Request, res: Response) {
    try {
        const publisherID = Number(req.params.publisherId);
        const events = await eventServices.getEventsByPublisherID(publisherID);

        console.log("Events GET by publisher id accepted.");
        res.status(200).json({ events: events });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getAllEventAssignments(req: Request, res: Response) {
    try {
        const eventAssignments = await eventServices.getAllEventAssignments();
        console.log("Events Assignment GET ALL accepted.");
        res.status(200).json({ eventAssignments: eventAssignments });
    } catch (error) {
        console.log(
            `An error occured while trying to GET ALL event Assignments: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getEventAssignmentByEventID(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const eventAssignment =
            await eventServices.getEventAssignmentsByEventID(eventID);
        console.log("Event assignment GET by eventID accepted.");
        res.status(200).json({ eventAssignment: eventAssignment });
    } catch (error) {
        console.log(
            `An error occured while trying to GET event Assignments by eventID: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function getEventAssignmentByUserID(req: Request, res: Response) {
    try {
        const userID = Number(req.params.userId);
        const eventAssignment =
            await eventServices.getEventAssignmentsByUserID(userID);
        console.log("Event Assignments by userID GET accepted.");
        res.status(200).json({ eventAssignment: eventAssignment });
    } catch (error) {
        console.log(
            `An error occured while trying to get event Assignments by userID: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function createEvent(req: Request, res: Response) {
    try {
        const publisherID = req.user!.userID;

        await eventServices.createEvent(publisherID, req.body);
        console.log("Event POST accepted");
        res.status(200).json({ Message: "Event successfully created" });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function deleteEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to delete this event" });
            return;
        }

        await eventServices.deleteEvent(eventID);
        console.log("Event DELETE accepted.");
        res.status(200).json({
            Message: `Event ${eventID} successfully deleted`,
        });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function updateEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to update this event" });
            return;
        }

        await eventServices.updateEvent(eventID, req.body);
        console.log("Event UPDATE accepted.");
        res.status(200).json({
            Message: `Event ${eventID} successfully updated.`,
        });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function patchEventStatus(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const { status } = req.body;

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to update this event's status" });
            return;
        }

        await eventServices.updateEventStatus(eventID, status);
        console.log("Event status UPDATE accepted.");
        res.status(200).json({ Message: "Event status successfully updated" });
    } catch (error) {
        console.log(
            `An error occured while trying to get events data: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function applyForEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const userID = req.user!.userID;

        await eventServices.applyForEvent(eventID, userID);
        console.log("Event APPLICATION accepted.");
        res.status(200).json({ Message: "Successfully applied for event" });
    } catch (error) {
        console.log(`An error occured while applying for the event: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function acceptApplication(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const userID = Number(req.params.userId);

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to accept applications for this event" });
            return;
        }

        await eventServices.acceptApplication(eventID, userID);
        console.log("Event APPLICATION accepted by publisher.");
        res.status(200).json({ Message: "Application successfully accepted" });
    } catch (error) {
        console.log(
            `An error occured while accepting the application: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function rejectApplication(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const userID = Number(req.params.userId);

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to reject applications for this event" });
            return;
        }

        await eventServices.rejectApplication(eventID, userID);
        console.log("Event APPLICATION rejected by publisher.");
        res.status(200).json({ Message: "Application successfully rejected" });
    } catch (error) {
        console.log(
            `An error occured while rejecting the application: ${error}`
        );
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

async function unassignEvent(req: Request, res: Response) {
    try {
        const eventID = Number(req.params.eventId);
        const userID = Number(req.params.userId);

        const event = await eventServices.getEventByEventID(eventID);
        if (!event) {
            res.status(404).json({ error: "Event not found" });
            return;
        }
        if (event.publisherID !== req.user!.userID && userID !== req.user!.userID) {
            res.status(403).json({ error: "Not authorized to unassign from this event" });
            return;
        }

        await eventServices.unassignEvent(eventID, userID);
        console.log("Event UNASSIGN accepted.");
        res.status(200).json({ Message: "event successfully unassigned" });
    } catch (error) {
        console.log(`An error occured while unassigning the event: ${error}`);
        res.status(500).json({
            error: error instanceof Error ? error.message : error,
        });
    }
}

export const eventController = {
    getAllEvents,
    getEventByEventID,
    getEventsByPublisherID,
    getAllEventAssignments,
    getEventAssignmentByEventID,
    getEventAssignmentByUserID,
    createEvent,
    deleteEvent,
    updateEvent,
    patchEventStatus,
    applyForEvent,
    acceptApplication,
    rejectApplication,
    unassignEvent,
};
