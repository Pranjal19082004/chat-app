import { apiClient } from "./axios";
export const listUserContact = (): Promise<never[]> =>
  apiClient.get("contact/list-user-contacts").then(data=>data.contacts);
export const addUserContact = (contactId: number) =>
  apiClient.post("contact/add-contact", { contactId });
