import client from "./client";

export async function getAllEvents() {
    const res = await client.get("/events");
    return res.data;
}

export async function getEventByEventId(eventId: number) {
    const res = await client.get(`/events/byEventID/${eventId}`);
    return res.data;
}

export async function getEventsByPublisherId(publisherId: number) {
    const res = await client.get(`/events/byPublisherID/${publisherId}`);
    return res.data;
}

export async function getAllEventAssignments() {
    const res = await client.get("/events/assignments");
    return res.data;
}

export async function getEventAssignmentByEventId(eventId: number) {
    const res = await client.get(`/events/assignments/byEventId/${eventId}`);
    return res.data;
}

export async function getEventAssignmentByUserId(userId: number) {
    const res = await client.get(`/events/assignments/byPublisherId/${userId}`);
    return res.data;
}

export async function createEvent(data: unknown) {
    const res = await client.post("/events", data);
    return res.data;
}

export async function deleteEvent(eventId: number) {
    const res = await client.delete(`/events/${eventId}`);
    return res.data;
}

export async function updateEvent(eventId: number, data: unknown) {
    const res = await client.patch(`/events/${eventId}`, data);
    return res.data;
}

export async function updateEventStatus(eventId: number, status: string) {
    const res = await client.patch(`/events/${eventId}/status`, { status });
    return res.data;
}

export async function applyForEvent(eventId: number) {
    const res = await client.post(`/events/${eventId}/apply`);
    return res.data;
}

export async function acceptEventApplication(eventId: number, userId: number) {
    const res = await client.put(`/events/${eventId}/apply/${userId}/accept`);
    return res.data;
}

export async function rejectEventApplication(eventId: number, userId: number) {
    const res = await client.put(`/events/${eventId}/apply/${userId}/reject`);
    return res.data;
}

export async function unassignEvent(eventId: number, userId: number) {
    const res = await client.delete(`/events/${eventId}/apply/${userId}`);
    return res.data;
}
