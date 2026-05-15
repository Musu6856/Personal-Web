import type { ToolSection } from "./types";

export const toolSections: ToolSection[] = [
  {
    slug: "hardware",
    label: { en: "Hardware", zh: "硬件设备" },
    intro: {
      en: "The everyday devices I use for prototypes, reading, notes, and experiments.",
      zh: "我日常用来做原型、阅读、记录和实验的设备。",
    },
    items: [
      {
        name: "Windows Laptop",
        badge: "Daily",
        description: {
          en: "My main computer for coding experiments, browsing references, and running local projects.",
          zh: "我的主力电脑，用来做代码实验、浏览参考资料和运行本地项目。",
        },
      },
      {
        name: "iPad",
        badge: "Reading",
        description: {
          en: "A portable screen for reading, sketching, and collecting early thoughts.",
          zh: "用于阅读、简单草图和收集早期想法的便携屏幕。",
        },
      },
      {
        name: "External Monitor",
        badge: "Workspace",
        description: {
          en: "Extra space for keeping references, previews, and notes visible while working.",
          zh: "给参考资料、预览页面和笔记留出更多可见空间。",
        },
      },
    ],
  },
  {
    slug: "software",
    label: { en: "Software", zh: "软件工具" },
    intro: {
      en: "The tools I use to explore ideas and turn them into visible prototypes.",
      zh: "我用来探索想法，并把它们变成可见原型的工具。",
    },
    items: [
      {
        name: "Codex",
        badge: "Agent",
        description: {
          en: "For coding help, project edits, and turning vague requirements into working files.",
          zh: "用于代码协作、项目修改，以及把模糊需求落到真实文件里。",
        },
      },
      {
        name: "Obsidian",
        badge: "Notes",
        description: {
          en: "My place for notes, learning records, project thoughts, and workflow observations.",
          zh: "我用来记录学习、项目想法和工作流观察的笔记空间。",
        },
      },
      {
        name: "Open Design",
        badge: "Design",
        description: {
          en: "For looking at visual prototypes, selecting details, and making design feedback concrete.",
          zh: "用于查看视觉原型、选择细节，并把设计反馈变得具体。",
        },
      },
      {
        name: "Claude Code",
        badge: "Agent",
        description: {
          en: "Another AI coding assistant I use while comparing workflows and implementation styles.",
          zh: "另一个 AI 编程助手，我会用它对比不同的工作流和实现方式。",
        },
      },
    ],
  },
  {
    slug: "tech-stack",
    label: { en: "Tech Stack", zh: "技术栈" },
    intro: {
      en: "Python is the language I know best right now. I'm also learning enough frontend to turn ideas into usable prototypes.",
      zh: "Python 是我目前最熟悉的语言。我也在学习足够的前端知识，把想法做成可以试用的原型。",
    },
    items: [
      {
        name: "Python",
        badge: "Language",
        description: {
          en: "The language I know best right now, especially for quick experiments and automation.",
          zh: "我目前最熟悉的语言，适合做快速实验和自动化。",
        },
      },
      {
        name: "JavaScript",
        badge: "Language",
        description: {
          en: "The frontend language I am learning so prototypes can run in the browser.",
          zh: "我正在学习的前端语言，让原型可以在浏览器里运行。",
        },
      },
      {
        name: "React",
        badge: "UI",
        description: {
          en: "Useful for building interactive product surfaces from reusable components.",
          zh: "适合用可复用组件搭建交互式产品界面。",
        },
      },
      {
        name: "Next.js",
        badge: "Web",
        description: {
          en: "A practical framework for turning prototypes into shareable websites.",
          zh: "一个把原型做成可分享网页的实用框架。",
        },
      },
    ],
  },
];
