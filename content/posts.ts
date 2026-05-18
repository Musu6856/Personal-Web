import { assets } from "./assets";
import type { Post } from "./types";

export const posts: Post[] = [
  {
    slug: "learning-ai-products-by-making-prototypes",
    title: {
      en: "Learning AI products by building projects",
      zh: "通过项目实践学习 AI 产品",
    },
    date: "2026",
    dateDisplay: "May 14, 2026",
    kind: "Learning Notes",
    kindZh: "学习记录",
    metaLabel: "NOTE",
    metaLabelZh: "笔记",
    image: assets.posts.learningAiProductsByMakingPrototypes.cover,
    readTime: "6 min read",
    excerpt: {
      en: "Notes on turning product ideas, AI workflows, and interface references into concrete product attempts.",
      zh: "记录如何把产品想法、AI 工作流和界面参考变成一次次具体尝试。",
    },
    body: [
      {
        en: "A product project is useful when it makes an idea easier to question, not when it pretends the idea is already finished.",
        zh: "项目真正有用的地方，不是证明一个想法已经完成，而是让这个想法更容易被追问。",
      },
    ],
    published: false,
    featured: true,
  },
  {
    slug: "noticing-ai-tools",
    title: {
      en: "What I notice while building with AI tools",
      zh: "我在用 AI 工具做项目时观察到的事",
    },
    date: "2026",
    dateDisplay: "May 15, 2026",
    kind: "Notes",
    kindZh: "工具观察",
    metaLabel: "OBSERVATION",
    metaLabelZh: "观察",
    image: assets.posts.noticingAiTools.cover,
    readTime: "5 min read",
    excerpt: {
      en: "Notes on how Codex, Obsidian, Open Design, and Claude Code change the way I shape ideas into working projects.",
      zh: "记录 Codex、Obsidian、Open Design、Claude Code 这些工具如何改变我把想法做成项目的方式。",
    },
    body: [
      {
        en: "I am collecting notes on how different AI tools affect the speed, shape, and friction of making small product projects.",
        zh: "我在记录不同 AI 工具如何影响做小项目时的速度、形状和阻力。",
      },
    ],
    published: true,
    featured: true,
  },
  {
    slug: "paperforge-as-product-exercise",
    title: {
      en: "PaperForge as a product exercise",
      zh: "把 PaperForge 当作一次产品练习",
    },
    date: "2026",
    dateDisplay: "May 16, 2026",
    kind: "Project Reflection",
    kindZh: "项目复盘",
    metaLabel: "REFLECTION",
    metaLabelZh: "复盘",
    image: assets.posts.paperforgeAsProductExercise.cover,
    readTime: "4 min read",
    excerpt: {
      en: "A note on using PaperForge to practice turning a research workflow into a usable product surface.",
      zh: "记录如何借助 PaperForge 练习把研究工作流变成可使用的产品界面。",
    },
    body: [
      {
        en: "PaperForge is useful to me because it makes product questions concrete: what should the AI generate, what should stay editable, and where does the user need control?",
        zh: "PaperForge 对我有用，是因为它让产品问题变得具体：AI 应该生成什么、哪些内容需要可编辑、用户应该在哪里保留控制权？",
      },
    ],
    published: true,
    featured: false,
  },
];

export const publicPosts = posts.filter((post) => post.published);

export function getPost(slug: string) {
  return publicPosts.find((post) => post.slug === slug);
}
