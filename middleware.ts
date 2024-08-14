import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // ユーザーが認証されていない場合、ログインページにリダイレクト
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const userRole = session.user.user_metadata.role;

  if (userRole !== "admin") {
    // 管理者以外のユーザーがダッシュボードにアクセスしようとした場合、
    // ホームページにリダイレクト
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard/members") && userRole !== "admin") {
    // 追加のチェック：管理者以外のユーザーが /dashboard/members にアクセスしようとした場合、
    // ダッシュボードのメインページにリダイレクト
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
