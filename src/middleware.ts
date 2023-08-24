import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const arr = [
    "/admin",
    "/admin/listed-recipes",
    "/admin/manage-recipes",
    "/admin/manage-ads",
    "/admin/settings",
    "/admin/faq",
    "/admin/list-new-recipe",
  ];
  if (arr.includes(pathname) || pathname.startsWith("/admin/manage-recipes/")) {
    if (!request.cookies.has("loggedIn")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname.includes("/admin")) {
    if (request.cookies.has("loggedIn")) {
      if (pathname === "/admin") {
        return NextResponse.redirect(
          new URL("admin/listed-recipes", request.url)
        );
      }
      if (pathname === "/admin/login") {
        console.log(pathname);
        return NextResponse.redirect(
          new URL("/admin/listed-recipes", request.url)
        );
      }
    }
  }
}

export const config = {
  matcher: ["/admin/:path*"],
  // matcher: "/admin/:path*",
};
