import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/lib/types/supabase";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cookieStore = cookies();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables");
    return NextResponse.redirect(
      requestUrl.origin + "/auth/error?reason=config_error"
    );
  }

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map((cookie) => ({
          name: cookie.name,
          value: cookie.value,
        }));
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch (error) {
          console.log(error);
        }
      },
    },
  });

  // Check if the user is already authenticated
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) {
    return NextResponse.redirect(requestUrl.origin);
  }

  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/";

  if (!code) {
    console.error("No code provided in the URL");
    return NextResponse.redirect(
      requestUrl.origin + "/auth/error?reason=no_code"
    );
  }

  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("Error exchanging code for session:", error.message);
    return NextResponse.redirect(
      requestUrl.origin +
        `/auth/error?reason=${encodeURIComponent(error.message)}`
    );
  }

  return NextResponse.redirect(requestUrl.origin + next);
}
