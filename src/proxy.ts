import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/", "/login", "/signup", "/forgot-password", "/api/auth", "/api/dictionary", "/api/ai"];

export async function proxy(request: NextRequest) {
  const sessionCookie = request.cookies.get("__session")?.value;
  const pathname = request.nextUrl.pathname;

  const isPublic = publicPaths.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  if (!sessionCookie && !isPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (sessionCookie && (pathname === "/login" || pathname === "/signup")) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
