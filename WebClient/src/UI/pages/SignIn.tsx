import { useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { loginService } from "../../services/login.ts";

export function SignInPage() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const SignInHandler = () => {
    const [email, password] = [
      emailRef.current?.value,
      passwordRef.current?.value,
    ];
    if (email && password) {
      loginService(email, password, () => {
        console.log("out");
        nav("/");
      });
    }
  };
  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="aspect-square  flex flex-col gap-5 shadow-amber-200 border-2 p-4 rounded-4xl ">
        <div className="text-neutral-950 text-display-default self-center font-bold">
          {" "}
          SignIn
        </div>
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
          Sigin In
        </button>
      </div>
    </div>
  );
}
