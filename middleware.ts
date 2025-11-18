import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session }
  } = await supabase.auth.getSession();

  const path = req.nextUrl.pathname;

  const publicPaths = ["/", "/login", "/register", "/auth/callback"];
  const isPublic = publicPaths.includes(path);

  // No autenticado intenta acceso privado
  if (!session && !isPublic) {
    //  TODO
    // return NextResponse.redirect(new URL("/login", req.url));
  }

  // Autenticado intenta entrar a login/register
  if (session && ["/login", "/register"].includes(path)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("rol")
      .eq("id", session.user.id)
      .single();

    if (profile?.rol === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/usuario", req.url));
    }
  }

  return res;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
