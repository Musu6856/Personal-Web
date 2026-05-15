import { blogPostPage, prototypeTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: await prototypeTitle("blog-post.html") };
}

type BlogPostPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  return blogPostPage(slug);
}
