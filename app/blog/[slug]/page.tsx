import { getPost } from "@/content/posts";
import { blogPostPage, blogPostTitle } from "@/lib/page-factories";
import { notFound } from "next/navigation";

type BlogPostPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return { title: blogPostTitle(slug) };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  if (!getPost(slug)) notFound();
  return blogPostPage(slug);
}
