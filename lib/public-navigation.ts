import { publicPosts } from "@/content/posts";
import { publicProjects } from "@/content/projects";
import { escapeHtml } from "@/lib/html-utils";

export function publicBlogCompatHref() {
  const firstPost = publicPosts[0];
  return firstPost ? `/blog/${firstPost.slug}` : "/#blog";
}

export function publicProjectHref(slug: string) {
  return `/projects/${slug}`;
}

function footerProjectLinksHtml(indent: string) {
  return publicProjects
    .map(
      (project) =>
        `${indent}<li><a href="${publicProjectHref(project.slug)}"><span data-len>${escapeHtml(project.title.en)}</span><span data-lzh>${escapeHtml(project.title.zh)}</span></a></li>`,
    )
    .join("\n");
}

function footerBlogLinksHtml(indent: string) {
  if (publicPosts.length === 0) {
    return `${indent}<li><a href="/#blog"><span data-len>Notes coming soon</span><span data-lzh>笔记准备中</span></a></li>`;
  }

  return publicPosts
    .map(
      (post) =>
        `${indent}<li><a href="/blog/${post.slug}"><span data-len>${escapeHtml(post.title.en)}</span><span data-lzh>${escapeHtml(post.title.zh)}</span></a></li>`,
    )
    .join("\n");
}

export function renderPublicFooterContent(html: string, indent = "          ") {
  let projectCount = 0;
  let blogCount = 0;
  const renderedProjects = html.replace(
    /(<h5 data-len>Projects<\/h5><h5 data-lzh>[^<]*<\/h5>\s*<ul>)[\s\S]*?(\s*<\/ul>)/,
    (_match, start: string, end: string) => {
      projectCount += 1;
      return `${start}\n${footerProjectLinksHtml(indent)}\n${end}`;
    },
  );
  const rendered = renderedProjects.replace(
    /(<h5 data-len>Blog<\/h5><h5 data-lzh>[^<]*<\/h5>\s*<ul>)[\s\S]*?(\s*<\/ul>)/,
    (_match, start: string, end: string) => {
      blogCount += 1;
      return `${start}\n${footerBlogLinksHtml(indent)}\n${end}`;
    },
  );

  if (projectCount !== 1) {
    throw new Error(`Expected one footer projects list, found ${projectCount}.`);
  }

  if (blogCount !== 1) {
    throw new Error(`Expected one footer blog list, found ${blogCount}.`);
  }

  return rendered;
}
