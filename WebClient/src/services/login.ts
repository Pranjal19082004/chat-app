// what i need for login is email and password
import { LOGIN_SUCCESSFUL } from "../store/actions";
import { changeUserProperties } from "../store/slices/user";
import { store } from "../store/store";
import { api } from "./api";
import { z } from "zod";
export async function loginService(
  email: string,
  password: string,
  onSucess?: () => any,
  onError?: (e: unknown) => void
) {
  try {
    const data = await api.signin({ email, password });
    const { username, userId, token } = z
      .object({ username: z.string(), userId: z.number(), token: z.string() })
      .parse(data);
	  localStorage.setItem("token", token);
	  localStorage.setItem("userId", userId.toString());
	  await store.dispatch(LOGIN_SUCCESSFUL({ username, userId, token }));
	//feth 
    onSucess?.();
  } catch (e) {
    onError?.(e);
    console.log("please login again ");
  }
}
