export function normalizePrototypeLinks(html: string) {
  return html
    .replaceAll('src="assets/', 'src="/assets/')
    .replaceAll('href="assets/', 'href="/assets/')
    .replaceAll('href="index.html#', 'href="/#')
    .replaceAll('href="index.html"', 'href="/"')
    .replaceAll('href="tool-list.html', 'href="/tool-list.html')
    .replaceAll('href="blog-post.html', 'href="/blog/learning-ai-products-by-making-prototypes')
    .replaceAll('href="project-detail.html', 'href="/project-detail.html')
    .replaceAll('href="projects/', 'href="/projects/');
}
