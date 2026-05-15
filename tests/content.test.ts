import { describe, expect, it } from "vitest";
import { posts } from "@/content/posts";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import { projectDetails } from "@/lib/project-detail-renderer";

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
});
