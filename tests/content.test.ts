import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { assets } from "@/content/assets";
import { getPost, posts, publicPosts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projectDetails } from "@/content/project-details";
import { getProject, projects, publicProjects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import { escapeHtml, replaceAllPairs, replaceOnce, replaceRequiredBetween } from "@/lib/html-utils";
import { renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { blogPostTitle, projectDetailTitle } from "@/lib/page-factories";
import { pageTemplate } from "@/lib/page-template-registry";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { splitPrototypeHtml } from "@/lib/prototype-page";
import { renderHomeContent, renderToolListContent } from "@/lib/site-renderers";
import { renderBlogSlugPage } from "@/lib/slug-pages";
import { renderProjectSlugPage } from "@/lib/slug-pages";

function unique(values: string[]) {
  return new Set(values).size === values.length;
}

function collectAssetPaths(value: unknown): string[] {
  if (typeof value === "string") return value.startsWith("assets/") ? [value] : [];
  if (!value || typeof value !== "object") return [];
  return Object.values(value).flatMap(collectAssetPaths);
}

function runtimeSourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return runtimeSourceFiles(fullPath);
    return /\.(ts|tsx)$/.test(entry.name) ? [fullPath] : [];
  });
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
  const blogSlugs = [
    "noticing-ai-tools",
    "paperforge-as-product-exercise",
  ];

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
  });

  it("keeps draft projects out while publishing homepage blog posts", () => {
    expect(publicProjects.map((project) => project.slug)).toEqual(["paperforge", "weblearnboost"]);
    expect(publicPosts.map((post) => post.slug)).toEqual(blogSlugs);
    expect(getProject("promptcase")).toBeUndefined();
    expect(getProject("personal-web")).toBeUndefined();
    expect(getPost("learning-ai-products-by-making-prototypes")).toBeUndefined();
  });

  it("keeps tools addressable from the homepage cards", () => {
    expect(toolSections.map((section) => section.slug)).toEqual([
      "hardware",
      "software",
      "tech-stack",
    ]);
  });

  it("keeps project detail content in the content model for every project card", () => {
    expect(projects.map((project) => project.slug).sort()).toEqual(
      Object.keys(projectDetails).sort(),
    );
  });

  it("does not read prototype templates from app runtime code", () => {
    const runtimeFiles = [...runtimeSourceFiles("app"), ...runtimeSourceFiles("components"), ...runtimeSourceFiles("lib")]
      .filter((file) => !file.includes(path.join("lib", "page-templates") + path.sep));

    for (const file of runtimeFiles) {
      const source = fs.readFileSync(file, "utf8");

      expect(source, file).not.toMatch(/prototypeHtml|getPrototypePage|prototypePage|prototypeTitle|prototypeResponse/);
      expect(source, file).not.toMatch(/["']prototype["']/);
    }
  });

  it("keeps embedded page templates parseable and free of BOM markers", () => {
    for (const key of ["home", "blogPost", "projectDetail", "toolList"] as const) {
      const html = pageTemplate(key);

      expect(html.charCodeAt(0), key).not.toBe(0xfeff);
      expect(splitPrototypeHtml(html).body, key).toBeTruthy();
    }
  });

  it("preserves prototype head font links for every embedded page template", () => {
    for (const key of ["home", "blogPost", "projectDetail", "toolList"] as const) {
      const page = splitPrototypeHtml(pageTemplate(key));

      expect(page.headLinks, key).toContainEqual(
        expect.objectContaining({
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        }),
      );
      expect(page.headLinks, key).toContainEqual(
        expect.objectContaining({
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "",
        }),
      );
      expect(page.headLinks, key).toContainEqual(
        expect.objectContaining({
          rel: "stylesheet",
          href: expect.stringContaining("family=Inter+Tight"),
        }),
      );
    }
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
    ).toBe('<a href="/">Home</a><a href="/#projects">Projects</a><a href="/tool-list.html">Uses</a><a href="/blog/noticing-ai-tools">Blog</a><a href="/projects/paperforge">PaperForge</a><img src="/assets/posts/learning-ai-products-by-making-prototypes/cover.png">');
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
    const html = renderProjectDetailHtml(pageTemplate("projectDetail"), projectDetails.paperforge);

    expect(html).toContain('<header class="masthead container">');
    expect(html).toContain('<a href="/#projects" style="color:var(--coral);">');
    expect(html).not.toContain('<div class="topbar">');
    expect(html).not.toContain('<header class="nav" id="nav">');
  });

  it("returns project detail metadata titles synchronously", () => {
    const title = projectDetailTitle("paperforge");

    expect(typeof title).toBe("string");
    expect(title).toContain("PaperForge");
  });

  it("marks project detail content with stable render slots", async () => {
    const html = pageTemplate("projectDetail");

    for (const slot of projectDetailSlots) {
      expect(html).toContain(`data-slot="${slot}"`);
    }
  });

  it("fills project detail cover images without inline baseline gaps", async () => {
    const html = pageTemplate("projectDetail");

    expect(html).toContain(".pt-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }");
  });

  it("renders project detail figure labels as direct image text", async () => {
    const html = pageTemplate("projectDetail");

    expect(html).not.toContain("background: rgba(239, 231, 210, 0.9);");
    expect(html).not.toContain("padding: 6px 10px;");
    expect(html).not.toContain("border-radius: 4px;");
    expect(html).not.toContain("backdrop-filter: blur(2px);");
    expect(html).not.toContain("text-shadow:");
  });

  it("rejects unknown blog and project slugs instead of falling back to another page", () => {
    expect(() => renderBlogSlugPage("missing-post")).toThrow("Unknown blog post slug");
    expect(() => renderProjectSlugPage("missing-project")).toThrow("Unknown project slug");
  });

  it("renders public blog slugs while rejecting draft project slugs", () => {
    expect(() => renderBlogSlugPage("learning-ai-products-by-making-prototypes")).toThrow("Unknown blog post slug");
    expect(renderBlogSlugPage("noticing-ai-tools")).toContain("What I notice while using AI tools");
    expect(() => renderProjectSlugPage("promptcase")).toThrow("Unknown project slug");
    expect(blogPostTitle()).toBe("What I notice while using AI tools — Musu");
  });

  it("points the legacy blog entry at the first public blog post", () => {
    expect(
      normalizePrototypeLinks('<a href="blog-post.html">Blog</a><a href="index.html#blog">Archive</a>'),
    ).toBe('<a href="/blog/noticing-ai-tools">Blog</a><a href="/#blog">Archive</a>');
  });

  it("renders only public project links on the homepage", async () => {
    const html = normalizePrototypeLinks(renderHomeContent(pageTemplate("home")));
    const projectsStart = html.indexOf('<div class="labs-grid" id="projects-grid"');

    expect(projectsStart).toBeGreaterThanOrEqual(0);

    const projectsHtml = html.slice(projectsStart, html.indexOf('<div class="projects-foot">', projectsStart));

    expect(projectsHtml).toContain('href="/projects/paperforge"');
    expect(projectsHtml).toContain('href="/projects/weblearnboost"');
    expect(projectsHtml).not.toContain("promptcase");
    expect(projectsHtml).not.toContain("personal-web");
    expect(projectsHtml).not.toContain("prototype-gallery");
    expect(html).not.toContain("/projects/promptcase");
    expect(html).not.toContain("/projects/personal-web");
    expect(html).not.toContain("/projects/prototype-gallery");
  });

  it("renders public blog cards on the homepage", async () => {
    const html = normalizePrototypeLinks(renderHomeContent(pageTemplate("home")));
    const deckStart = html.indexOf('id="blog-deck"');

    expect(deckStart).toBeGreaterThanOrEqual(0);

    const deckOpenStart = html.lastIndexOf("<div", deckStart);
    const deckOpen = html.slice(deckOpenStart, html.indexOf(">", deckStart) + 1);
    const deckHtml = html.slice(deckOpenStart);
    const hrefs = [...deckHtml.matchAll(/<a href="([^"]+)" class="work-card/g)].map((match) => match[1]);

    expect(deckOpen).toContain('class="work-deck is-pair"');
    expect(hrefs).toEqual(blogSlugs.map((slug) => `/blog/${slug}`));
    expect(new Set(hrefs).size).toBe(hrefs.length);
    expect(deckHtml).not.toContain("Learning AI products by making prototypes");
    expect(deckHtml).not.toContain("/blog/learning-ai-products-by-making-prototypes");
    expect(deckHtml).toContain("What I notice while using AI tools");
    expect(deckHtml).toContain("PaperForge as a product exercise");
  });

  it("keeps the mobile blog deck to a single visible card", () => {
    const html = pageTemplate("home");
    const mobileMediaStart = html.indexOf("@media (max-width: 560px)");

    expect(mobileMediaStart).toBeGreaterThanOrEqual(0);

    const mobileMediaEnd = html.indexOf("</style>", mobileMediaStart);
    const mobileCss = html.slice(mobileMediaStart, mobileMediaEnd);

    expect(mobileCss).toContain(".work-card.is-primary");
    expect(mobileCss).toContain(".work-card.is-secondary");
    expect(mobileCss).toContain(".work-card.is-hidden-right");
    expect(mobileCss).toContain("visibility: visible");
    expect(mobileCss).toContain("visibility: hidden");
    expect(mobileCss).toContain("opacity: 0");
    expect(mobileCss).toContain("pointer-events: none");
  });

  it("keeps public project detail pages from linking to draft content", async () => {
    const paperforgeHtml = normalizePrototypeLinks(await renderProjectSlugPage("paperforge"));
    const weblearnboostHtml = normalizePrototypeLinks(await renderProjectSlugPage("weblearnboost"));

    expect(paperforgeHtml).toContain('href="/projects/weblearnboost"');
    expect(weblearnboostHtml).toContain('href="/projects/paperforge"');

    for (const html of [paperforgeHtml, weblearnboostHtml]) {
      expect(html).not.toContain("/projects/promptcase");
      expect(html).not.toContain("/projects/personal-web");
      expect(html).not.toContain("/projects/prototype-gallery");
      expect(html).not.toContain("/blog/learning-ai-products-by-making-prototypes");
    }
  });

  it("reveals the homepage hero image from above", async () => {
    const html = pageTemplate("home");

    expect(html).toContain('<div class="hero-art" data-reveal="drop">');
    expect(html).toContain("[data-reveal='drop'] { translate: 0 -48px; scale: 0.985; }");
  });

  it("keeps the tool list structure aligned with the original prototype", async () => {
    const html = normalizePrototypeLinks(renderToolListContent(pageTemplate("toolList")));

    for (const section of toolSections) {
      expect(html).toContain(`id="${section.slug}"`);
    }

    expect(html).toContain('<h2 data-len>Software &amp; Editor</h2>');
    expect(html).toContain('Windows Laptop <span class="badge">Daily Driver</span>');
    expect(html).toContain('JavaScript <span class="badge">Frontend</span>');
    expect(html).toContain('Next.js <span class="badge">Framework</span>');
    expect(html).not.toContain('<span class="num">');
    expect(html).not.toContain("The everyday devices I use for prototypes");
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
