import { describe, expect, it } from "vitest";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import { escapeHtml, replaceAllPairs, replaceOnce } from "@/lib/html-utils";
import { projectDetails } from "@/lib/project-detail-renderer";
import { renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { prototypeHtml } from "@/lib/prototype-html";

function unique(values: string[]) {
  return new Set(values).size === values.length;
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
        '<a href="index.html">Home</a><a href="index.html#projects">Projects</a><a href="tool-list.html">Uses</a><a href="projects/paperforge">PaperForge</a>',
      ),
    ).toBe('<a href="/">Home</a><a href="/#projects">Projects</a><a href="/tool-list.html">Uses</a><a href="/projects/paperforge">PaperForge</a>');
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
});
