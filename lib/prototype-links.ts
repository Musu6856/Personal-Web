import { publicBlogCompatHref } from "@/lib/public-navigation";

export function publicPath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  if (!basePath || !path.startsWith("/")) return path;
  return path.startsWith(`${basePath}/`) ? path : `${basePath}${path}`;
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

  return normalized
    .replaceAll('src="/', `src="${publicPath("/")}`)
    .replaceAll('href="/', `href="${publicPath("/")}`);
}
