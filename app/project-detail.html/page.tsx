import { prototypePage, prototypeTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: await prototypeTitle("project-detail.html") };
}

export default async function ProjectDetailCompatPage() {
  return prototypePage("project-detail.html");
}
