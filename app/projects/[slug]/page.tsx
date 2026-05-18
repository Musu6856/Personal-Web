import { getProject, publicProjects } from "@/content/projects";
import { projectDetailPage, projectDetailTitle } from "@/lib/page-factories";
import { notFound } from "next/navigation";

type ProjectPageProps = {
  params: Promise<{ slug: string }> | { slug: string };
};

export function generateStaticParams() {
  return publicProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return { title: projectDetailTitle(slug) };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  if (!getProject(slug)) notFound();
  return projectDetailPage(slug);
}
