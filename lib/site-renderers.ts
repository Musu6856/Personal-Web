import { getPost, publicPosts } from "@/content/posts";
import { profile } from "@/content/profile";
import { publicProjects } from "@/content/projects";
import { toolSections } from "@/content/tools";
import type { Project, ToolSection } from "@/content/types";
import { assets } from "@/content/assets";
import { escapeHtml, replaceAllPairs, replaceRequiredBetween, replaceRequiredPairs } from "@/lib/html-utils";
import { renderPublicFooterContent } from "@/lib/public-navigation";

const projectTags: Record<string, { tag: string; labelEn: string; labelZh: string }> = {
  "AI Tool": { tag: "ai", labelEn: "AI", labelZh: "AI" },
  "Browser Extension": { tag: "tool", labelEn: "Tool", labelZh: "工具" },
  Tool: { tag: "tool", labelEn: "Tool", labelZh: "工具" },
  Web: { tag: "web", labelEn: "Web", labelZh: "Web" },
};

const projectFallbackColors = ["f7f1de", "ece4cf", "ddd2b6", "f7f1de", "ece4cf"];
const lazyImageAttrs = 'loading="lazy" decoding="async"';

function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
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
          <img src="${assetPath(project.image ?? assets.projects.paperforge.card)}" alt="Project ${number}" ${lazyImageAttrs} onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'320\\' height=\\'400\\'><rect width=\\'320\\' height=\\'400\\' fill=\\'%23${color}\\'/><text x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' font-family=\\'serif\\' font-style=\\'italic\\' font-size=\\'18\\' fill=\\'%238b8676\\'>Project ${number}</text></svg>'">
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
  return publicProjects.map(projectCard).join("\n\n");
}

function toolItem(item: ToolSection["items"][number]) {
  return `
          <div class="tl-item">
            <h3 class="tl-item-name">${escapeHtml(item.name)} <span class="badge">${escapeHtml(item.badge)}</span></h3>
            <p class="tl-item-desc" data-len>${escapeHtml(item.description.en)}</p>
            <p class="tl-item-desc" data-lzh>${escapeHtml(item.description.zh)}</p>
          </div>`;
}

function toolSection(section: ToolSection) {
  return `
      <section id="${section.slug}" class="tl-section" data-reveal>
        <div class="tl-category">
          <h2 data-len>${escapeHtml(section.label.en)}</h2><h2 data-lzh>${escapeHtml(section.label.zh)}</h2>
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

function blogDeckCard(post: (typeof publicPosts)[number], postIndex: number, state: string) {
  const number = itemNumber(postIndex);
  const total = String(publicPosts.length).padStart(2, "0");
  const fallback = ["work-1.png", "work-2.png", "work-3.png"][postIndex % 3];
  const fallbackFill = ["ddd2b6", "ece4cf", "ddd2b6"][postIndex % 3];
  const label = post.kind;

  return `
        <a href="/blog/${post.slug}" class="work-card ${state}" data-blog-card>
          <div class="label-row">
            <span class="small-label" data-len>${escapeHtml(label)}</span>
            <span class="small-label" data-lzh>${escapeHtml(post.kindZh ?? label)}</span>
            <span class="index">${number} / ${total}</span>
          </div>
          <div class="img">
            <img src="${assetPath(post.image ?? `assets/${fallback}`)}" alt="Blog ${number}" ${lazyImageAttrs} onerror="${blogImageFallback(number, fallbackFill)}">
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
  if (publicPosts.length === 0) return "";

  return publicPosts
    .map((post, index) => blogDeckCard(post, index, index === 0 ? "is-primary" : index === 1 ? "is-secondary" : "is-hidden-right"))
    .join("\n");
}

function blogRelatedCard(post: (typeof publicPosts)[number], postIndex: number, isCurrent = false) {
  const number = itemNumber(postIndex);
  const fallback = ["work-1.png", "work-2.png", "work-3.png"][postIndex % 3];
  const fallbackFill = ["ddd2b6", "ece4cf", "ddd2b6"][postIndex % 3];
  const currentClass = isCurrent ? " is-current" : "";
  const currentAttrs = isCurrent ? ' aria-current="page"' : "";
  const currentMarker = isCurrent
    ? '<span class="current-marker"><span data-len>Reading</span><span data-lzh>正在阅读</span></span>'
    : "";

  return `
        <a href="/blog/${post.slug}" class="bp-related-card${currentClass}"${currentAttrs}>
          <div class="img">
            <img src="${assetPath(post.image ?? `assets/${fallback}`)}" alt="${escapeHtml(post.title.en)}" ${lazyImageAttrs} onerror="${blogImageFallback(number, fallbackFill)}">
          </div>
          <h4 data-len>${escapeHtml(post.title.en)}</h4>
          <h4 data-lzh>${escapeHtml(post.title.zh)}</h4>
          <p data-len>${escapeHtml(post.excerpt.en)}</p>
          <p data-lzh>${escapeHtml(post.excerpt.zh)}</p>
          <span class="meta">${escapeHtml(post.date)} · <span data-len>${escapeHtml(post.kind)}</span><span data-lzh>${escapeHtml(post.kindZh ?? post.kind)}</span>${currentMarker}</span>
        </a>`;
}

export function renderBlogRelatedSection(html: string, currentSlug: string) {
  const currentIndex = publicPosts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    throw new Error(`Unknown blog post slug: ${currentSlug}`);
  }

  if (publicPosts.length === 1) {
    return replaceRequiredBetween(
      html,
      '<div class="bp-related-grid">',
      '\n      </div>\n    </section>',
      blogRelatedCard(publicPosts[currentIndex]!, currentIndex, true),
      "blog.related",
    );
  }

  const relatedIndexes = [
    (currentIndex - 1 + publicPosts.length) % publicPosts.length,
    currentIndex,
    (currentIndex + 1) % publicPosts.length,
  ];
  const relatedHtml = relatedIndexes
    .map((postIndex, position) => blogRelatedCard(publicPosts[postIndex]!, postIndex, position === 1))
    .join("\n");

  return replaceRequiredBetween(
    html,
    '<div class="bp-related-grid">',
    '\n      </div>\n    </section>',
    relatedHtml,
    "blog.related",
  );
}

function restoreBlogLabel(html: string) {
  return html.replace(
    '<span class="label" data-len>Blog</span>\n        <span class="label" data-lzh>博客</span>',
    '<span class="label">\n          <span data-len>Blog</span>\n          <span data-lzh>博客</span>\n          <span class="ix">· Nº 05</span>\n        </span>',
  );
}

function renderProfileContent(html: string) {
  return replaceRequiredPairs(html, [
    [
      "I'm Musu — learning toward becoming an AI product manager. I use prototypes to learn and explore AI products: understanding how AI changes workflows, and turning vague ideas into things people can actually try. This is where I share projects, notes, and things I'm learning.",
      escapeHtml(profile.intro.en),
    ],
    [
      "我是牧晚吟，也叫 Musu，正在努力成为一名 AI 产品经理。我正在通过做原型来学习和探索 AI 产品：理解 AI 如何改变工作流，也把一些模糊的想法做成可以真正试用的东西。这里是我分享项目、笔记和所学所得的地方。",
      escapeHtml(profile.intro.zh),
    ],
    ["Currently based in Xi'an &nbsp;·&nbsp; Open to remote", escapeHtml(profile.heroLocationLine.en).replace(" · ", " &nbsp;·&nbsp; ")],
    ["现居西安 &nbsp;·&nbsp; 开放远程工作", escapeHtml(profile.heroLocationLine.zh).replace(" · ", " &nbsp;·&nbsp; ")],
    [
      "I'm learning product by making small prototypes, studying real workflows, and turning scattered ideas into concrete interfaces. I may not be a full-time developer, but I like using tools, AI, and design references to make ideas visible.",
      escapeHtml(profile.aboutDetail.en),
    ],
    [
      "我正在通过做小原型、观察真实工作流、把零散想法变成具体界面来学习产品。我不算真正的开发者，但我喜欢借助工具、AI 和设计参考，把想法做得可以被看见。",
      escapeHtml(profile.aboutDetail.zh),
    ],
    [
      "This site is where I keep the traces of that process: projects, notes, tool experiments, and the lessons I collect while trying to become an AI product manager.",
      escapeHtml(profile.processTrace.en),
    ],
    [
      "这个网站会记录这些过程留下的痕迹：项目、笔记、工具实验，以及我在努力成为 AI 产品经理的路上收集到的经验。",
      escapeHtml(profile.processTrace.zh),
    ],
    [
      "I'm open to conversations about AI products, workflow experiments, and small prototype ideas. If something here resonates with you, feel free to reach out.",
      escapeHtml(profile.contactIntro.en),
    ],
    [
      "我很愿意聊聊 AI 产品、工作流实验和一些小原型想法。如果这里的内容让你产生了共鸣，欢迎联系我。",
      escapeHtml(profile.contactIntro.zh),
    ],
    ['href="mailto:1803162257@qq.com"', `href="mailto:${escapeHtml(profile.email)}"`],
    ['href="https://github.com/Musu6856"', `href="${escapeHtml(profile.github)}"`],
    ["Based in Xi'an &nbsp;·&nbsp; Open to remote", escapeHtml(profile.contactLocationLine.en).replace(" · ", " &nbsp;·&nbsp; ")],
    ["现居西安 &nbsp;·&nbsp; 欢迎远程合作", escapeHtml(profile.contactLocationLine.zh).replace(" · ", " &nbsp;·&nbsp; ")],
    [
      "Personal homepage of Musu — learning to become an AI product manager through prototypes, notes, and practice.",
      escapeHtml(profile.footerSummary.en),
    ],
    [
      "牧晚吟 / Musu 的个人主页 —— 通过原型、笔记和实践，学习成为一名 AI 产品经理。",
      escapeHtml(profile.footerSummary.zh),
    ],
  ]);
}

function renderSiteAssetContent(html: string) {
  return replaceRequiredPairs(html, [
    ['src="assets/site/hero.png"', `src="${assetPath(assets.site.hero)}" decoding="async"`],
    ['src="assets/site/about.png"', `src="${assetPath(assets.site.about)}" ${lazyImageAttrs}`],
    ['src="assets/site/capabilities.png"', `src="${assetPath(assets.site.capabilities)}" ${lazyImageAttrs}`],
    ['src="assets/site/contact.png"', `src="${assetPath(assets.site.contact)}" ${lazyImageAttrs}`],
  ]);
}

function renderProductWording(html: string) {
  return replaceAllPairs(html, [
    ["Learn · Prototype · Share · Repeat", "Learn · Build · Share · Repeat"],
    ["学习 · 原型 · 分享 · 重复", "学习 · 项目 · 分享 · 重复"],
    ["Learn · Prototype · Share", "Learn · Build · Share"],
    ["学习 · 原型 · 分享", "学习 · 项目 · 分享"],
    ["AI Product · Prototypes · Notes", "AI Product · Projects · Notes"],
    ["AI 产品 · 原型 · 笔记", "AI 产品 · 项目 · 笔记"],
    [
      "Personal homepage of Musu — learning to become an AI product manager through prototypes, notes, and practice.",
      escapeHtml(profile.footerSummary.en),
    ],
    [
      "牧晚吟 / Musu 的个人主页 —— 通过原型、笔记和实践，学习成为一名 AI 产品经理。",
      escapeHtml(profile.footerSummary.zh),
    ],
    [
      "I care about <em>product thinking,</em> clear interfaces, and the way <em>AI</em> changes how people work<span class=\"dot\">.</span>",
      "I like turning ideas into <em>work</em> instead of leaving them as ideas<span class=\"dot\">.</span>",
    ],
    [
      "我关注产品思考、清晰的界面，以及 <em>AI</em> 如何改变人们的工作方式<span class=\"dot\">。</span>",
      "我更喜欢把想法变成<em>作品</em>，而不是停在想法里<span class=\"dot\">。</span>",
    ],
    [
      "我关注<em>产品思考</em>、清晰的界面，以及 <em>AI</em> 如何改变人们的工作方式<span class=\"dot\">。</span>",
      "我更喜欢把想法变成<em>作品</em>，而不是停在想法里<span class=\"dot\">。</span>",
    ],
    [
      "These are the areas where I'm most comfortable — the things I've spent real time with, not just read about.",
      "These are the areas I use most often lately, and the ones I want to keep going deeper into.",
    ],
    [
      "这些是我最熟悉的领域 —— 真正花过时间深入实践的，而不只是读过文章。",
      "下面这些，是我最近用得比较多、也想继续深入的方向。",
    ],
    [
      "A living archive of the things I've <em>made</em><span class=\"dot\">.</span>",
      "Some projects I've <em>made</em> or am still working on<span class=\"dot\">.</span>",
    ],
    [
      "A living archive of things I've <em>made</em><span class=\"dot\">.</span>",
      "Some projects I've <em>made</em> or am still working on<span class=\"dot\">.</span>",
    ],
    [
      "一个关于我所构建<em>之物</em>的活档案<span class=\"dot\">。</span>",
      "一些我做过和正在做的<em>项目</em><span class=\"dot\">。</span>",
    ],
    [">Prototype<", ">Build<"],
    [">原型<", ">项目<"],
    ["Thinking through<br/>prototypes. Notes from<br/>AI product<br/>learning.", "Thinking through<br/>projects. Notes from<br/>AI product<br/>learning."],
    ["在原型中思考。<br/>关于 AI 产品<br/>学习的笔记。", "在项目中思考。<br/>关于 AI 产品<br/>学习的笔记。"],
    ["My everyday setup for research, writing, and making small AI product prototypes.", "My everyday setup for research, writing, and building small AI product projects."],
    ["我日常用来做研究、写东西和制作 AI 产品小原型的设备组合。", "我日常用来做研究、写东西和推进 AI 产品小项目的设备组合。"],
    ["The AI and note-taking tools I use to explore ideas, build prototypes, and keep learning organized.", "The AI and note-taking tools I use to explore ideas, build projects, and keep learning organized."],
    ["我用这些 AI 与笔记工具探索想法、制作原型，并整理学习过程。", "我用这些 AI 与笔记工具探索想法、推进项目，并整理学习过程。"],
    ["I'm learning enough frontend to turn ideas into usable prototypes.", "I'm learning enough frontend to turn ideas into usable projects."],
    ["I'm learning enough frontend to turn ideas into usable prototypes and to understand how modern web products are put together.", "I'm learning enough frontend to turn ideas into usable projects and to understand how modern web products are put together."],
    ["把想法做成可以试用的原型", "把想法做成可以试用的项目"],
    ["documenting AI product prototypes,<br/>web projects, and learning tools", "documenting AI product explorations,<br/>web projects, and learning tools"],
    ["记录 AI 产品原型、网页项目<br/>和学习工具", "记录 AI 产品探索、网页项目<br/>和学习工具"],
    ["Prototype Gallery", "Project Gallery"],
    ["原型展示馆", "项目展示馆"],
    ["prototype snapshots", "project snapshots"],
    ["原型截图", "项目截图"],
    ["Learning AI products by making prototypes", "Learning AI products by building projects"],
    ["通过做原型学习 AI 产品", "通过项目实践学习 AI 产品"],
    ["how these tools change the way ideas become prototypes", "how these tools change the way ideas become working projects"],
    ["这些工具如何改变原型制作方式", "这些工具如何改变项目实践方式"],
    ["How a research writing workflow became an AI-assisted model setup prototype.", "How a research writing workflow became an AI-assisted model setup project."],
    ["一个研究写作流程如何变成 AI 辅助的模型设定原型。", "一个研究写作流程如何变成 AI 辅助的模型设定项目。"],
    ["rough product thoughts", "early product ideas"],
    ["粗略的产品想法", "还没完全成型的产品想法"],
    ["rough game theory research ideas", "early-stage game theory research ideas"],
    ["粗略的博弈论研究想法", "还没完全成型的博弈论研究想法"],
    ["make a small prototype", "build a small product project"],
    ["做一个小原型", "做一个小项目"],
    [
      "A good prototype does not have to start from a big feature list.",
      "A useful product project does not have to start from a big feature list.",
    ],
    ["一个好的原型不一定要从很大的功能清单开始。", "一个好的项目不一定要从很大的功能清单开始。"],
    [
      '"A prototype is useful when it makes an idea easier to question, not when it pretends the idea is already finished."',
      '"A product project is useful when it makes an idea easier to question, not when it pretends the idea is already finished."',
    ],
    [
      '"原型真正有用的地方，不是证明一个想法已经完成，而是让这个想法更容易被追问。"',
      '"项目真正有用的地方，不是证明一个想法已经完成，而是让这个想法更容易被追问。"',
    ],
    ["those markers: prototypes, observations", "those markers: projects, observations"],
    ["这些标记：原型、观察", "这些标记：项目、观察"],
    ["by making prototypes, studying workflows", "by building projects, studying workflows"],
    ["正在通过做原型、观察工作流", "正在通过项目实践、观察工作流"],
    ["how ideas become prototypes.", "how ideas become working projects."],
    ["想法如何变成原型", "想法如何变成项目"],
    [
      "A living document of the hardware, AI tools, notes, and basic tech stack I use while learning product through prototypes.",
      "A living document of the hardware, AI tools, notes, and basic tech stack I use while learning product through projects.",
    ],
    [
      "这是一份实时更新的清单，记录我在通过原型学习产品时使用的设备、AI 工具、笔记工具和基础技术栈。",
      "这是一份实时更新的清单，记录我在通过项目和实践学习产品时使用的设备、AI 工具、笔记工具和基础技术栈。",
    ],
  ]);
}

function removeBlogFigureCaptions(html: string) {
  return html
    .replace(
      /<figcaption>\s*<span data-len>FIG 01\.[\s\S]*?<\/span>\s*<span data-lzh>图 01\.[\s\S]*?<\/span>\s*<\/figcaption>/,
      "",
    )
    .replace(
      /<figcaption>\s*<span data-len>FIG 02\.[\s\S]*?<\/span>\s*<span data-lzh>图 02\.[\s\S]*?<\/span>\s*<\/figcaption>/,
      "",
    );
}

function noticingAiToolsArticleHtml() {
  return `
      
      <p data-len>After using Codex, Claude Code, Open Design, and Obsidian for a while, my strongest feeling is not simply that AI makes building faster. The real change is that an idea can enter a visible, editable state much earlier.</p>
      <p data-lzh>这段时间用 Codex、Claude Code、Open Design 和 Obsidian 做项目，我最大的感受不是“AI 让开发变快”这么简单。真正的变化是：一个想法可以更早进入可见、可编辑、可验证的状态。</p>

      <p data-len>But speed itself is not a product ability. If I only keep asking the tool to generate more screens and more code, the project may look busy while the actual problem remains vague. So the question I care about is: how do I use AI to move faster without losing product judgment?</p>
      <p data-lzh>但速度本身不是产品能力。如果只是不断让工具生成更多页面、更多代码，项目看起来会很热闹，真正的问题却可能还是模糊的。所以我更在意的是：怎么借助 AI 提速，同时不丢掉产品判断。</p>

      <h2 data-len>AI makes the draft appear earlier</h2>
      <h2 data-lzh>AI 让草稿更早出现</h2>

      <p data-len>Before these tools, many ideas would stay in notes for a long time. I might write a few requirements, collect several references, and then stop at the point where implementation felt too expensive. Now I can push an idea into a demo much earlier, even if the first version is still rough.</p>
      <p data-lzh>以前很多想法会在笔记里停很久：写一点需求，找一些参考，然后卡在“真正做出来成本太高”的地方。现在不一样了，我可以更早把一个想法推进到 demo 阶段，哪怕第一版还很粗糙。</p>

      <blockquote class="bp-pull-quote" data-od-id="pull-quote">
        <span data-len>"The value of a demo is not that it proves the idea is right. It gives me something concrete enough to question."</span>
        <span data-lzh>"demo 的价值不是证明一个想法是对的，而是让我终于有东西可以追问。"</span>
      </blockquote>

      <p data-len>That is why I do not see AI tools as a shortcut around product thinking. I see them as a way to expose product questions earlier. Once something is on the screen, I can immediately ask whether the flow makes sense, whether the page gives enough control, and whether the output is actually useful.</p>
      <p data-lzh>所以我不把 AI 工具理解成绕过产品思考的捷径。它更像是把产品问题提前暴露出来的方法。只要东西出现在界面上，我就能马上追问：这个流程顺不顺？页面有没有给用户足够的控制感？生成结果到底有没有用？</p>

      <h2 data-len>Fast can still be structured</h2>
      <h2 data-lzh>快，也需要有结构</h2>

      <p data-len>The easiest mistake is treating AI building as a stream of prompts. Ask once, get a page. Ask again, get a component. Keep going, and suddenly the project has many pieces but no clear center. I have stepped into that state before, so now I try to give the work a shape before I ask the tools to move fast.</p>
      <p data-lzh>最容易犯的错误，是把 AI 辅助做项目变成一串 prompt：问一次，生成一个页面；再问一次，生成一个组件。继续做下去，东西越来越多，但中心越来越不清楚。我自己也踩过这个坑，所以现在会先给项目一个结构，再让工具提速。</p>

      <p data-len>For a small product project, I usually force myself to clarify three things first:</p>
      <p data-lzh>对一个小项目来说，我通常会先逼自己想清楚三件事：</p>

      <ul>
        <li><span data-len><b>Problem:</b> What user problem am I trying to make easier?</span><span data-lzh><b>问题：</b>我到底想让用户哪件事变得更容易？</span></li>
        <li><span data-len><b>Scenario:</b> In what moment would this product actually be used?</span><span data-lzh><b>场景：</b>这个产品会在什么具体时刻被使用？</span></li>
        <li><span data-len><b>Boundary:</b> What should AI do, and what should remain under the user's control?</span><span data-lzh><b>边界：</b>哪些事情交给 AI，哪些判断必须留给用户？</span></li>
      </ul>

      <figure class="bp-figure">
        <img src="assets/shared/workflow-map.png" alt="Architecture Diagram" ${lazyImageAttrs} onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'800\\' height=\\'400\\'><rect width=\\'800\\' height=\\'400\\' fill=\\'%23ece4cf\\'/><text x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'16\\' fill=\\'%238b8676\\'>Architecture Diagram Placeholder</text></svg>'">
      </figure>

      <h2 data-len>Tools change my working rhythm</h2>
      <h2 data-lzh>工具改变的是工作节奏</h2>

      <p data-len>Different tools sit in different parts of the process. Obsidian is where I keep scattered thoughts, references, and decisions. Open Design helps me look at pages as interfaces instead of only as code. Codex and Claude Code help me turn a direction into working files, then keep adjusting it through real feedback from the page.</p>
      <p data-lzh>这些工具在流程里的位置不一样。Obsidian 更像是我放零散想法、参考和决策记录的地方；Open Design 帮我把页面当成界面来看，而不只是看代码；Codex 和 Claude Code 则负责把一个方向推进成真正能跑的文件，再根据页面反馈继续调整。</p>

      <p data-len>What they have in common is that they shorten the distance between thinking and checking. I do not need to wait until everything is polished before seeing whether the idea works. I can make a version, look at it, dislike it, change it, and learn from that loop.</p>
      <p data-lzh>它们共同改变的，是“想”和“验证”之间的距离。我不需要等到所有东西都很完整，才知道这个想法是不是成立。我可以先做出一个版本，看一眼，不满意，再改，然后从这个循环里学东西。</p>

      <div class="bp-blockquote">
        <span data-len>For me, the important ability is not prompting harder. It is knowing what to ask the tool to do, what to inspect myself, and when to stop generating and start judging.</span>
        <span data-lzh>对我来说，重要的能力不是“更会写 prompt”，而是知道该让工具做什么、哪些地方必须自己检查，以及什么时候应该停止生成、开始判断。</span>
      </div>

      <p data-len>So this article is not a conclusion about AI tools. It is a note from the middle of using them. I want to keep recording what each tool makes easier, what it makes messier, and how I can use these changes to build product judgment through real projects.</p>
      <p data-lzh>所以这篇不是我对 AI 工具的结论，更像是正在使用过程中的一条记录。我想继续观察：不同工具让什么变简单了，又让什么变混乱了，以及我能不能借助这些变化，通过真实项目积累产品判断。</p>`;
}

function paperforgeArticleHtml() {
  return `
      
      <p data-len>PaperForge started from a very specific problem: when a research idea is still early, it is often hard to tell whether the model is actually clear. The idea may sound reasonable in a paragraph, but once it needs players, strategies, assumptions, and payoff logic, the weak parts become visible.</p>
      <p data-lzh>PaperForge 最开始不是从“AI 写论文”这个大方向出发的，而是从一个很具体的问题开始：当一个研究想法还在早期时，很难判断它的模型设定到底清不清楚。一个想法写成一段话时可能看起来合理，但一旦要拆成参与者、策略、假设和收益逻辑，薄弱的地方就会暴露出来。</p>

      <p data-len>So I treated PaperForge as a product exercise: can an AI tool help users turn an early research intention into a structured model setup draft, while still leaving the important academic judgment to the user?</p>
      <p data-lzh>所以我把 PaperForge 当成一次产品练习：一个 AI 工具能不能帮助用户把早期研究意图整理成结构化的模型设定草稿，同时仍然把关键的学术判断留给用户自己？</p>

      <h2 data-len>The problem is not writing more text</h2>
      <h2 data-lzh>问题不是生成更多文字</h2>

      <p data-len>The tempting version of this product would be a paper generator: enter a topic, get a long answer. But that is not the direction I wanted to practice. In academic writing, especially around game theory and platform economics, the hard part is not only expression. It is whether the structure behind the expression can stand up to questioning.</p>
      <p data-lzh>这个产品最容易做歪的方向，是变成一个“论文生成器”：输入一个主题，得到一大段看起来完整的文字。但这不是我想练习的方向。学术写作，尤其是博弈论和平台经济相关的写作，难点不只是表达，而是表达背后的结构能不能经得起追问。</p>

      <blockquote class="bp-pull-quote" data-od-id="pull-quote">
        <span data-len>"For PaperForge, AI should help make the structure visible, not hide the user's thinking behind fluent text."</span>
        <span data-lzh>"对 PaperForge 来说，AI 应该帮助结构变得可见，而不是用流畅文字把用户自己的思考藏起来。"</span>
      </blockquote>

      <p data-len>This changed the product question. I was not asking how to generate a polished paper. I was asking what information should be extracted, what should be editable, and where the page should force the user to slow down and check their own assumptions.</p>
      <p data-lzh>这也改变了我对产品问题的理解。我问的不是“怎么生成一篇完整论文”，而是：哪些信息应该被提取出来？哪些内容必须可编辑？页面应该在哪些地方让用户停下来检查自己的假设？</p>

      <h2 data-len>What the product needs to protect</h2>
      <h2 data-lzh>这个产品需要保护什么</h2>

      <p data-len>PaperForge has three things that I think the interface needs to protect. First, the user's intention: the tool should keep asking what the research is really about instead of rushing into output. Second, the model elements: participants, strategies, assumptions, and payoff logic should not be buried in paragraphs. Third, editability: if the AI output cannot be changed, the user loses control too early.</p>
      <p data-lzh>我觉得 PaperForge 的界面需要保护三件事。第一是用户的研究意图：工具不应该急着输出，而是要不断帮助用户确认到底在研究什么。第二是模型要素：参与者、策略、假设、收益逻辑这些东西不应该被埋在段落里。第三是可修改性：如果 AI 生成的内容不能被继续调整，用户就太早失去了控制权。</p>

      <p data-len>That is why the product should feel less like a chat box and more like a structured workspace. Chat is useful for exploration, but model setup needs something more stable: fields, sections, drafts, and a clear sense of what can still be changed.</p>
      <p data-lzh>所以这个产品不应该只像一个聊天框，而应该更像一个结构化工作台。聊天适合探索，但模型设定需要更稳定的承载方式：字段、分区、草稿，以及清楚地告诉用户哪些地方还可以继续改。</p>

      <ul>
        <li><span data-len><b>Clarify:</b> Turn a loose research intention into explicit model elements.</span><span data-lzh><b>澄清：</b>把松散的研究意图拆成明确的模型要素。</span></li>
        <li><span data-len><b>Expose:</b> Make assumptions and missing pieces visible instead of hiding them in prose.</span><span data-lzh><b>暴露：</b>让假设和缺口被看见，而不是藏在顺滑的文字里。</span></li>
        <li><span data-len><b>Preserve control:</b> Keep the output editable so the user can continue judging and revising.</span><span data-lzh><b>保留控制：</b>让输出保持可编辑，让用户继续判断和修改。</span></li>
      </ul>

      <figure class="bp-figure">
        <img src="assets/shared/workflow-map.png" alt="PaperForge workflow map" ${lazyImageAttrs} onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'800\\' height=\\'400\\'><rect width=\\'800\\' height=\\'400\\' fill=\\'%23ece4cf\\'/><text x=\\'50%\\' y=\\'50%\\' text-anchor=\\'middle\\' font-family=\\'sans-serif\\' font-size=\\'16\\' fill=\\'%238b8676\\'>PaperForge Workflow</text></svg>'">
      </figure>

      <h2 data-len>What I practiced through PaperForge</h2>
      <h2 data-lzh>我通过 PaperForge 练习了什么</h2>

      <p data-len>For me, PaperForge is useful because it turns product thinking into concrete decisions. Should the first screen ask for a research topic or a research scenario? Should the AI return a paragraph, a table, or separated fields? Should the generated Model Setup be treated as final text or as a draft that invites revision?</p>
      <p data-lzh>对我来说，PaperForge 有价值的地方，是它把产品思考变成了一连串具体决策：第一屏应该让用户输入研究主题，还是研究场景？AI 应该返回一段文字、一个表格，还是拆开的字段？生成的 Model Setup 应该被当成最终文本，还是一个鼓励继续修改的草稿？</p>

      <p data-len>These decisions are small, but they are exactly where product judgment appears. A feature is not just whether something can be generated. It is whether the generated result fits the user's next action.</p>
      <p data-lzh>这些决策看起来都很小，但产品判断就是在这些地方出现的。一个功能不只是“能不能生成”，更重要的是生成结果能不能接住用户下一步要做的事。</p>

      <div class="bp-blockquote">
        <span data-len>PaperForge made me practice a product habit I care about: do not let AI fluency replace the user's control, and do not let interface polish hide an unclear workflow.</span>
        <span data-lzh>PaperForge 让我练习了一个我很在意的产品习惯：不要让 AI 的流畅表达替代用户的控制权，也不要让界面完成度掩盖一个还没想清楚的工作流。</span>
      </div>

      <p data-len>This is why I call it a product exercise, not just a technical project. It helped me practice how to take a real workflow, define the boundary of AI assistance, and turn that boundary into a page that users can operate, question, and revise.</p>
      <p data-lzh>所以我更愿意把它称为一次产品练习，而不只是一个技术项目。它让我练习如何从真实工作流出发，定义 AI 辅助的边界，再把这个边界做成一个用户可以操作、质疑和修改的页面。</p>`;
}

function blogArticleHtml(slug: string) {
  if (slug === "paperforge-as-product-exercise") return paperforgeArticleHtml();
  return noticingAiToolsArticleHtml();
}

export function renderHomeContent(html: string) {
  let rendered = renderProfileContent(html);
  rendered = renderSiteAssetContent(rendered);
  rendered = renderProductWording(rendered);
  rendered = renderPublicFooterContent(rendered);
  const blogDeckClass = publicPosts.length === 2 ? "work-deck is-pair" : "work-deck";

  rendered = replaceRequiredBetween(
    rendered,
    '<div class="labs-grid" id="projects-grid">',
    '\n    </div>\n\n    <div class="projects-foot">',
    projectGridHtml(),
    "home.projects",
  );

  rendered = replaceRequiredBetween(
    rendered,
    '<div class="work-deck" id="blog-deck" data-reveal="scale" aria-live="polite">',
    '\n      </div>\n    </div>\n\n    <div class="work-arrows">',
    blogDeckHtml(),
    "home.blogDeck",
  );

  rendered = rendered.replace(
    '<div class="work-deck" id="blog-deck" data-reveal="scale" aria-live="polite">',
    `<div class="${blogDeckClass}" id="blog-deck" data-reveal="scale" aria-live="polite">`,
  );

  rendered = rendered.replace(
    '<a href="blog-post.html" class="work-link">',
    publicPosts[0]
      ? `<a href="/blog/${publicPosts[0].slug}" class="work-link">`
      : '<a href="#blog" class="work-link" aria-disabled="true">',
  );

  return restoreBlogLabel(rendered);
}

export function renderToolListContent(html: string) {
  let rendered = renderProductWording(html);
  rendered = renderPublicFooterContent(rendered, "            ");

  rendered = replaceRequiredBetween(
    rendered,
    '<div class="tl-list">',
    '\n    </div>\n  </main>',
    toolListHtml(),
    "tools.list",
  );

  return rendered;
}

export function renderBlogPostContent(html: string, slug?: string) {
  const post = slug ? getPost(slug) : publicPosts[0];

  if (!post) {
    throw new Error(`Unknown blog post slug: ${slug ?? "(default)"}`);
  }

  const postImage = assetPath(post.image ?? "assets/posts/learning-ai-products-by-making-prototypes/cover.png");
  const readTimeZh = `阅读 ${post.readTime.replace(" min read", " 分钟")}`;
  let rendered = html
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
    .replace('src="assets/posts/learning-ai-products-by-making-prototypes/cover.png"', `src="${postImage}" decoding="async"`)
    .replace("May 14, 2026", post.dateDisplay ?? post.date)
    .replace("<span data-len>6 min read</span><span data-lzh>阅读 6 分钟</span>", `<span data-len>${escapeHtml(post.readTime)}</span><span data-lzh>${escapeHtml(readTimeZh)}</span>`);

  rendered = replaceRequiredBetween(
    rendered,
    '<article class="bp-body" data-reveal data-od-id="body">',
    '\n    </article>',
    blogArticleHtml(post.slug),
    `blog.article.${post.slug}`,
  );

  rendered = renderProductWording(rendered);
  rendered = removeBlogFigureCaptions(rendered);
  rendered = renderPublicFooterContent(rendered, "            ");

  return renderBlogRelatedSection(rendered, post.slug);
}
