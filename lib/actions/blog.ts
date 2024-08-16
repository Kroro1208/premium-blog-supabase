import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../types/supabase";
import { BlogFormSchemaType } from "@/app/dashboard/schema";

// Supabaseクライアントを作成。
// SSR環境でSupabaseを使用するために設計
export function createClient() {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll().map((c) => ({
            name: c.name,
            value: c.value,
          }));
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach((cookie) => {
            cookieStore.set(cookie.name, cookie.value, cookie.options);
          });
        },
      },
    }
  );
}

export async function createBlog(data: BlogFormSchemaType) {
  const supabase = createClient();
  const { content, ...blogData } = data;

  const { data: blog, error: blogError } = await supabase
    .from("blog")
    .insert(blogData)
    .select("id")
    .single();

  if (blogError) {
    console.error("Error inserting blog:", blogError);
    return { error: blogError.message };
  }

  if (!blog) {
    return { error: "Failed to create blog post" };
  }

  const { error: contentError } = await supabase
    .from("blog_content")
    .insert({ blog_id: blog.id, content });

  if (contentError) {
    console.error("Error inserting blog content:", contentError);
    return { error: contentError.message };
  }

  return { success: true, blogId: blog.id };
}
