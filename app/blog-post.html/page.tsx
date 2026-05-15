import { blogPostPage, prototypeTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: await prototypeTitle("blog-post.html") };
}

export default async function BlogPostCompatPage() {
  return blogPostPage();
}
