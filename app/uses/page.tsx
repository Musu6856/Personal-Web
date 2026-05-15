import { prototypeTitle, toolListPage } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: await prototypeTitle("tool-list.html") };
}

export default async function UsesPage() {
  return toolListPage();
}
