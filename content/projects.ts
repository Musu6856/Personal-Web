import { assets } from "./assets";
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "paperforge",
    title: { en: "PaperForge", zh: "PaperForge" },
    year: "2026",
    category: "AI Tool",
    status: "2026",
    image: assets.projects.paperforge.card,
    detailImages: assets.projects.paperforge.detail,
    summary: {
      en: "An AI tool for game theory research writing, focused on turning early ideas into editable model setup drafts.",
      zh: "一个辅助博弈论研究写作的 AI 工具，重点是把早期想法整理成可继续修改的模型设定。",
    },
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "Drizzle ORM", "KaTeX", "Vercel"],
    published: true,
    featured: true,
  },
  {
    slug: "weblearnboost",
    title: { en: "WebLearnBoost", zh: "WebLearnBoost" },
    year: "2026",
    category: "Browser Extension",
    status: "2026",
    image: assets.projects.weblearnboost.card,
    detailImages: assets.projects.weblearnboost.detail,
    summary: {
      en: "A browser extension that turns webpages or selected text into learning maps, practice questions, local history, and Markdown study packs.",
      zh: "一个把网页或选中文本转换成学习地图、训练题、本地历史记录和 Markdown 学习包的浏览器扩展。",
    },
    stack: ["React", "TypeScript", "Vite", "Chrome Extension MV3", "Side Panel API", "Vitest", "Testing Library"],
    published: true,
    featured: true,
  },
  {
    slug: "promptcase",
    title: { en: "PromptCase", zh: "PromptCase" },
    year: "2026",
    category: "Tool",
    status: "Planned",
    image: assets.projects.promptcase.card,
    summary: {
      en: "A small tool for collecting, comparing, and reviewing prompt cases.",
      zh: "一个用于收集、对比和复盘提示词案例的小工具。",
    },
    stack: ["Python", "JavaScript", "React"],
    published: false,
    featured: false,
  },
  {
    slug: "personal-web",
    title: { en: "Personal Web", zh: "个人网站" },
    year: "2026",
    category: "Web",
    status: "Planned",
    image: assets.projects.personalWeb.card,
    summary: {
      en: "The personal website you are reading now, restored from a visual HTML draft and shaped into a portfolio system.",
      zh: "你正在看的个人网站，从视觉 HTML 草稿还原，并整理成可继续扩展的作品集系统。",
    },
    stack: ["HTML", "CSS", "Next.js", "Portfolio"],
    published: false,
    featured: false,
  },
  {
    slug: "prototype-gallery",
    title: { en: "Project Gallery", zh: "项目展示馆" },
    year: "2026",
    category: "Web",
    status: "Planned",
    image: assets.projects.prototypeGallery.card,
    summary: {
      en: "A planned web gallery for collecting interface experiments, project snapshots, and product explorations.",
      zh: "一个计划中的网页展示馆，用来收集界面实验、项目截图和产品探索。",
    },
    stack: ["JavaScript", "React", "Next.js"],
    published: false,
    featured: false,
  },
];

export const publicProjects = projects.filter((project) => project.published);

export function getProject(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}
