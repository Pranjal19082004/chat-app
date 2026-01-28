import {  useRef } from "react";
import { api } from "../../services/api/index.ts";

export function SignUpPage() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const SignInHandler = () => {
    const [username, email, password] = [
      usernameRef.current?.value,
      emailRef.current?.value,
      passwordRef.current?.value,
    ];
    console.log(emailRef.current?.value);
    console.log(passwordRef.current?.value);
    console.log(usernameRef.current?.value);
    if (password && username && email) {
      api
        .signUp({ password, username, email })
        .then((data) => console.log(data))
        .catch((e) => console.log(e));
    } else {
      alert("bad request");
    }
  };
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="aspect-square  flex flex-col gap-5 shadow-amber-200 border-2 border-primary-700 p-4 rounded-4xl ">
        <div className="text-neutral-950 text-display-default self-center font-bold">
          {" "}
          SignUp
        </div>
        <input
          type="text"
          className="text-body-lg px-1"
          ref={usernameRef}
          placeholder="Username"
        />
        <input
          type="email"
          className="text-body-lg px-1"
          ref={emailRef}
          placeholder="Email"
        />
        <input
          type="password"
          className="text-body-lg px-1"
          ref={passwordRef}
          placeholder="Password"
        />
        <button
          className="drop-shadow-sm hover:text-neutral-50 hover:bg-primary-800 rounded-4xl px-4 py-2 w-fit self-center border-primary-600 border-1"
          onClick={SignInHandler}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
