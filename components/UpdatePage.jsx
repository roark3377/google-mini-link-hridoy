"use client";

import { getUpdatePage } from "@/actions";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

export default function UpdatePage() {
  const { id } = useParams();
  const loadingRef = useRef(false);
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

    return () => clearInterval(intervalId);
  }, [getUpdate]);
  return <div></div>;
}
