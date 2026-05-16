import { publicPosts } from "@/content/posts";
import { blogPostPage, blogPostTitle } from "@/lib/page-factories";
import { redirect } from "next/navigation";

export function generateMetadata() {
  if (publicPosts.length === 0) {
    return { title: "Blog — Musu" };
  }

  return { title: blogPostTitle() };
}

export default function BlogPostCompatPage() {
  if (publicPosts.length === 0) {
    redirect("/#blog");
  }

  return blogPostPage();
}
