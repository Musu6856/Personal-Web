import { homePage, homeTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: homeTitle };
}

export default async function HomePage() {
  return homePage();
}
