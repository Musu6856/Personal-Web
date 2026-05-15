import { homePage, prototypeTitle } from "@/lib/page-factories";

export async function generateMetadata() {
  return { title: await prototypeTitle("index.html") };
}

export default async function HomePage() {
  return homePage();
}
