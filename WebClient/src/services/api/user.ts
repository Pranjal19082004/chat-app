import { apiClient } from "./axios";
export const userInfo = (userID: number) =>
  apiClient.get("/user/", { params: { userID } });
