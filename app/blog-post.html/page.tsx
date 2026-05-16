import { blogPostPage, blogPostTitle } from "@/lib/page-factories";

export function generateMetadata() {
  return { title: blogPostTitle() };
}

export default function BlogPostCompatPage() {
  return blogPostPage();
}
