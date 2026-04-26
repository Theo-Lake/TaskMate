import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllEvents,
  getEventByEventId,
  getEventsByPublisherId,
  createEvent,
  updateEvent,
  updateEventStatus,
  deleteEvent,
  applyForEvent,
  acceptEventApplication,
  rejectEventApplication,
  unassignEvent,
  getAllEventAssignments,
  getEventAssignmentByEventId,
  getEventAssignmentByUserId,
} from "../api/events";

// ─── How to use these hooks in a screen ───────────────────────────────────────
//
// READING DATA (useQuery):
//   const { data, isLoading, isError } = useAllEvents();
//
//   data      → the actual response from the backend (array of events etc.)
//   isLoading → true while the request is in flight — use this to show a spinner
//   isError   → true if the request failed — use this to show an error message
//
//   Example:
//     if (isLoading) return <ActivityIndicator />;
//     if (isError)   return <Text>Something went wrong</Text>;
//     return <FlatList data={data} ... />;
//
//
// CREATING / UPDATING / DELETING (useMutation):
//   const { mutate, isPending } = useCreateEvent();
//
//   mutate    → the function you call to trigger the request, pass it your data
//   isPending → true while the request is in flight (same idea as isLoading)
//
//   Example:
//     const { mutate: createEvent } = useCreateEvent();
//     createEvent({ name: "Football match", ... });
//
//
// After any mutation succeeds, the "events" cache is automatically invalidated
// so every screen showing events refetches fresh data without you doing anything.

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useAllEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
}

export function useAllEventsByUser(publisherId: number) {
  return useQuery({
    queryKey: ["events", "user", publisherId],
    queryFn: () => getEventsByPublisherId(publisherId),
  });
}

export function useEvent(eventId: number) {
  return useQuery({
    queryKey: ["events", eventId],
    queryFn: () => getEventByEventId(eventId),
  });
}

export function useCreateEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => createEvent(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEvent(eventId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: unknown) => updateEvent(eventId, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUpdateEventStatus(eventId: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: string) => updateEventStatus(eventId, status),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useDeleteEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(eventId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useApplyForEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId: number) => applyForEvent(eventId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useAcceptEventApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: number; userId: number }) =>
      acceptEventApplication(eventId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useRejectEventApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: number; userId: number }) =>
      rejectEventApplication(eventId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useUnassignEvent() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ eventId, userId }: { eventId: number; userId: number }) =>
      unassignEvent(eventId, userId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
}

export function useAllEventAssignments(){
  return useQuery({
    queryKey:['eventAssignments'],
    queryFn: getAllEventAssignments,
  })
}

export function useEventAssignmentsByEvent(eventId: number){
  return useQuery({
    queryKey:['eventAssignments','event', eventId],
    queryFn: () => getEventAssignmentByEventId(eventId),
    enabled: !!eventId,
  })
}
export function useEventAssignmentsByUser(userId: number){
  return useQuery({
    queryKey:['eventAssignments','user', userId],
    queryFn: () => getEventAssignmentByUserId(userId),
    enabled: !!userId,
  })
}