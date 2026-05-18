import { publicBlogCompatHref } from "@/lib/public-navigation";

export function publicPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath || !path.startsWith("/")) return path;
  if (path === basePath || path.startsWith(`${basePath}/`) || path.startsWith(`${basePath}#`) || path.startsWith(`${basePath}?`)) {
    return path;
  }
  return `${basePath}${path}`;
}

export function normalizePrototypeLinks(html: string) {
  const normalized = html
    .replaceAll('src="assets/', 'src="/assets/')
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('href="index.html#', 'href="/#')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="tool-list.html', 'href="/tool-list.html')
    .replaceAll('href="blog-post.html', `href="${publicBlogCompatHref()}`)
    .replaceAll('href="project-detail.html', 'href="/project-detail.html')
    .replaceAll('href="projects/', 'href="/projects/');

  return normalized.replace(/\b(src|href)="(\/[^"]*)"/g, (_match, attr: string, path: string) => {
    return `${attr}="${publicPath(path)}"`;
  });
}
