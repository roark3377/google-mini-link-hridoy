"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
export default function ShowcaseEmail() {
  const [email, seEmail] = useState("");
  const params = useParams();
  useEffect(() => {
    seEmail(Cookies.get("email"));
  }, []);

  return (
    <>
      <h1>{email}</h1>
      <input type="hidden" name="email" value={email} />
      {/* <input type="hidden" name="id" value={params.id} /> */}
    </>
  );
}
