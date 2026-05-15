import { describe, expect, it } from "vitest";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import { escapeHtml, replaceAllPairs, replaceOnce } from "@/lib/html-utils";
import { projectDetails, renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { prototypeHtml } from "@/lib/prototype-html";
import { renderHomeContent } from "@/lib/site-renderers";
import { renderBlogSlugPage } from "@/lib/slug-pages";
import { renderProjectSlugPage } from "@/lib/slug-pages";

function unique(values: string[]) {
  return new Set(values).size === values.length;
}

function relatedSection(html: string) {
  const start = html.indexOf('<section class="bp-related"');
  const end = html.indexOf("</section>", start);

  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);

  return html.slice(start, end);
}

describe("site content model", () => {
  it("keeps project and post slugs unique for generated routes", () => {
    expect(unique(projects.map((project) => project.slug))).toBe(true);
    expect(unique(posts.map((post) => post.slug))).toBe(true);
  });

  it("has homepage-ready featured content", () => {
    expect(profile.name).toBeTruthy();
    expect(profile.email).toContain("@");
    expect(profile.github).toMatch(/^https:\/\/github\.com\//);
    expect(profile.heroLocationLine.zh).toContain("西安");
    expect(profile.contactIntro.zh).toContain("AI 产品");
    expect(projects.filter((project) => project.featured).length).toBeGreaterThanOrEqual(2);
    expect(posts.filter((post) => post.featured).length).toBeGreaterThanOrEqual(1);
  });

  it("keeps tools addressable from the homepage cards", () => {
    expect(toolSections.map((section) => section.slug)).toEqual([
      "hardware",
      "software",
      "tech-stack",
    ]);
  });

  it("has renderable detail content for every project card", () => {
    expect(projects.map((project) => project.slug).sort()).toEqual(
      Object.keys(projectDetails).sort(),
    );
  });

  it("keeps homepage carousel content available", () => {
    expect(posts.length).toBeGreaterThanOrEqual(3);
    expect(posts.every((post) => post.kindZh && post.metaLabel && post.metaLabelZh)).toBe(true);
  });

  it("normalizes prototype links into app routes", () => {
    expect(
      normalizePrototypeLinks(
        '<a href="index.html">Home</a><a href="index.html#projects">Projects</a><a href="tool-list.html">Uses</a><a href="blog-post.html">Blog</a><a href="projects/paperforge">PaperForge</a><img src="assets/work-1.png">',
      ),
    ).toBe('<a href="/">Home</a><a href="/#projects">Projects</a><a href="/tool-list.html">Uses</a><a href="/blog/learning-ai-products-by-making-prototypes">Blog</a><a href="/projects/paperforge">PaperForge</a><img src="/assets/work-1.png">');
  });

  it("keeps HTML replacement utilities predictable", () => {
    expect(escapeHtml('<span title="Musu & AI">')).toBe("&lt;span title=&quot;Musu &amp; AI&quot;&gt;");
    expect(replaceAllPairs("one two one", [["one", "1"], ["two", "2"]])).toBe("1 2 1");
    expect(replaceOnce("card card", "card", "tile")).toBe("tile card");
  });

  it("uses the detail masthead and highlights projects on project pages", async () => {
    const html = renderProjectDetailHtml(await prototypeHtml("project-detail.html"), projectDetails.paperforge);

    expect(html).toContain('<header class="masthead container">');
    expect(html).toContain('<a href="/#projects" style="color:var(--coral);">');
    expect(html).not.toContain('<div class="topbar">');
    expect(html).not.toContain('<header class="nav" id="nav">');
  });

  it("centers the current blog post between previous and next related posts", async () => {
    const html = normalizePrototypeLinks(await renderBlogSlugPage(posts[1].slug));
    const relatedHtml = relatedSection(html);
    const relatedHrefs = [...relatedHtml.matchAll(/<a href="([^"]+)" class="bp-related-card[^"]*"/g)].map(
      (match) => match[1],
    );

    expect(relatedHrefs).toEqual([
      `/blog/${posts[0].slug}`,
      `/blog/${posts[1].slug}`,
      `/blog/${posts[2].slug}`,
    ]);
    expect(relatedHtml).toContain('class="bp-related-card is-current"');
    expect(relatedHtml).toContain('aria-current="page"');
    expect(relatedHtml).toContain("正在阅读");
    expect(relatedHtml).toContain(">Blog 01<");
    expect(relatedHtml).toContain(">Blog 02<");
    expect(relatedHtml).toContain(">Blog 03<");
    expect(relatedHtml).not.toContain('href="/projects/');
  });

  it("renders the homepage blog cards as three distinct post links", async () => {
    const html = normalizePrototypeLinks(renderHomeContent(await prototypeHtml("index.html")));
    const deckStart = html.indexOf('<div class="work-deck" id="blog-deck"');

    expect(deckStart).toBeGreaterThanOrEqual(0);

    const deckHtml = html.slice(deckStart);
    const hrefs = [...deckHtml.matchAll(/<a href="([^"]+)" class="work-card/g)].map((match) => match[1]);

    expect(hrefs.slice(0, 3)).toEqual(posts.slice(0, 3).map((post) => `/blog/${post.slug}`));
  });

  it("uses root asset paths on blog slug pages", async () => {
    const html = normalizePrototypeLinks(await renderBlogSlugPage(posts[0].slug));

    expect(html).toContain('src="/assets/work-1.png"');
    expect(html).toContain('src="/assets/pt-wide.png"');
    expect(html).not.toContain('src="assets/');
  });

  it("uses real project screenshots on project detail pages", async () => {
    const paperforgeHtml = await renderProjectSlugPage("paperforge");
    const weblearnboostHtml = await renderProjectSlugPage("weblearnboost");

    expect(paperforgeHtml).toContain('src="/assets/paperforge-1.png"');
    expect(paperforgeHtml).toContain('src="/assets/paperforge-2.png"');
    expect(paperforgeHtml).toContain('src="/assets/paperforge-3.png"');
    expect(weblearnboostHtml).toContain('src="/assets/weblearnboost-1.png"');
    expect(weblearnboostHtml).toContain('src="/assets/weblearnboost-2.png"');
    expect(weblearnboostHtml).toContain('src="/assets/weblearnboost-3.png"');
    expect(weblearnboostHtml).toContain('src="/assets/weblearnboost-4.png"');
    expect(weblearnboostHtml).not.toContain('src="assets/');
  });
});
