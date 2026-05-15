import { projectDetailPage, projectDetailTitle } from "@/lib/page-factories";

type ProjectPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  return { title: await projectDetailTitle(slug) };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  return projectDetailPage(slug);
}
