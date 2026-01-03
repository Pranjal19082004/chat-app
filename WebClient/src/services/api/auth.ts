import { apiClient } from "./axios";
export const signin = (payload: { email: string; password: string }) =>
  apiClient.post("/auth/sign-in", payload);

export const signUp = (payload: {
  email: string;
  username: string;
  password: string;
}) => apiClient.post("/auth/sign-up", payload);
