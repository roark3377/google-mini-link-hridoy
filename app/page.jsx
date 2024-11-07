import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="flex items-center flex-col justify-center p-24">
      <Link href={"/dashboard"}>Go to Dashboard</Link>
    </div>
  );
}
