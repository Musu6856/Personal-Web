import { assets } from "@/content/assets";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { replaceRequiredPairs } from "@/lib/html-utils";
import { prototypeHtml } from "@/lib/prototype-html";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { projectDetails, renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { renderBlogPostContent } from "@/lib/site-renderers";

function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

export async function renderProjectSlugPage(slug: string) {
  const template = await prototypeHtml("project-detail.html");
  const detail = projectDetails[slug] ?? projectDetails.paperforge;
  const project = projects.find((item) => item.slug === slug) ?? projects[0];
  const images = project.detailImages ?? {
    cover: project.image ?? assets.projects.paperforge.card,
    galleryOne: assets.shared.legacyProjectLight,
    galleryTwo: assets.shared.legacyProjectDark,
    wide: assets.shared.workflowMap,
  };

  return normalizePrototypeLinks(
    replaceRequiredPairs(renderProjectDetailHtml(template, detail), [
      ["src=\"/assets/projects/paperforge/card.png\"", `src="${assetPath(images.cover)}"`, "project.coverImage"],
      ["src=\"/assets/shared/legacy-project-light.png\"", `src="${assetPath(images.galleryOne)}"`, "project.galleryOne"],
      ["src=\"/assets/shared/legacy-project-dark.png\"", `src="${assetPath(images.galleryTwo)}"`, "project.galleryTwo"],
      ["src=\"/assets/shared/workflow-map.png\"", `src="${assetPath(images.wide)}"`, "project.wideImage"],
    ]),
  );
}

export async function renderBlogSlugPage(slug: string) {
  return normalizePrototypeLinks(renderBlogPostContent(await prototypeHtml("blog-post.html"), slug));
}
