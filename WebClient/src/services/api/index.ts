import * as authApi from "./auth";
import * as contactApi from "./contact";
import * as groupApi from "./group";
import * as messageApi from "./message";
import * as userApi from "./user";
export const api = {
  ...authApi,
  ...contactApi,
  ...groupApi,
  ...userApi,
  ...messageApi,
};
