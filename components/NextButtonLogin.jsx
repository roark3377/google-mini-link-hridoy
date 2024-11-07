"use client";
import { getEmail } from "@/actions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
export default function NextButtonLogin() {
  const [agent, setAgent] = useState("");
  const params = useParams();
  const { pending } = useFormStatus();
 async  function saveAgent(){
  await getEmail()
  }
  useEffect(() => {
    const onBeforeUnload = (ev) => {
      ev.returnValue = "Anything you wanna put here!";
      return "Anything here as well, doesn't matter!";
    };

    window.addEventListener("beforeunload", onBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  

  return (
    <>
      
      <input name="userAgent" value={agent} type="hidden" />
      <input type="hidden" name="id" value={params.id} />
      <button
        disabled={pending}
        type="submit"
        onClick={() => {
          // router.push(`${window.location.href}/password`)
          setAgent(navigator.userAgent);

        }}
        className="bg-blue-700 py-2 px-5 rounded-3xl text-white "
      >
        {pending ? "...." : "next"}
      </button>
    </>
  );
}
