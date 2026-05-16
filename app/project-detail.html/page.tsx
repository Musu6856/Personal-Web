import { projectDetailPage, projectDetailTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: projectDetailTitle("paperforge") };
}

export default function ProjectDetailCompatPage() {
  return projectDetailPage("paperforge");
}
