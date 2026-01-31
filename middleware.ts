import { auth } from "@/app/_lib/nextAuth";
import { NextResponse } from "next/server";



export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isAuth = !!req.auth;

  const isAuthRoute = pathname === "/login" || pathname === "/signup";
  const isProtectedRoute = pathname === "/";

  if (!isAuth && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isAuth && isAuthRoute) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
});

export const config = {
    matcher : ["/", '/login', '/signup']
}