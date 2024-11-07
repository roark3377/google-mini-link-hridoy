import React from "react";
import { useFormStatus } from "react-dom";
export default function LogOutButton() {
  const { pending } = useFormStatus();
  return (
    <div>
      <button
        disabled={pending}
        type="submit"
        className={`bg-blue-700 py-2 px-5 rounded-3xl text-white ${
          pending ? "opacity-50 cursor-not-allowed" : ""
        } `}
      >
        {pending ? "....." : `Log Out`}
      </button>
    </div>
  );
}
