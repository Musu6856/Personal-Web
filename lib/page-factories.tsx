import { PrototypeDocument } from "@/components/prototype/PrototypeDocument";
import { prototypeHtml } from "@/lib/prototype-html";
import { getPrototypePage, normalizePrototypeLinks, splitPrototypeHtml } from "@/lib/prototype-page";
import { renderBlogPostContent, renderHomeContent, renderToolListContent } from "@/lib/site-renderers";
import { renderBlogSlugPage, renderProjectSlugPage } from "@/lib/slug-pages";

export async function prototypePage(fileName: string) {
  const page = await getPrototypePage(fileName);
  page.body = normalizePrototypeLinks(page.body);
  return <PrototypeDocument page={page} />;
}

export async function homePage() {
  const page = await getPrototypePage("index.html");
  page.body = normalizePrototypeLinks(renderHomeContent(page.body));
  return <PrototypeDocument page={page} />;
}

export async function toolListPage() {
  const page = await getPrototypePage("tool-list.html");
  page.body = normalizePrototypeLinks(renderToolListContent(page.body));
  return <PrototypeDocument page={page} />;
}

export async function blogPostPage(slug?: string) {
  const html = slug ? await renderBlogSlugPage(slug) : renderBlogPostContent(await prototypeHtml("blog-post.html"), slug);
  const page = splitPrototypeHtml(html);
  page.body = normalizePrototypeLinks(page.body);
  return <PrototypeDocument page={page} />;
}

export async function projectDetailPage(slug: string) {
  const html = await renderProjectSlugPage(slug);
  const page = splitPrototypeHtml(html);
  return <PrototypeDocument page={page} />;
}

export async function prototypeTitle(fileName: string) {
  return (await getPrototypePage(fileName)).title;
}

export async function projectDetailTitle(slug: string) {
  return splitPrototypeHtml(await renderProjectSlugPage(slug)).title;
}
