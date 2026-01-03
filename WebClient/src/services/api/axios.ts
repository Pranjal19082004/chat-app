import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
apiClient.interceptors.request.use(
  (c) => {
    if (!localStorage.getItem("token")) {
      return Promise.reject("NO_AUTH_TOKEN");
    }
    return c;
  },
  (err) => {
    return Promise.reject("NO_AUTH_TOKEN");
  }
);
apiClient.interceptors.response.use((c) => {
  return c.data;
});
export { apiClient };
