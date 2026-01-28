import "./App.css";
import { router } from "./routes/index.ts";
import { Default } from "./UI/pages/Default";
import { SignInPage } from "./UI/pages/SignIn";
import { SignUpPage } from "./UI/pages/SignUp";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
function App() {
  return <RouterProvider router={router}/>;
}

export default App;
