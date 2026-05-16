import { toolListPage, toolListTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: toolListTitle };
}

export default function UsesPage() {
  return toolListPage();
}
