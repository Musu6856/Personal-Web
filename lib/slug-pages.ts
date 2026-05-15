import { posts } from "@/content/posts";
import { projects } from "@/content/projects";
import { prototypeHtml } from "@/lib/prototype-html";
import { normalizeNestedLinks, projectDetails, renderProjectDetailHtml } from "@/lib/project-detail-renderer";

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function replaceAll(html: string, replacements: Array<[string, string]>) {
  return replacements.reduce((current, [from, to]) => current.replaceAll(from, to), html);
}

function first<T>(items: T[], fallback: T) {
  return items[0] ?? fallback;
}

export async function renderProjectSlugPage(slug: string) {
  const template = await prototypeHtml("project-detail.html");
  const detail = projectDetails[slug] ?? projectDetails.paperforge;
  const project = projects.find((item) => item.slug === slug) ?? projects[0];

  const html = renderProjectDetailHtml(template, detail);
  const figureData = [
    ["PaperForge Preview", project.image ?? "assets/lab-1.png"],
    ["WebLearnBoost Preview", project.image ?? "assets/lab-2.png"],
  ];

  return normalizeNestedLinks(
    replaceAll(html, [
      ["<title>PaperForge — Project Detail</title>", `<title>${escapeHtml(project.title.en)} — Project Detail</title>`],
      ["<span data-len>PaperForge: An AI writing workspace for research <em>model setup</em><span class=\"dot\">.</span></span>", `<span data-len>${detail.titleEn}</span>`],
      ["<span data-lzh>PaperForge：面向研究<em>模型设定</em>的 AI 写作工作台<span class=\"dot\">。</span></span>", `<span data-lzh>${detail.titleZh}</span>`],
      ["<div class=\"meta-col\">\n          <span class=\"mlabel\" data-len>Role</span><span class=\"mlabel\" data-lzh>角色</span>\n          <span class=\"mval\" data-len>Product & Prototype</span><span class=\"mval\" data-lzh>产品与原型</span>\n        </div>", `<div class="meta-col">\n          <span class="mlabel" data-len>Role</span><span class="mlabel" data-lzh>角色</span>\n          <span class="mval" data-len>${detail.roleEn}</span><span class="mval" data-lzh>${detail.roleZh}</span>\n        </div>`],
      ["<div class=\"meta-col\">\n          <span class=\"mlabel\" data-len>Context</span><span class=\"mlabel\" data-lzh>背景</span>\n          <span class=\"mval\" data-len>AI Product Exploration</span><span class=\"mval\" data-lzh>AI 产品探索</span>\n        </div>", `<div class="meta-col">\n          <span class="mlabel" data-len>Context</span><span class="mlabel" data-lzh>背景</span>\n          <span class="mval" data-len>${detail.contextEn}</span><span class="mval" data-lzh>${detail.contextZh}</span>\n        </div>`],
      ["<div class=\"meta-col\">\n          <span class=\"mlabel\" data-len>Live Link</span><span class=\"mlabel\" data-lzh>线上地址</span>\n          <a href=\"https://paperforge-sable.vercel.app/\" target=\"_blank\" rel=\"noreferrer noopener\" class=\"mval\" style=\"color:var(--coral);text-decoration:none;\">paperforge-sable.vercel.app ↗</a>\n        </div>", `<div class="meta-col">\n          <span class="mlabel" data-len>${detail.linkLabelEn}</span><span class="mlabel" data-lzh>${detail.linkLabelZh}</span>\n          <a href="${detail.linkHref}" target="_blank" rel="noreferrer noopener" class="mval" style="color:var(--coral);text-decoration:none;">${detail.linkText}</a>\n        </div>`],
      [first(figureData, ["PaperForge Preview", "assets/lab-1.png"])[0], project.title.en],
      ["<a href=\"projects/weblearnboost\" class=\"btn-ghost\">", `<a href="/projects/${detail.nextHref.split("/").pop()}" class="btn-ghost">`],
      ["<h2 data-len>WebLearnBoost</h2>", `<h2 data-len>${detail.nextEn}</h2>`],
      ["<h2 data-lzh>WebLearnBoost</h2>", `<h2 data-lzh>${detail.nextZh}</h2>`],
    ]),
  );
}

export async function renderBlogSlugPage(slug: string) {
  const template = await prototypeHtml("blog-post.html");
  const post = posts.find((item) => item.slug === slug) ?? posts[0];

  return replaceAll(template, [
    ["<title>Learning AI products by making prototypes — Musu</title>", `<title>${escapeHtml(post.title.en)} — Musu</title>`],
    ["<span data-len>Learning AI products by making prototypes</span>", `<span data-len>${escapeHtml(post.title.en)}</span>`],
    ["<span data-lzh>通过做原型学习 AI 产品</span>", `<span data-lzh>${escapeHtml(post.title.zh)}</span>`],
    ["<span data-len>Notes on turning product ideas, AI workflows, and interface references into concrete product attempts.</span>", `<span data-len>${escapeHtml(post.excerpt.en)}</span>`],
    ["<span data-lzh>记录如何把产品想法、AI 工作流和界面参考变成一次次具体尝试。</span>", `<span data-lzh>${escapeHtml(post.excerpt.zh)}</span>`],
    ["<span class=\"date\">May 14, 2026 &nbsp;·&nbsp; <span data-len>6 min read</span><span data-lzh>阅读 6 分钟</span></span>", `<span class="date">${escapeHtml(post.dateDisplay ?? post.date)} &nbsp;·&nbsp; <span data-len>${escapeHtml(post.readTime)}</span><span data-lzh>${escapeHtml(post.readTime)}</span></span>`],
    ["<span class=\"name\">Musu</span>", `<span class="name">Musu</span>`],
    ["<span data-len>What I notice while using AI tools</span>", `<span data-len>${escapeHtml(posts[1]?.title.en ?? post.title.en)}</span>`],
    ["<span data-lzh>我在使用 AI 工具时观察到的事情</span>", `<span data-lzh>${escapeHtml(posts[1]?.title.zh ?? post.title.zh)}</span>`],
  ]);
}
