"use client";

import { useEffect } from "react";

export default function PageLeaveMessage() {
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

  return <div></div>;
}
