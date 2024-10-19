import { useState } from "react";
import { useUser } from "../store/user.js";

const LoginPage = () => {
  // initial state for input filed
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isLoginForm, setIsLoginForm] = useState(true);

  const login = useUser((state) => state.login);

  const handaleSubmit = (event) => {
    event.preventDefault();

    // login or signup
    let uri;
    isLoginForm
      ? (uri = "http://localhost:3000/v1/auth/login")
      : (uri = "http://localhost:3000/v1/auth/signup");

    login({ uri, credentials: input });
  };

  const handleInput = (event) => {
    setInput((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  //client side validation

  return (
    <div
      onSubmit={handaleSubmit}
      className="bg-[linear-gradient(to_right,#ffecd2dd_0%,#fcb69faa_100%)] min-h-screen min-w-screen overflow-hidden"
    >
      <section className="wrapper">
        <form className=" flex justify-center items-center flex-col mt-[4vh] sm:mt-[10vh] bg-white/80 max-w-[600px] mx-auto rounded-lg px-4 drop-shadow-md">
          <p className="my-24 text-slate-600/80 text-5xl font-semibold">
            {isLoginForm ? "Login" : "Sing up"}
          </p>
          {!isLoginForm && (
            <input
              onChange={handleInput}
              name="username"
              value={input.username}
              className="w-4/5 border-b-4 border-slate-600/40 mb-8 bg-transparent h-10 outline-none active:border-slate-600/50 focus-visible:border-slate-600/60 text-xl placeholder:text-[1.2rem]"
              type="test"
              placeholder="User Name"
            />
          )}

          <input
            onChange={handleInput}
            name="email"
            value={input.email}
            className="w-4/5 border-b-4 border-slate-600/40 mb-8 bg-transparent h-10 outline-none active:border-slate-600/50 focus-visible:border-slate-600/60 text-xl placeholder:text-[1.2rem]"
            type="test"
            placeholder="Email"
          />

          <input
            onChange={handleInput}
            name="password"
            value={input.password}
            className="w-4/5 border-b-4 border-slate-600/40 mb-8 bg-transparent h-10 outline-none active:border-slate-600/50 focus-visible:border-slate-600/60 text-xl placeholder:text-[1.2rem]"
            type="password"
            placeholder="Password"
          />

          <button
            className="w-4/5 bg-[linear-gradient(to_right,#ffecd2dd_0%,#fcb69faa_100%)] py-2 sm:py-4 text-xl font-bold text-yellow-700 shadow-md drop-shadow-md mt-4"
            type="submit"
          >
            {isLoginForm ? "Login" : "Sing up"}
          </button>
          <p className="mt-12">
            {!isLoginForm
              ? "Already have account? "
              : "Don't have an account? "}

            <span
              onClick={() => {
                setIsLoginForm((prevState) => !prevState);
              }}
              className="text-blue-600 cursor-pointer underline"
            >
              {!isLoginForm ? "Login" : "Sing up"}
            </span>
          </p>
          <p className="mt-8 mb-16">
            <span>Test user EmailId: test1@gmail.com </span>
            <span>Test user password: Test@123</span>
          </p>
        </form>
      </section>
    </div>
  );
};
export default LoginPage;
