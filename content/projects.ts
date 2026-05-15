import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "paperforge",
    title: { en: "PaperForge", zh: "PaperForge" },
    year: "2026",
    category: "AI Tool",
    status: "2026",
    image: "assets/lab-1.png",
    summary: {
      en: "An AI academic writing tool that helps turn rough game theory research ideas into structured model setup drafts.",
      zh: "一个 AI 学术写作工具，帮助把粗略的博弈论研究想法整理成结构化的模型设定草稿。",
    },
    description: [
      {
        en: "PaperForge helps users clarify players, strategies, payoff functions, and assumptions before generating a LaTeX-style Model Setup draft.",
        zh: "PaperForge 帮助用户先梳理参与者、策略、收益函数和假设条件，再生成 LaTeX 风格的 Model Setup 草稿。",
      },
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Clerk", "Neon", "Drizzle ORM", "KaTeX", "Vercel"],
    featured: true,
  },
  {
    slug: "weblearnboost",
    title: { en: "WebLearnBoost", zh: "WebLearnBoost" },
    year: "2026",
    category: "Browser Extension",
    status: "2026",
    image: "assets/lab-2.png",
    summary: {
      en: "A browser extension that turns webpages or selected text into learning maps, practice questions, local history, and Markdown study packs.",
      zh: "一个把网页或选中文本转换成学习地图、训练题、本地历史记录和 Markdown 学习包的浏览器扩展。",
    },
    description: [
      {
        en: "WebLearnBoost explores how AI can turn everyday reading into structured learning material while keeping the user's local learning history available.",
        zh: "WebLearnBoost 探索如何把日常阅读转化为结构化学习材料，并把用户的本地学习历史保留下来。",
      },
    ],
    stack: ["React", "TypeScript", "Vite", "Chrome Extension MV3", "Side Panel API", "Vitest", "Testing Library"],
    featured: true,
  },
  {
    slug: "promptcase",
    title: { en: "PromptCase", zh: "PromptCase" },
    year: "2026",
    category: "Tool",
    status: "Planned",
    image: "assets/lab-3.png",
    summary: {
      en: "A small tool for collecting, comparing, and reviewing prompt cases.",
      zh: "一个用于收集、对比和复盘提示词案例的小工具。",
    },
    description: [
      {
        en: "A placeholder project idea for organizing prompt examples and reflecting on what makes them work.",
        zh: "一个用于整理提示词案例、复盘它们为什么有效的预留项目。",
      },
    ],
    stack: ["Python", "JavaScript", "React"],
    featured: false,
  },
  {
    slug: "personal-web",
    title: { en: "Personal Web", zh: "个人网站" },
    year: "2026",
    category: "Web",
    status: "Planned",
    image: "assets/lab-4.png",
    summary: {
      en: "The personal website you are reading now, restored from a visual HTML prototype and shaped into a portfolio system.",
      zh: "你正在看的个人网站，从视觉 HTML 原型还原，并整理成可继续扩展的作品集系统。",
    },
    description: [
      {
        en: "A web project for presenting identity, projects, writing, and contact paths without losing the original prototype's visual language.",
        zh: "一个用于呈现个人介绍、项目、写作和联系入口的网页项目，同时保留原型的视觉语言。",
      },
    ],
    stack: ["HTML", "CSS", "Next.js", "Prototype"],
    featured: false,
  },
  {
    slug: "prototype-gallery",
    title: { en: "Prototype Gallery", zh: "原型展示馆" },
    year: "2026",
    category: "Web",
    status: "Planned",
    image: "assets/lab-5.png",
    summary: {
      en: "A planned web gallery for collecting interface experiments, prototype snapshots, and product explorations.",
      zh: "一个计划中的网页展示馆，用来收集界面实验、原型截图和产品探索。",
    },
    description: [
      {
        en: "A future web surface for showing prototype iterations as visual cases instead of mixing them with learning notes.",
        zh: "一个未来用于展示原型迭代的网页界面，把视觉案例和学习记录区分开。",
      },
    ],
    stack: ["JavaScript", "React", "Next.js"],
    featured: false,
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
