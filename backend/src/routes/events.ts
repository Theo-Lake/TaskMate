import express from "express";
import { eventController } from "../controllers/events";
import { validate } from "../middleware/validation/validate";
import { EventSchema, EventUpdateSchema } from "../middleware/validation/schemas/events";
import { auth } from "../middleware/authentication/auth";
const router = express.Router();

router.get("/", eventController.getAllEvents);

router.get("/:eventId", eventController.getEventByEventID);

router.get("/:publisherId", eventController.getEventsByPublisherID);

router.post("/:publisherId", auth.withAuth, validate(EventSchema), eventController.createEvent);

router.delete("/:eventId", eventController.deleteEvent);

router.patch("/:eventId", auth.withAuth, validate(EventUpdateSchema), eventController.updateEvent);

router.patch("/:eventId", auth.withAuth, eventController.patchEventStatus);