import { blogPostHtml, homeHtml, projectDetailHtmlTemplate, toolListHtml } from "@/lib/page-templates";

export const pageTemplates = {
  home: homeHtml,
  blogPost: blogPostHtml,
  projectDetail: projectDetailHtmlTemplate,
  toolList: toolListHtml,
} as const;

export type PageTemplateKey = keyof typeof pageTemplates;

export function pageTemplate(key: PageTemplateKey) {
  return pageTemplates[key].replace(/^\uFEFF/, "");
}
