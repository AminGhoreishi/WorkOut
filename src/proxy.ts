import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const path = request.nextUrl.pathname;

  if (token) {
    if (path.startsWith("/login") || path.startsWith("/nutrition")) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  } else {
    if (path.startsWith("/dashboard") || path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/dashboard/:path*",
    "/login/:path*",
    "/nutrition/:path*",
  ],
};
