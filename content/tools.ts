import type { ToolSection } from "./types";

export const toolSections: ToolSection[] = [
  {
    slug: "hardware",
    label: { en: "Hardware", zh: "硬件设备" },
    intro: {
      en: "Hardware and devices used while learning product through projects and practice.",
      zh: "通过项目和实践学习产品时使用的硬件设备。",
    },
    items: [
      {
        name: "Windows Laptop",
        badge: "Daily Driver",
        description: {
          en: "My main machine for research, writing, AI-assisted prototyping, and local project work.",
          zh: "我的主力设备，用来做研究、写东西、用 AI 辅助做项目，以及处理本地工作。",
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
          en: "A larger workspace helps when comparing references, writing notes, and keeping a project open beside source material.",
          zh: "更大的工作空间适合对比参考、整理笔记，也方便把项目和资料并排打开。",
        },
      },
    ],
  },
  {
    slug: "software",
    label: { en: "Software & Editor", zh: "软件与编辑器" },
    intro: {
      en: "The tools I use to turn ideas, notes, and product directions into visible, testable versions.",
      zh: "这些工具主要用来把想法、笔记和产品方向推进成可见、可验证的版本。",
    },
    items: [
      {
        name: "Codex",
        badge: "Agent",
        description: {
          en: "My main coding agent for implementation and maintenance. I usually define the requirement, boundaries, and acceptance checks first, then use it to edit code, run tests, and fix issues step by step.",
          zh: "我主要用 Codex 做代码实现和项目维护。通常会先把需求、边界和验收标准写清楚，再让它按步骤改代码、跑测试、修问题。",
        },
      },
      {
        name: "Obsidian",
        badge: "Notes",
        description: {
          en: "I use Obsidian to build my personal knowledge base, with LLM-Wiki helping organize references, product observations, project experience, and learning records.",
          zh: "我用 Obsidian 构建个人知识库，并结合 LLM-Wiki 整理资料、产品观察、项目经验和学习记录。",
        },
      },
      {
        name: "Open Design",
        badge: "Design",
        description: {
          en: "I use Open Design to quickly produce product prototypes and page concepts, then judge whether the information structure, visual direction, and interaction details hold up.",
          zh: "我用 Open Design 快速产出产品原型和页面方案。它主要负责把想法可视化，方便我继续判断信息结构、视觉方向和交互细节是否成立。",
        },
      },
      {
        name: "Claude Code",
        badge: "Coding",
        description: {
          en: "I use Claude Code as a second coding perspective: for reading code, comparing implementation plans, and checking whether another agent would approach the same problem differently.",
          zh: "我会把 Claude Code 当作第二个代码视角使用，用来理解代码、比较实现方案，也看看另一个 Agent 会不会用不同方式处理同一个问题。",
        },
      },
    ],
  },
  {
    slug: "tech-stack",
    label: { en: "Tech Stack", zh: "技术栈" },
    intro: {
      en: "Basic technology stack I am learning while turning ideas into usable product projects.",
      zh: "把想法做成可试用小产品时正在学习的基础技术栈。",
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
          en: "I'm learning enough JavaScript to understand interactive pages, browser extensions, and product behavior.",
          zh: "我正在学习足够的 JavaScript，用来理解交互页面、浏览器扩展和产品行为。",
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
          en: "I'm learning enough frontend to turn ideas into usable projects and to understand how modern web products are put together.",
          zh: "我也在学习足够的前端知识，把想法做成可以试用的项目，并理解现代 Web 产品是如何组织起来的。",
        },
      },
    ],
  },
];
