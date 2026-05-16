import { assets } from "@/content/assets";
import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { prototypeHtml } from "@/lib/prototype-html";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { projectDetails, renderProjectDetailHtml } from "@/lib/project-detail-renderer";
import { renderBlogPostContent } from "@/lib/site-renderers";

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

  return normalizePrototypeLinks(renderProjectDetailHtml(template, detail, images));
}

export async function renderBlogSlugPage(slug: string) {
  return normalizePrototypeLinks(renderBlogPostContent(await prototypeHtml("blog-post.html"), slug));
}
