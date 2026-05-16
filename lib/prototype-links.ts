import { publicBlogCompatHref } from "@/lib/public-navigation";

export function normalizePrototypeLinks(html: string) {
  return html
    .replaceAll('src="assets/', 'src="/assets/')
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('href="index.html#', 'href="/#')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="tool-list.html', 'href="/tool-list.html')
    .replaceAll('href="blog-post.html', `href="${publicBlogCompatHref()}`)
    .replaceAll('href="project-detail.html', 'href="/project-detail.html')
    .replaceAll('href="projects/', 'href="/projects/');
}
