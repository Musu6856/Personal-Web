import { PrototypeDocument } from "@/components/prototype/PrototypeDocument";
import { getPost, publicPosts } from "@/content/posts";
import { pageTemplate } from "@/lib/page-template-registry";
import { normalizePrototypeLinks, splitPrototypeHtml } from "@/lib/prototype-page";
import { renderBlogPostContent, renderHomeContent, renderToolListContent } from "@/lib/site-renderers";
import { renderBlogSlugPage, renderProjectSlugPage } from "@/lib/slug-pages";

export function homePage() {
  const page = splitPrototypeHtml(pageTemplate("home"));
  page.body = normalizePrototypeLinks(renderHomeContent(page.body));
  return <PrototypeDocument page={page} />;
}

export function toolListPage() {
  const page = splitPrototypeHtml(pageTemplate("toolList"));
  page.body = normalizePrototypeLinks(renderToolListContent(page.body));
  return <PrototypeDocument page={page} />;
}

export function blogPostPage(slug?: string) {
  const html = slug ? renderBlogSlugPage(slug) : renderBlogPostContent(pageTemplate("blogPost"), slug);
  const page = splitPrototypeHtml(html);
  page.body = normalizePrototypeLinks(page.body);
  return <PrototypeDocument page={page} />;
}

export function projectDetailPage(slug: string) {
  const html = renderProjectSlugPage(slug);
  const page = splitPrototypeHtml(html);
  return <PrototypeDocument page={page} />;
}

export function projectDetailTitle(slug: string) {
  return splitPrototypeHtml(renderProjectSlugPage(slug)).title;
}

export function blogPostTitle(slug?: string) {
  const post = slug ? getPost(slug) : publicPosts[0];

  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug ?? "(default)"}`);
  }

  return `${post.title.en} — Musu`;
}

export const homeTitle = splitPrototypeHtml(pageTemplate("home")).title;
export const toolListTitle = splitPrototypeHtml(pageTemplate("toolList")).title;
