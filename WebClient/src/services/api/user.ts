import { apiClient } from "./axios";
const userInfo = (userID: number) =>
  apiClient.get("/user/", { params: { userID } });
