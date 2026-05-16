import { assets } from "@/content/assets";
import { getPost } from "@/content/posts";
import { getProject } from "@/content/projects";
import { pageTemplate } from "@/lib/page-template-registry";
import { normalizePrototypeLinks } from "@/lib/prototype-links";
import { projectDetailHtml } from "@/lib/project-detail-renderer";
import { renderBlogPostContent } from "@/lib/site-renderers";

export function renderProjectSlugPage(slug: string) {
  const project = getProject(slug);

  if (!project) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  const images = project.detailImages ?? {
    cover: project.image ?? assets.projects.paperforge.card,
    galleryOne: assets.shared.legacyProjectLight,
    galleryTwo: assets.shared.legacyProjectDark,
    wide: assets.shared.workflowMap,
  };

  return projectDetailHtml(slug, images);
}

export function renderBlogSlugPage(slug: string) {
  if (!getPost(slug)) {
    throw new Error(`Unknown blog post slug: ${slug}`);
  }

  return normalizePrototypeLinks(renderBlogPostContent(pageTemplate("blogPost"), slug));
}
