import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllConversations,
  getConversationById,
  getAllMessages,
  getMessageById,
  createMessage,
  deleteMessage,
} from "../api/conversations";

export function useAllConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: getAllConversations,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useConversation(convoId: number) {
  return useQuery({
    queryKey: ["conversations", convoId],
    queryFn: () => getConversationById(convoId),
    enabled: !!convoId,
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useConversationMessages(convoId: number) {
  return useQuery({
    queryKey: ["conversations", convoId, "messages"],
    queryFn: () => getAllMessages(convoId),
    enabled: !!convoId,
    refetchInterval: 1500,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useMessage(convoId: number, messageId: number) {
  return useQuery({
    queryKey: ["conversations", convoId, "messages", messageId],
    queryFn: () => getMessageById(convoId, messageId),
    enabled: !!convoId && !!messageId,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });
}

export function useCreateMessage(convoId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: unknown) => createMessage(convoId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversations", convoId] });
      queryClient.invalidateQueries({ queryKey: ["conversations", convoId, "messages"] });
    },
  });
}

export function useDeleteMessage(convoId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (messageId: number) => deleteMessage(convoId, messageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      queryClient.invalidateQueries({ queryKey: ["conversations", convoId] });
      queryClient.invalidateQueries({ queryKey: ["conversations", convoId, "messages"] });
    },
  });
}