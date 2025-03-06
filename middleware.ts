import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  const protectedRouteRegex = /^\/dashboard/;
  const publicRoutes = ["/"];

  if (protectedRouteRegex.test(req.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (publicRoutes.includes(req.nextUrl.pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}
