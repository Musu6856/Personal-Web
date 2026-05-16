import { escapeHtml } from "@/lib/html-utils";
import { prototypeHtml } from "@/lib/prototype-html";
import { normalizePrototypeLinks } from "@/lib/prototype-links";

type ProjectDetail = {
  titleTag: string;
  categoryEn: string;
  categoryZh: string;
  index: string;
  titleEn: string;
  titleZh: string;
  roleEn: string;
  roleZh: string;
  contextEn: string;
  contextZh: string;
  linkLabelEn: string;
  linkLabelZh: string;
  linkHref: string;
  linkText: string;
  coverAlt: string;
  coverFallback: string;
  introEn: string;
  introZh: string;
  sectionTitleEn: string;
  sectionTitleZh: string;
  sectionBodyEn: string;
  sectionBodyZh: string;
  quoteEn: string;
  quoteZh: string;
  stackEn: string;
  stackZh: string;
  captionOneEn: string;
  captionOneZh: string;
  captionTwoEn: string;
  captionTwoZh: string;
  finalTitleEn: string;
  finalTitleZh: string;
  finalBodyEn: string;
  finalBodyZh: string;
  wideFallback: string;
  nextHref: string;
  nextEn: string;
  nextZh: string;
};

export type ProjectDetailImages = {
  cover: string;
  galleryOne: string;
  galleryTwo: string;
  wide: string;
};

const base: ProjectDetail = {
  titleTag: "PaperForge — Project Detail",
  categoryEn: "AI Tool",
  categoryZh: "AI 工具",
  index: "01",
  titleEn: "PaperForge: An AI writing workspace for research <em>model setup</em><span class=\"dot\">.</span>",
  titleZh: "PaperForge：面向研究<em>模型设定</em>的 AI 写作工作台<span class=\"dot\">。</span>",
  roleEn: "Product & Prototype",
  roleZh: "产品与原型",
  contextEn: "AI Product Exploration",
  contextZh: "AI 产品探索",
  linkLabelEn: "Live Link",
  linkLabelZh: "线上地址",
  linkHref: "https://paperforge-sable.vercel.app/",
  linkText: "paperforge-sable.vercel.app ↗",
  coverAlt: "PaperForge Preview",
  coverFallback: "PaperForge Preview",
  introEn: "PaperForge is an AI academic writing tool for game theory and platform economics research. It helps turn rough research ideas into structured model elements such as players, strategies, payoff functions, and assumptions.",
  introZh: "PaperForge 是一个面向博弈论与平台经济研究的 AI 学术写作工具。它帮助用户把粗略研究想法整理成参与者、策略、收益函数和假设条件等结构化模型要素。",
  sectionTitleEn: "From idea to model setup",
  sectionTitleZh: "从想法到模型设定",
  sectionBodyEn: "The prototype guides users through the early research setup process: clarifying the scene, identifying participants, describing strategies, and drafting a LaTeX-style Model Setup section that can be refined later.",
  sectionBodyZh: "这个原型会引导用户完成早期研究设定过程：明确研究场景、识别参与者、描述策略，并生成一段后续可以继续修改的 LaTeX 风格 Model Setup 草稿。",
  quoteEn: "\"The goal is not to let AI write the whole paper. The goal is to help rough research intent become a clearer model that can be questioned, revised, and improved.\"",
  quoteZh: "\"目标不是让 AI 写完整篇论文，而是帮助粗略的研究意图变成一个更清晰、可质疑、可修改、可继续完善的模型。\"",
  stackEn: "The current version is built with Next.js, React, TypeScript, Clerk, Neon, Drizzle ORM, KaTeX, react-markdown, and Vercel. The stack is less important than the product question: how can AI support academic structure without hiding the user's thinking?",
  stackZh: "当前版本使用 Next.js、React、TypeScript、Clerk、Neon、Drizzle ORM、KaTeX、react-markdown 和 Vercel 构建。技术栈本身不是重点，真正的问题是：AI 如何支持学术结构化，同时不遮蔽用户自己的思考？",
  captionOneEn: "FIG 02. Structuring research elements before writing.",
  captionOneZh: "图 02. 在写作之前先结构化研究要素。",
  captionTwoEn: "FIG 03. Drafting model setup text for later refinement.",
  captionTwoZh: "图 03. 生成可继续修改的模型设定草稿。",
  finalTitleEn: "Why this matters",
  finalTitleZh: "为什么做这个",
  finalBodyEn: "For me, PaperForge is also a product-learning project. It is a way to practice turning a specific workflow into a usable interface, while learning where AI helps and where human judgment still needs to stay visible.",
  finalBodyZh: "对我来说，PaperForge 也是一个产品学习项目。它让我练习如何把一个具体工作流变成可以使用的界面，同时观察 AI 在哪里有帮助、哪里仍然需要保留人的判断。",
  wideFallback: "Full Width Analytics View",
  nextHref: "projects/weblearnboost",
  nextEn: "WebLearnBoost",
  nextZh: "WebLearnBoost",
};

export const projectDetails: Record<string, ProjectDetail> = {
  paperforge: base,
  weblearnboost: {
    titleTag: "WebLearnBoost — Project Detail",
    categoryEn: "Browser Extension",
    categoryZh: "浏览器扩展",
    index: "02",
    titleEn: "WebLearnBoost: Turning webpages into structured <em>learning materials</em><span class=\"dot\">.</span>",
    titleZh: "WebLearnBoost：把网页转化为<em>结构化学习材料</em><span class=\"dot\">。</span>",
    roleEn: "Product & Prototype",
    roleZh: "产品与原型",
    contextEn: "Browser Extension Prototype",
    contextZh: "浏览器扩展原型",
    linkLabelEn: "GitHub",
    linkLabelZh: "代码仓库",
    linkHref: "https://github.com/Musu6856/WebLearnBoost",
    linkText: "github.com/Musu6856/WebLearnBoost ↗",
    coverAlt: "WebLearnBoost Preview",
    coverFallback: "WebLearnBoost Preview",
    introEn: "WebLearnBoost is a browser extension that turns webpages or selected text into learning maps, practice questions, local history, and Markdown study packs.",
    introZh: "WebLearnBoost 是一个浏览器扩展，可以把网页或选中文本转换成学习地图、训练题、本地历史记录和 Markdown 学习包。",
    sectionTitleEn: "From reading to structured learning",
    sectionTitleZh: "从阅读到结构化学习",
    sectionBodyEn: "The prototype focuses on the moment after a user finds useful material online: capture the page, understand the key ideas, generate exercises, and keep a local record that can be reviewed later.",
    sectionBodyZh: "这个原型关注用户在网页上发现有用材料之后的时刻：捕获页面、理解关键内容、生成练习，并保留一个之后可以复习的本地记录。",
    quoteEn: "\"The goal is not to replace reading. The goal is to make the useful parts of reading easier to organize, practice, and return to.\"",
    quoteZh: "\"目标不是替代阅读，而是让阅读中有价值的部分更容易被整理、练习和回看。\"",
    stackEn: "The current prototype uses React, TypeScript, Vite, Chrome Extension Manifest V3, Side Panel API, Vitest, Testing Library, OpenAI-compatible APIs, Anthropic-compatible APIs, Markdown export, and local browser storage.",
    stackZh: "当前原型使用 React、TypeScript、Vite、Chrome Extension Manifest V3、Side Panel API、Vitest、Testing Library、OpenAI Compatible API、Anthropic Compatible API、Markdown 导出和本地浏览器存储。",
    captionOneEn: "FIG 02. Breaking webpage content into a learning map.",
    captionOneZh: "图 02. 把网页内容拆解成学习地图。",
    captionTwoEn: "FIG 03. Keeping generated exercises and notes available locally.",
    captionTwoZh: "图 03. 在本地保留生成的练习和笔记。",
    finalTitleEn: "Why this matters",
    finalTitleZh: "为什么做这个",
    finalBodyEn: "For me, WebLearnBoost is a way to explore AI learning workflows. It asks how a browser extension can help people turn scattered information into something they can actually study.",
    finalBodyZh: "对我来说，WebLearnBoost 是一次 AI 学习工作流探索。它在追问：浏览器扩展能不能帮助人把零散信息变成真正可以学习的材料。",
    wideFallback: "Full Width Learning Flow",
    nextHref: "projects/promptcase",
    nextEn: "PromptCase",
    nextZh: "PromptCase",
  },
  promptcase: placeholderDetail({
    titleTag: "PromptCase — Project Detail",
    categoryEn: "Prompt Tool",
    categoryZh: "提示词工具",
    index: "03",
    name: "PromptCase",
    titleEn: "PromptCase: A small workspace for reviewing <em>prompt cases</em><span class=\"dot\">.</span>",
    titleZh: "PromptCase：用于复盘<em>提示词案例</em>的小工作台<span class=\"dot\">。</span>",
    introEn: "PromptCase is a planned tool for collecting, comparing, and reviewing prompt cases so useful experiments do not stay scattered in chat history.",
    introZh: "PromptCase 是一个计划中的小工具，用于收集、对比和复盘提示词案例，让有用的实验不再散落在聊天记录里。",
    nextHref: "projects/personal-web",
    nextEn: "Personal Web",
    nextZh: "个人网站",
  }),
  "personal-web": placeholderDetail({
    titleTag: "Personal Web — Project Detail",
    categoryEn: "Web Project",
    categoryZh: "网页项目",
    index: "04",
    name: "Personal Web",
    titleEn: "Personal Web: Turning a visual HTML prototype into a <em>portfolio system</em><span class=\"dot\">.</span>",
    titleZh: "个人网站：把视觉 HTML 原型变成可扩展的<em>作品集系统</em><span class=\"dot\">。</span>",
    introEn: "Personal Web is the site you are reading now: a portfolio-style homepage restored from the original HTML prototype, with project pages, writing pages, and contact paths.",
    introZh: "个人网站就是你正在看的这个站点：它从原始 HTML 视觉原型还原而来，包含主页、项目详情、文章页面和联系入口。",
    nextHref: "projects/prototype-gallery",
    nextEn: "Prototype Gallery",
    nextZh: "原型展示馆",
  }),
  "prototype-gallery": placeholderDetail({
    titleTag: "Prototype Gallery — Project Detail",
    categoryEn: "Web Gallery",
    categoryZh: "网页展示馆",
    index: "05",
    name: "Prototype Gallery",
    titleEn: "Prototype Gallery: A web archive for interface experiments and <em>prototype snapshots</em><span class=\"dot\">.</span>",
    titleZh: "原型展示馆：收集界面实验和<em>原型截图</em>的网页档案<span class=\"dot\">。</span>",
    introEn: "Prototype Gallery is a planned web project for collecting interface experiments, prototype snapshots, and product explorations without mixing them into the writing section.",
    introZh: "原型展示馆是一个计划中的网页项目，用来收集界面实验、原型截图和产品探索，同时不和文章学习记录混在一起。",
    nextHref: "projects/paperforge",
    nextEn: "PaperForge",
    nextZh: "PaperForge",
  }),
};

function placeholderDetail(input: {
  titleTag: string;
  categoryEn: string;
  categoryZh: string;
  index: string;
  name: string;
  titleEn: string;
  titleZh: string;
  introEn: string;
  introZh: string;
  nextHref: string;
  nextEn: string;
  nextZh: string;
}): ProjectDetail {
  return {
    titleTag: input.titleTag,
    categoryEn: input.categoryEn,
    categoryZh: input.categoryZh,
    index: input.index,
    titleEn: input.titleEn,
    titleZh: input.titleZh,
    roleEn: "Concept & Prototype",
    roleZh: "概念与原型",
    contextEn: "Learning Prototype",
    contextZh: "学习型原型",
    linkLabelEn: "Status",
    linkLabelZh: "状态",
    linkHref: "index.html#projects",
    linkText: "Concept / no external link yet",
    coverAlt: `${input.name} Preview`,
    coverFallback: `${input.name} Preview`,
    introEn: input.introEn,
    introZh: input.introZh,
    sectionTitleEn: "What this could become",
    sectionTitleZh: "它之后可能变成什么",
    sectionBodyEn: "This page is here to preview how a future case study could look. The project details can be replaced later once the prototype has real screenshots, decisions, and lessons.",
    sectionBodyZh: "这个页面先用来预览未来详情页可能的样子。等原型有了真实截图、产品决策和复盘内容后，可以随时替换这些文字。",
    quoteEn: "\"Not every idea needs to be finished before it earns a place here. Some pages can mark what I want to learn next.\"",
    quoteZh: "\"不是每个想法都必须完成之后才能放在这里。有些页面也可以标记我接下来想学习什么。\"",
    stackEn: "The eventual stack may change. For now, this is a content placeholder inside the same visual system so the portfolio already feels complete.",
    stackZh: "最终技术栈之后可以再改。现在它是同一视觉系统里的内容占位，让作品集先呈现完整效果。",
    captionOneEn: `FIG 02. Early structure and interface direction for ${input.name}.`,
    captionOneZh: `图 02. ${input.name} 的早期结构与界面方向。`,
    captionTwoEn: "FIG 03. A placeholder for future screenshots and process notes.",
    captionTwoZh: "图 03. 预留给未来截图和过程记录的位置。",
    finalTitleEn: "Easy to update later",
    finalTitleZh: "之后可以随时更新",
    finalBodyEn: "When the project becomes more concrete, this page can be updated with the real workflow, screenshots, links, and lessons without changing the layout.",
    finalBodyZh: "等项目更具体之后，可以直接把这里替换成真实流程、截图、链接和学习所得，不需要改动页面布局。",
    wideFallback: `${input.name} Detail View`,
    nextHref: input.nextHref,
    nextEn: input.nextEn,
    nextZh: input.nextZh,
  };
}

const defaultImages: ProjectDetailImages = {
  cover: "assets/projects/paperforge/card.png",
  galleryOne: "assets/shared/legacy-project-light.png",
  galleryTwo: "assets/shared/legacy-project-dark.png",
  wide: "assets/shared/workflow-map.png",
};

const contentSlots: Array<[string, (detail: ProjectDetail) => string]> = [
  ["project.titleTag", (detail) => escapeHtml(detail.titleTag)],
  ["project.category.en", (detail) => escapeHtml(detail.categoryEn)],
  ["project.category.zh", (detail) => escapeHtml(detail.categoryZh)],
  ["project.index", (detail) => escapeHtml(detail.index)],
  ["project.title.en", (detail) => detail.titleEn],
  ["project.title.zh", (detail) => detail.titleZh],
  ["project.role.en", (detail) => escapeHtml(detail.roleEn)],
  ["project.role.zh", (detail) => escapeHtml(detail.roleZh)],
  ["project.context.en", (detail) => escapeHtml(detail.contextEn)],
  ["project.context.zh", (detail) => escapeHtml(detail.contextZh)],
  ["project.linkLabel.en", (detail) => escapeHtml(detail.linkLabelEn)],
  ["project.linkLabel.zh", (detail) => escapeHtml(detail.linkLabelZh)],
  ["project.intro.en", (detail) => escapeHtml(detail.introEn)],
  ["project.intro.zh", (detail) => escapeHtml(detail.introZh)],
  ["project.sectionTitle.en", (detail) => escapeHtml(detail.sectionTitleEn)],
  ["project.sectionTitle.zh", (detail) => escapeHtml(detail.sectionTitleZh)],
  ["project.sectionBody.en", (detail) => escapeHtml(detail.sectionBodyEn)],
  ["project.sectionBody.zh", (detail) => escapeHtml(detail.sectionBodyZh)],
  ["project.quote.en", (detail) => escapeHtml(detail.quoteEn)],
  ["project.quote.zh", (detail) => escapeHtml(detail.quoteZh)],
  ["project.stack.en", (detail) => escapeHtml(detail.stackEn)],
  ["project.stack.zh", (detail) => escapeHtml(detail.stackZh)],
  ["project.captionOne.en", (detail) => escapeHtml(detail.captionOneEn)],
  ["project.captionOne.zh", (detail) => escapeHtml(detail.captionOneZh)],
  ["project.captionTwo.en", (detail) => escapeHtml(detail.captionTwoEn)],
  ["project.captionTwo.zh", (detail) => escapeHtml(detail.captionTwoZh)],
  ["project.finalTitle.en", (detail) => escapeHtml(detail.finalTitleEn)],
  ["project.finalTitle.zh", (detail) => escapeHtml(detail.finalTitleZh)],
  ["project.finalBody.en", (detail) => escapeHtml(detail.finalBodyEn)],
  ["project.finalBody.zh", (detail) => escapeHtml(detail.finalBodyZh)],
  ["project.next.en", (detail) => escapeHtml(detail.nextEn)],
  ["project.next.zh", (detail) => escapeHtml(detail.nextZh)],
];

function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countOccurrences(html: string, needle: string) {
  if (!needle) return 0;
  let count = 0;
  let index = 0;

  while (true) {
    index = html.indexOf(needle, index);
    if (index === -1) return count;
    count += 1;
    index += needle.length;
  }
}

function assertSingleSlot(html: string, slot: string) {
  const count = countOccurrences(html, `data-slot="${slot}"`);
  if (count !== 1) {
    throw new Error(`Expected one project detail slot for ${slot}, found ${count}.`);
  }
}

function findTagEnd(html: string, startIndex: number) {
  let quote: '"' | "'" | null = null;

  for (let index = startIndex; index < html.length; index += 1) {
    const char = html[index];

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === ">") return index;
  }

  return -1;
}

function replaceSlotHtml(html: string, slot: string, content: string) {
  assertSingleSlot(html, slot);

  const pattern = new RegExp(
    `(<([a-z0-9-]+)[^>]*data-slot="${escapeRegExp(slot)}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`,
    "i",
  );

  if (!pattern.test(html)) {
    throw new Error(`Expected an element body for project detail slot ${slot}.`);
  }

  return html.replace(pattern, (_match, open: string, _tag: string, close: string) => `${open}${content}${close}`);
}

function replaceSlotAttribute(html: string, slot: string, attr: string, value: string) {
  assertSingleSlot(html, slot);

  const marker = `data-slot="${slot}"`;
  const markerIndex = html.indexOf(marker);
  const tagStart = html.lastIndexOf("<", markerIndex);
  const tagEnd = findTagEnd(html, markerIndex);

  if (tagStart === -1 || tagEnd === -1) {
    throw new Error(`Expected an element tag for project detail slot ${slot}.`);
  }

  const tag = html.slice(tagStart, tagEnd + 1);
  const attrPattern = new RegExp(`\\s${escapeRegExp(attr)}="[^"]*"`);

  if (!attrPattern.test(tag)) {
    throw new Error(`Expected ${attr} on project detail slot ${slot}.`);
  }

  const nextTag = tag.replace(attrPattern, ` ${attr}="${escapeHtml(value)}"`);
  return html.slice(0, tagStart) + nextTag + html.slice(tagEnd + 1);
}

function svgFallback(width: number, height: number, fill: string, text: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${fill}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="serif" font-style="italic" font-size="24" fill="#8b8676">${escapeHtml(text)}</text></svg>`;
  return `this.src='data:image/svg+xml;utf8,${encodeURIComponent(svg)}'`;
}

function replaceSlotImage(html: string, slot: string, src: string, alt: string, fallbackText: string) {
  let rendered = replaceSlotAttribute(html, slot, "src", assetPath(src));
  rendered = replaceSlotAttribute(rendered, slot, "alt", alt);
  return replaceSlotAttribute(rendered, slot, "onerror", svgFallback(1200, 675, "#f7f1de", fallbackText));
}

export function renderProjectDetailHtml(
  template: string,
  detail: ProjectDetail,
  images: ProjectDetailImages = defaultImages,
) {
  let html = template;

  for (const [slot, resolve] of contentSlots) {
    html = replaceSlotHtml(html, slot, resolve(detail));
  }

  html = replaceSlotHtml(html, "project.link", escapeHtml(detail.linkText));
  html = replaceSlotAttribute(html, "project.link", "href", detail.linkHref);
  html = replaceSlotAttribute(html, "project.nextLink", "href", detail.nextHref);

  html = replaceSlotImage(html, "project.image.cover", images.cover, detail.coverAlt, detail.coverFallback);
  html = replaceSlotImage(html, "project.image.galleryOne", images.galleryOne, detail.captionOneEn, detail.captionOneEn);
  html = replaceSlotImage(html, "project.image.galleryTwo", images.galleryTwo, detail.captionTwoEn, detail.captionTwoEn);
  html = replaceSlotImage(html, "project.image.wide", images.wide, detail.wideFallback, detail.wideFallback);

  return normalizePrototypeLinks(html);
}

export async function projectDetailHtml(slug: string) {
  const detail = projectDetails[slug] ?? projectDetails.paperforge;
  const template = await prototypeHtml("project-detail.html");
  return renderProjectDetailHtml(template, detail);
}
