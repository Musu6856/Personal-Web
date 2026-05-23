export type ProjectDetail = {
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

const base: ProjectDetail = {
  titleTag: "PaperForge — Project Detail",
  categoryEn: "AI Tool",
  categoryZh: "AI 工具",
  index: "01",
  titleEn: "PaperForge: An AI writing workspace for research <em>model setup</em><span class=\"dot\">.</span>",
  titleZh: "PaperForge：面向研究<em>模型设定</em>的 AI 写作工作台<span class=\"dot\">。</span>",
  roleEn: "Product & Project",
  roleZh: "产品与项目",
  contextEn: "AI Product Exploration",
  contextZh: "AI 产品探索",
  linkLabelEn: "Live Link",
  linkLabelZh: "线上地址",
  linkHref: "https://paperforge-sable.vercel.app/",
  linkText: "paperforge-sable.vercel.app ↗",
  coverAlt: "PaperForge Preview",
  coverFallback: "PaperForge Preview",
  introEn: "PaperForge is an AI academic writing tool for game theory and platform economics research. It helps turn early-stage research ideas into structured model elements such as players, strategies, payoff functions, and assumptions.",
  introZh: "PaperForge 是一个面向博弈论与平台经济研究的 AI 学术写作工具。它帮助用户把还没完全成型的研究想法，整理成参与者、策略、收益函数和假设条件等模型要素。",
  sectionTitleEn: "From idea to model setup",
  sectionTitleZh: "从想法到模型设定",
  sectionBodyEn: "The project guides users through the early research setup process: clarifying the scene, identifying participants, describing strategies, and drafting a LaTeX-style Model Setup section that can be refined later.",
  sectionBodyZh: "这个项目会引导用户完成早期研究设定过程：明确研究场景、识别参与者、描述策略，并生成一段后续可以继续修改的 LaTeX 风格 Model Setup 草稿。",
  quoteEn: "\"The goal is not to let AI write the whole paper. The goal is to help an unclear research idea become a model setup that can be discussed, revised, and improved.\"",
  quoteZh: "\"目标不是让 AI 直接写完整篇论文，而是帮助一个还不够清晰的研究想法，变成可以继续讨论、修改和完善的模型设定。\"",
  stackEn: "The current version is built with Next.js, React, TypeScript, Clerk, Neon, Drizzle ORM, KaTeX, react-markdown, and Vercel. The stack is less important than the product question: how can AI support academic writing without taking over the user's own judgment?",
  stackZh: "当前版本使用 Next.js、React、TypeScript、Clerk、Neon、Drizzle ORM、KaTeX、react-markdown 和 Vercel 构建。技术栈本身不是重点，真正的问题是：AI 怎么支持学术写作，同时不替代用户自己的判断？",
  captionOneEn: "FIG 02. Structuring research elements before writing.",
  captionOneZh: "图 02. 在写作之前先结构化研究要素。",
  captionTwoEn: "FIG 03. Drafting model setup text for later refinement.",
  captionTwoZh: "图 03. 生成可继续修改的模型设定草稿。",
  finalTitleEn: "Why this matters",
  finalTitleZh: "为什么做这个",
  finalBodyEn: "For me, PaperForge is also a product-learning project. It helps me practice turning a specific workflow into a real, operable page while learning where AI helps and where human judgment still matters.",
  finalBodyZh: "对我来说，PaperForge 也是一个产品学习项目。它让我练习如何把一个具体工作流做成真实可操作的页面，同时观察 AI 在哪里有帮助、哪里仍然需要人的判断。",
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
    roleEn: "Product & Project",
    roleZh: "产品与项目",
    contextEn: "Browser Extension Project",
    contextZh: "浏览器扩展项目",
    linkLabelEn: "GitHub Release",
    linkLabelZh: "GitHub 发布页",
    linkHref: "https://github.com/Musu6856/WebLearnBoost/releases/tag/v0.1.1",
    linkText: "Release v0.1.1 ↗",
    coverAlt: "WebLearnBoost Preview",
    coverFallback: "WebLearnBoost Preview",
    introEn: "Latest Release: v0.1.1 Trial. WebLearnBoost is a browser extension that turns webpages or selected text into learning maps, practice questions, local history, and Markdown study packs.",
    introZh: "最新版本：v0.1.1 Trial。WebLearnBoost 是一个浏览器扩展，可以把网页或选中文本转换成学习地图、训练题、本地历史记录和 Markdown 学习包。",
    sectionTitleEn: "From reading to structured learning",
    sectionTitleZh: "从阅读到结构化学习",
    sectionBodyEn: "The project focuses on the moment after a user finds useful material online: capture the page, understand the key ideas, generate exercises, and keep a local record that can be reviewed later.",
    sectionBodyZh: "这个项目关注用户在网页上发现有用材料之后的时刻：捕获页面、理解关键内容、生成练习，并保留一个之后可以复习的本地记录。",
    quoteEn: "\"The goal is not to replace reading. The goal is to make the useful parts of reading easier to organize, practice, and return to.\"",
    quoteZh: "\"目标不是替代阅读，而是让阅读中有价值的部分更容易被整理、练习和回看。\"",
    stackEn: "The current project uses React, TypeScript, Vite, Chrome Extension Manifest V3, Side Panel API, Vitest, Testing Library, OpenAI-compatible APIs, Anthropic-compatible APIs, Markdown export, and local browser storage.",
    stackZh: "当前项目使用 React、TypeScript、Vite、Chrome Extension Manifest V3、Side Panel API、Vitest、Testing Library、OpenAI Compatible API、Anthropic Compatible API、Markdown 导出和本地浏览器存储。",
    captionOneEn: "FIG 02. Breaking webpage content into a learning map.",
    captionOneZh: "图 02. 把网页内容拆解成学习地图。",
    captionTwoEn: "FIG 03. Keeping generated exercises and notes available locally.",
    captionTwoZh: "图 03. 在本地保留生成的练习和笔记。",
    finalTitleEn: "Why this matters",
    finalTitleZh: "为什么做这个",
    finalBodyEn: "For me, WebLearnBoost is an attempt to turn webpage content into study material. I wanted to see whether a browser extension could help people organize information faster, generate practice questions, and keep a record of what they learned.",
    finalBodyZh: "对我来说，WebLearnBoost 是一次把网页内容整理成学习材料的尝试。我想看看浏览器扩展能不能帮人更快地梳理信息、生成练习，并把学习过程留下来。",
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
    titleEn: "Personal Web: Turning a visual HTML draft into a <em>portfolio system</em><span class=\"dot\">.</span>",
    titleZh: "个人网站：把视觉 HTML 草稿变成可扩展的<em>作品集系统</em><span class=\"dot\">。</span>",
    introEn: "Personal Web is the site you are reading now: a portfolio-style homepage restored from the original HTML draft, with project pages, writing pages, and contact paths.",
    introZh: "个人网站就是你正在看的这个站点：它从原始 HTML 视觉草稿还原而来，包含主页、项目详情、文章页面和联系入口。",
    nextHref: "projects/prototype-gallery",
    nextEn: "Project Gallery",
    nextZh: "项目展示馆",
  }),
  "prototype-gallery": placeholderDetail({
    titleTag: "Project Gallery — Project Detail",
    categoryEn: "Web Gallery",
    categoryZh: "网页展示馆",
    index: "05",
    name: "Project Gallery",
    titleEn: "Project Gallery: A web archive for interface experiments and <em>project snapshots</em><span class=\"dot\">.</span>",
    titleZh: "项目展示馆：收集界面实验和<em>项目截图</em>的网页档案<span class=\"dot\">。</span>",
    introEn: "Project Gallery is a planned web project for collecting interface experiments, project snapshots, and product explorations without mixing them into the writing section.",
    introZh: "项目展示馆是一个计划中的网页项目，用来收集界面实验、项目截图和产品探索，同时不和文章学习记录混在一起。",
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
    roleEn: "Concept & Project",
    roleZh: "概念与项目",
    contextEn: "Learning Project",
    contextZh: "学习型项目",
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
    sectionBodyEn: "This page is here to preview how a future case study could look. The project details can be replaced later once the project has real screenshots, decisions, and lessons.",
    sectionBodyZh: "这个页面先用来预览未来详情页可能的样子。等项目有了真实截图、产品决策和复盘内容后，可以随时替换这些文字。",
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
