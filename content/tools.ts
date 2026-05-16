import type { ToolSection } from "./types";

export const toolSections: ToolSection[] = [
  {
    slug: "hardware",
    label: { en: "Hardware", zh: "硬件设备" },
    intro: {
      en: "Hardware and devices used while learning product through prototypes.",
      zh: "通过原型学习产品时使用的硬件设备。",
    },
    items: [
      {
        name: "Windows Laptop",
        badge: "Daily Driver",
        description: {
          en: "My main machine for research, writing, AI-assisted prototyping, and local project work.",
          zh: "我的主力设备，用来做研究、写东西、用 AI 辅助做原型，以及处理本地项目。",
        },
      },
      {
        name: "iPad",
        badge: "Reading",
        description: {
          en: "I use it for reading, sketching rough flows, and collecting references away from the laptop.",
          zh: "我用它阅读资料、简单画流程，也在离开电脑时收集一些参考。",
        },
      },
      {
        name: "External Monitor",
        badge: "Workspace",
        description: {
          en: "A larger workspace helps when comparing references, writing notes, and keeping a prototype open beside source material.",
          zh: "更大的工作空间适合对比参考、整理笔记，也方便把原型和资料并排打开。",
        },
      },
    ],
  },
  {
    slug: "software",
    label: { en: "Software & Editor", zh: "软件与编辑器" },
    intro: {
      en: "Software, editors, and AI coding tools used to make prototypes.",
      zh: "用来制作原型的软件、编辑器和 AI 编码工具。",
    },
    items: [
      {
        name: "Codex",
        badge: "Agent",
        description: {
          en: "My main coding agent for turning rough ideas, page drafts, and product experiments into working prototypes.",
          zh: "我常用的编码 Agent，用来把粗略想法、页面草稿和产品实验推进成可以运行的原型。",
        },
      },
      {
        name: "Obsidian",
        badge: "Notes",
        description: {
          en: "Where I keep product notes, learning records, references, and early ideas before they become prototypes.",
          zh: "我用它存放产品笔记、学习记录、参考资料，以及变成原型之前的早期想法。",
        },
      },
      {
        name: "Open Design",
        badge: "Design",
        description: {
          en: "A visual companion for checking designs, marking changes, and keeping the prototype close to the intended look.",
          zh: "我用它检查设计、标注修改点，并尽量让原型接近想要的视觉效果。",
        },
      },
      {
        name: "Claude Code",
        badge: "Coding",
        description: {
          en: "Another AI coding tool I use to explore implementations, compare approaches, and learn from generated code.",
          zh: "另一个我会使用的 AI 编码工具，用来探索实现方式、比较方案，也从生成的代码里学习。",
        },
      },
    ],
  },
  {
    slug: "tech-stack",
    label: { en: "Tech Stack", zh: "技术栈" },
    intro: {
      en: "Basic technology stack I am learning while turning ideas into usable prototypes.",
      zh: "把想法做成可试用原型时正在学习的基础技术栈。",
    },
    items: [
      {
        name: "Python",
        badge: "Language",
        description: {
          en: "Python is the language I know best right now. I use it as a base for understanding logic, scripts, and AI-related experiments.",
          zh: "Python 是我目前最熟悉的语言。我用它作为理解逻辑、脚本和 AI 相关实验的基础。",
        },
      },
      {
        name: "JavaScript",
        badge: "Frontend",
        description: {
          en: "I'm learning enough JavaScript to understand interactive pages, browser extensions, and prototype behavior.",
          zh: "我正在学习足够的 JavaScript，用来理解交互页面、浏览器扩展和原型行为。",
        },
      },
      {
        name: "React",
        badge: "UI",
        description: {
          en: "React helps me understand how interfaces are structured and how product ideas can become reusable UI pieces.",
          zh: "React 帮助我理解界面如何被组织，也理解产品想法如何变成可复用的 UI 片段。",
        },
      },
      {
        name: "Next.js",
        badge: "Framework",
        description: {
          en: "I'm learning enough frontend to turn ideas into usable prototypes and to understand how modern web products are put together.",
          zh: "我也在学习足够的前端知识，把想法做成可以试用的原型，并理解现代 Web 产品是如何组织起来的。",
        },
      },
    ],
  },
];
