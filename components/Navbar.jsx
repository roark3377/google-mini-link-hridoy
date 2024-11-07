"use client";
import { logOut } from "@/actions";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import LogOutButton from "./LogOutButton";

export default function Navbar({ admin }) {
  const [userName, setUserName] = useState(null);
  useEffect(() => {
    setUserName(Cookies.get("username"));
  }, []);
  return (
    <div className="w-full justify-center relative flex md:justify-between border p-5 ">
      <Link className="hidden md:flex" href={"/"}>
        Google Hack{" "}
      </Link>
      <div className="flex gap-5 items-center text-nowrap ">
        {admin && <Link href={"/create-user"}>Create User</Link>}
        <Link href={"/dashboard"}>Welcome {userName}</Link>
        <form action={logOut}>
          <LogOutButton />
        </form>
      </div>
    </div>
  );
}
