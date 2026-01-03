import { apiClient } from "./axios";
export const listUserContact = () => apiClient.get("contact/list-user-contacts");
export const addUserContact = (contactId: number) =>
  apiClient.post("contact/add-contact", { contactId });
