import { SignInPage } from "../UI/pages/SignIn";
import type { RouteObject } from "react-router";
import { Default } from "../UI/pages/Default";
import { SignUpPage } from "../UI/pages/SignUp";
export const routes: RouteObject[] = [
  { path: "/", Component: Default },
  {
    path: "sign-in",
    Component: SignInPage ,
  },
  {
    path: "sign-up",
    Component: SignUpPage,
  },
];
