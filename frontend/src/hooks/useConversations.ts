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
    refetchOnWindowFocus: true,
  });
}

export function useConversation(convoId: number) {
  return useQuery({
    queryKey: ["conversations", convoId],
    queryFn: () => getConversationById(convoId),
    enabled: !!convoId,
    refetchOnWindowFocus: true,
  });
}

export function useConversationMessages(convoId: number) {
  return useQuery({
    queryKey: ["conversations", convoId, "messages"],
    queryFn: () => getAllMessages(convoId),
    enabled: !!convoId,
  });
}

export function useMessage(convoId: number, messageId: number) {
  return useQuery({
    queryKey: ["conversations", convoId, "messages", messageId],
    queryFn: () => getMessageById(convoId, messageId),
    enabled: !!convoId && !!messageId,
    refetchOnWindowFocus: true,
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