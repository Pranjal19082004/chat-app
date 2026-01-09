import { apiClient } from "./axios";

export const getMessages = (
  groupId: number,
  lastMessageId: number | undefined = undefined,
  pageSize: number | undefined = undefined
) =>
  apiClient.get(`/message/get-messages/${groupId}`, {
    params: { lastMessageId, pageSize },
  });

export const getMessagesAfter = (groupId: number, mssgId: number) =>
  apiClient.get(`/message/get-messages-after/`, {
    params: {
      id: mssgId,
      groupId,
    },
  });
