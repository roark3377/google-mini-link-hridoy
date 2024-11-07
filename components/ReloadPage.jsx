"use client";

import { useEffect } from "react";

export default function ReloadPage() {
  return (
    <div
      onLoad={() => {
        window.location.reload();
      }}
    ></div>
  );
}
