import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import type { Project, ToolSection } from "@/content/types";

const projectTags: Record<string, { tag: string; labelEn: string; labelZh: string }> = {
  "AI Tool": { tag: "ai", labelEn: "AI", labelZh: "AI" },
  "Browser Extension": { tag: "tool", labelEn: "Tool", labelZh: "工具" },
  Tool: { tag: "tool", labelEn: "Tool", labelZh: "工具" },
  Web: { tag: "web", labelEn: "Web", labelZh: "Web" },
};

const projectFallbackColors = ["f7f1de", "ece4cf", "ddd2b6", "f7f1de", "ece4cf"];

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function arrowMark() {
  return '<span class="arrow-mark"><svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></svg></span>';
}

function itemNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function projectStatus(project: Project) {
  if (project.status) return project.status;
  return project.featured ? "2026" : "Planned";
}

function projectCard(project: Project, index: number) {
  const meta = projectTags[project.category] ?? { tag: "web", labelEn: project.category, labelZh: project.category };
  const number = itemNumber(index);
  const color = projectFallbackColors[index % projectFallbackColors.length];

  return `
      <a href="/projects/${project.slug}" class="lab" data-reveal data-tag="${meta.tag}">
        <div class="lab-img">
          <img src="${project.image ?? `assets/lab-${index + 1}.png`}" alt="Project ${number}" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'320\\' height=\\'400\\'><rect width=\\'320\\' height=\\'400\\' fill=\\'%23${color}\\'/><text x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' font-family=\\'serif\\' font-style=\\'italic\\' font-size=\\'18\\' fill=\\'%238b8676\\'>Project ${number}</text></svg>'">
          <span class="badge" data-len>${escapeHtml(meta.labelEn)}</span><span class="badge" data-lzh>${escapeHtml(meta.labelZh)}</span>
        </div>
        <div class="num-row"><span>Nº ${number}</span><span>${escapeHtml(projectStatus(project))}</span></div>
        <h4 data-len>${escapeHtml(project.title.en)}</h4>
        <h4 data-lzh>${escapeHtml(project.title.zh)}</h4>
        <p data-len>${escapeHtml(project.summary.en)}</p>
        <p data-lzh>${escapeHtml(project.summary.zh)}</p>
        ${arrowMark()}
      </a>`;
}

function projectGridHtml() {
  return projects.map(projectCard).join("\n\n");
}

function replaceBetween(html: string, start: string, end: string, replacement: string) {
  const startIndex = html.indexOf(start);
  if (startIndex === -1) return html;
  const contentStart = startIndex + start.length;
  const endIndex = html.indexOf(end, contentStart);
  if (endIndex === -1) return html;
  return html.slice(0, contentStart) + "\n" + replacement + "\n    " + html.slice(endIndex);
}

function toolItem(item: ToolSection["items"][number]) {
  return `
          <div class="tl-item">
            <h3 class="tl-item-name">${escapeHtml(item.name)} <span class="badge">${escapeHtml(item.badge)}</span></h3>
            <p class="tl-item-desc" data-len>${escapeHtml(item.description.en)}</p>
            <p class="tl-item-desc" data-lzh>${escapeHtml(item.description.zh)}</p>
          </div>`;
}

function toolSection(section: ToolSection, index: number) {
  const number = itemNumber(index);

  return `
      <section id="${section.slug}" class="tl-section" data-reveal>
        <div class="tl-category">
          <span class="num">${number}</span>
          <h2 data-len>${escapeHtml(section.label.en)}</h2><h2 data-lzh>${escapeHtml(section.label.zh)}</h2>
          <p data-len>${escapeHtml(section.intro.en)}</p><p data-lzh>${escapeHtml(section.intro.zh)}</p>
        </div>
        <div class="tl-items">${section.items.map(toolItem).join("")}
        </div>
      </section>`;
}

function toolListHtml() {
  return toolSections.map(toolSection).join("\n\n");
}

function blogImageFallback(number: string, fill: string) {
  return `this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'300\\'><rect width=\\'400\\' height=\\'300\\' fill=\\'%23${fill}\\'/><text x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' font-family=\\'serif\\' font-style=\\'italic\\' font-size=\\'18\\' fill=\\'%238b8676\\'>Blog ${number}</text></svg>'`;
}

function blogDeckCard(postIndex: number, state: string) {
  const post = posts[postIndex % posts.length] ?? posts[0];
  const number = itemNumber(postIndex);
  const fallback = ["work-1.png", "work-2.png", "work-3.png"][postIndex % 3];
  const fallbackFill = ["ddd2b6", "ece4cf", "ddd2b6"][postIndex % 3];
  const label = post.kind;

  return `
        <a href="/blog/${post.slug}" class="work-card ${state}" data-blog-card>
          <div class="label-row">
            <span class="small-label" data-len>${escapeHtml(label)}</span>
            <span class="small-label" data-lzh>${escapeHtml(post.kindZh ?? label)}</span>
            <span class="index">${number} / 03</span>
          </div>
          <div class="img">
            <img src="${post.image ?? `assets/${fallback}`}" alt="Blog ${number}" onerror="${blogImageFallback(number, fallbackFill)}">
          </div>
          <h3 data-len>${escapeHtml(post.title.en)}</h3>
          <h3 data-lzh>${escapeHtml(post.title.zh)}</h3>
          <p data-len>${escapeHtml(post.excerpt.en)}</p>
          <p data-lzh>${escapeHtml(post.excerpt.zh)}</p>
          <div class="meta-row">
            <span class="year">${escapeHtml(post.date)} · <span data-len>${escapeHtml(post.metaLabel ?? "NOTE")}</span><span data-lzh>${escapeHtml(post.metaLabelZh ?? "笔记")}</span></span>
            <span data-len>Learning log</span><span data-lzh>学习记录</span>
          </div>
        </a>`;
}

function blogDeckHtml() {
  return [blogDeckCard(0, "is-primary"), blogDeckCard(1, "is-secondary"), blogDeckCard(2, "is-hidden-right")].join("\n");
}

function restoreBlogLabel(html: string) {
  return html.replace(
    '<span class="label" data-len>Blog</span>\n        <span class="label" data-lzh>博客</span>',
    '<span class="label">\n          <span data-len>Blog</span>\n          <span data-lzh>博客</span>\n          <span class="ix">· Nº 05</span>\n        </span>',
  );
}

export function renderHomeContent(html: string) {
  let rendered = replaceBetween(
    html,
    '<div class="labs-grid" id="projects-grid">',
    '\n    </div>\n\n    <div class="projects-foot">',
    projectGridHtml(),
  );

  rendered = replaceBetween(
    rendered,
    '<div class="work-deck" id="blog-deck" data-reveal="scale" aria-live="polite">',
    '\n      </div>\n    </div>\n\n    <div class="work-arrows">',
    blogDeckHtml(),
  );

  return restoreBlogLabel(rendered);
}

export function renderToolListContent(html: string) {
  return replaceBetween(
    html,
    '<div class="tl-list">',
    '\n\n  </main>',
    toolListHtml(),
  );
}

export function renderBlogPostContent(html: string, slug?: string) {
  const post = posts.find((item) => item.slug === slug) ?? posts[0];
  return html
    .replace("<title>Learning AI products by making prototypes — Musu</title>", `<title>${escapeHtml(post.title.en)} — Musu</title>`)
    .replace(
      "<span data-len>Learning AI products by making prototypes</span>",
      `<span data-len>${escapeHtml(post.title.en)}</span>`,
    )
    .replace("<span data-lzh>通过做原型学习 AI 产品</span>", `<span data-lzh>${escapeHtml(post.title.zh)}</span>`)
    .replace(
      "<span data-len>Notes on turning product ideas, AI workflows, and interface references into concrete product attempts.</span>",
      `<span data-len>${escapeHtml(post.excerpt.en)}</span>`,
    )
    .replace(
      "<span data-lzh>记录如何把产品想法、AI 工作流和界面参考变成一次次具体尝试。</span>",
      `<span data-lzh>${escapeHtml(post.excerpt.zh)}</span>`,
    )
    .replace("May 14, 2026", post.dateDisplay ?? post.date);
}
