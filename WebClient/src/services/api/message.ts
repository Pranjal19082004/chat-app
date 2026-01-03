import { apiClient } from "./axios";

export const getMessages = (
  groupId: number,
  lastMessageId: number | undefined = undefined,
  pageSize: number | undefined = undefined
) => apiClient.get("/message/getMessages/", { params: { groupId ,lastMessageId , pageSize } });
