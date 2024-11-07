import { NextResponse } from "next/server";
import { decrypt } from "./lib/auth";

export async function middleware(request) {
  // return NextResponse.redirect(new URL("/home", request.url));
  let token = request.cookies.get("token");
  if (!token) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }

  let payload = await decrypt(token.value);
  if (!payload) {
    return NextResponse.redirect(new URL("/log-in", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/dashboard/:path*",
};
