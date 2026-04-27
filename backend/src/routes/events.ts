import express from "express";
import { eventController } from "../controllers/events";
import { validate } from "../middleware/validation/validate";
import {
    EventSchema,
    EventUpdateSchema,
} from "../middleware/validation/schemas/events";
import { auth } from "../middleware/authentication/auth";
const router = express.Router();

// Get all events
router.get("/", eventController.getAllEvents);

// Get By Event ID
router.get("/byEventID/:eventId", eventController.getEventByEventID);

// Get By Publisher ID
router.get(
    "/byPublisherID/:publisherId",
    eventController.getEventsByPublisherID
);

// Get all event applications
router.get("/assignments", eventController.getAllEventAssignments);

// Get applications by eventID
router.get(
    "/assignments/byEventId/:EventId",
    eventController.getEventAssignmentByEventID
);

// Get applications by userID
router.get(
    "/assignments/byPublisherId/:UserId",
    eventController.getEventAssignmentByUserID
);

// Create Event
router.post(
    "/",
    auth.withAuth,
    validate(EventSchema),
    eventController.createEvent
);

// Delete Event
router.delete("/:eventId", auth.withAuth, eventController.deleteEvent);

// Update Event
router.patch(
    "/:eventId",
    auth.withAuth,
    validate(EventUpdateSchema),
    eventController.updateEvent
);

// Update Event Status
router.patch(
    "/:eventId/status",
    auth.withAuth,
    eventController.patchEventStatus
);

// Create Event Application
router.post(
    "/:eventId/apply",
    auth.withAuth,
    eventController.applyForEvent
);
// Update application with accepted
router.put(
    "/:eventId/apply/:userId/accept",
    auth.withAuth,
    eventController.acceptApplication
);
// Update application with rejected
router.put(
    "/:eventId/apply/:userId/reject",
    auth.withAuth,
    eventController.rejectApplication
);
// Delete assignment from event
router.delete(
    "/:eventId/apply/:userId",
    auth.withAuth,
    eventController.unassignEvent
);

export default router;
