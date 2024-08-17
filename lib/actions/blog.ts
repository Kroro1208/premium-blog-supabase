"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import type { Database } from "../types/supabase";
import { BlogFormSchemaType } from "@/app/dashboard/schema";

// Supabaseクライアントを作成。
// SSR環境でSupabaseを使用するために設計
export async function createClient() {
  return createServerComponentClient<Database>({ cookies });
}

export async function createBlog(data: BlogFormSchemaType) {
  const supabase = await createClient();
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
