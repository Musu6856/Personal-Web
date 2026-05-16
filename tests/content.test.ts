import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { assets } from "@/content/assets";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import { escapeHtml, replaceAllPairs, replaceOnce, replaceRequiredBetween } from "@/lib/html-utils";
import { projectDetails, renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { splitPrototypeHtml } from "@/lib/prototype-page";
import { prototypeHtml } from "@/lib/prototype-html";
import { renderHomeContent, renderToolListContent } from "@/lib/site-renderers";
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

function collectAssetPaths(value: unknown): string[] {
  if (typeof value === "string") return value.startsWith("assets/") ? [value] : [];
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(collectAssetPaths);
}

const projectDetailSlots = [
  "project.titleTag",
  "project.category.en",
  "project.category.zh",
  "project.index",
  "project.title.en",
  "project.title.zh",
  "project.role.en",
  "project.role.zh",
  "project.context.en",
  "project.context.zh",
  "project.linkLabel.en",
  "project.linkLabel.zh",
  "project.link",
  "project.image.cover",
  "project.intro.en",
  "project.intro.zh",
  "project.sectionTitle.en",
  "project.sectionTitle.zh",
  "project.sectionBody.en",
  "project.sectionBody.zh",
  "project.quote.en",
  "project.quote.zh",
  "project.stack.en",
  "project.stack.zh",
  "project.image.galleryOne",
  "project.captionOne.en",
  "project.captionOne.zh",
  "project.image.galleryTwo",
  "project.captionTwo.en",
  "project.captionTwo.zh",
  "project.finalTitle.en",
  "project.finalTitle.zh",
  "project.finalBody.en",
  "project.finalBody.zh",
  "project.image.wide",
  "project.next.en",
  "project.next.zh",
  "project.nextLink",
];

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
        '<a href="index.html">Home</a><a href="index.html#projects">Projects</a><a href="tool-list.html">Uses</a><a href="blog-post.html">Blog</a><a href="projects/paperforge">PaperForge</a><img src="assets/posts/learning-ai-products-by-making-prototypes/cover.png">',
      ),
    ).toBe('<a href="/">Home</a><a href="/#projects">Projects</a><a href="/tool-list.html">Uses</a><a href="/blog/learning-ai-products-by-making-prototypes">Blog</a><a href="/projects/paperforge">PaperForge</a><img src="/assets/posts/learning-ai-products-by-making-prototypes/cover.png">');
  });

  it("reads prototype titles even when the title tag carries render metadata", () => {
    expect(splitPrototypeHtml('<title data-slot="project.titleTag">PaperForge — Project Detail</title>').title).toBe(
      "PaperForge — Project Detail",
    );
  });

  it("keeps HTML replacement utilities predictable", () => {
    expect(escapeHtml('<span title="Musu & AI">')).toBe("&lt;span title=&quot;Musu &amp; AI&quot;&gt;");
    expect(replaceAllPairs("one two one", [["one", "1"], ["two", "2"]])).toBe("1 2 1");
    expect(replaceOnce("card card", "card", "tile")).toBe("tile card");
    expect(replaceRequiredBetween("<main>[slot]</main>", "[", "]", "ok", "test.slot")).toBe("<main>[\nok\n    ]</main>");
    expect(() => replaceRequiredBetween("<main></main>", "[", "]", "ok", "missing.slot")).toThrow("missing.slot");
  });

  it("keeps semantic asset paths backed by files", () => {
    const assetPaths = collectAssetPaths(assets);

    expect(assetPaths.length).toBeGreaterThan(0);
    for (const asset of assetPaths) {
      expect(fs.existsSync(path.join(process.cwd(), "public", asset))).toBe(true);
    }
  });

  it("uses the detail masthead and highlights projects on project pages", async () => {
    const html = renderProjectDetailHtml(await prototypeHtml("project-detail.html"), projectDetails.paperforge);

    expect(html).toContain('<header class="masthead container">');
    expect(html).toContain('<a href="/#projects" style="color:var(--coral);">');
    expect(html).not.toContain('<div class="topbar">');
    expect(html).not.toContain('<header class="nav" id="nav">');
  });

  it("marks project detail content with stable render slots", async () => {
    const html = await prototypeHtml("project-detail.html");

    for (const slot of projectDetailSlots) {
      expect(html).toContain(`data-slot="${slot}"`);
    }
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

  it("renders the tool list from structured content", async () => {
    const html = normalizePrototypeLinks(renderToolListContent(await prototypeHtml("tool-list.html")));

    for (const section of toolSections) {
      expect(html).toContain(`id="${section.slug}"`);
      for (const item of section.items) {
        expect(html).toContain(escapeHtml(item.name));
      }
    }
  });

  it("uses root asset paths on blog slug pages", async () => {
    const html = normalizePrototypeLinks(await renderBlogSlugPage(posts[0].slug));

    expect(html).toContain('src="/assets/posts/learning-ai-products-by-making-prototypes/cover.png"');
    expect(html).toContain('src="/assets/shared/workflow-map.png"');
    expect(html).not.toContain('src="assets/');
  });

  it("uses real project screenshots on project detail pages", async () => {
    const paperforgeHtml = await renderProjectSlugPage("paperforge");
    const weblearnboostHtml = await renderProjectSlugPage("weblearnboost");

    expect(paperforgeHtml).toContain('src="/assets/projects/paperforge/cover.png"');
    expect(paperforgeHtml).toContain('src="/assets/projects/paperforge/model-setup.png"');
    expect(paperforgeHtml).toContain('src="/assets/projects/paperforge/editor-state.png"');
    expect(weblearnboostHtml).toContain('src="/assets/projects/weblearnboost/cover.png"');
    expect(weblearnboostHtml).toContain('src="/assets/projects/weblearnboost/wide.png"');
    expect(weblearnboostHtml).toContain('src="/assets/projects/weblearnboost/learning-map.png"');
    expect(weblearnboostHtml).toContain('src="/assets/projects/weblearnboost/question-flow.png"');
    expect(weblearnboostHtml).not.toContain('src="assets/');
  });
});
