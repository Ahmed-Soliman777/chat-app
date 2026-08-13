import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/chat") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/auth/setup-profile") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((pathname === "/" || pathname === "/auth/signup") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/chat", "/auth/setup-profile", "/", "/auth/signup"],
};
