import { apiClient } from "./axios";
export const createGroup = (
  type: "SINGLE" | "GROUP",
  Name: string,
  data: number[]
) => apiClient.post("group/create-group", { type, Name, data });
export const getUserGroups = () => apiClient.get("group/get-user-groups");
