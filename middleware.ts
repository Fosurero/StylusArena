import { NextRequest, NextResponse } from "next/server";

const LEGACY_HOSTS = new Set(["styluspg.vercel.app", "www.styluspg.vercel.app"]);
const CANONICAL_HOST = "stylus.click";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase();

  if (!host || !LEGACY_HOSTS.has(host)) {
    return NextResponse.next();
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.protocol = "https:";
  redirectUrl.host = CANONICAL_HOST;

  return NextResponse.redirect(redirectUrl, 308);
}

export const config = {
  matcher: ["/:path*"],
};
