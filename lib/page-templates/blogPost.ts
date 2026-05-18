// Embedded visual template for blogPost.
// Edit intentionally: these templates replace runtime reads from the legacy prototype folder.
export const blogPostHtml = String.raw`

<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Learning AI products by making prototypes — Musu</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;1,400;1,500;1,600;1,700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
<style>
/* ===== Canonical Stylesheet (Reused Base) ===== */
:root {
  --paper: #efe7d2;
  --paper-warm: #ece4cf;
  --paper-dark: #ddd2b6;
  --ink: #15140f;
  --ink-soft: #2a2620;
  --ink-mute: #5a5448;
  --ink-faint: #8b8676;
  --coral: #ed6f5c;
  --coral-soft: #f08e7c;
  --mustard: #e9b94a;
  --olive: #6e7448;
  --bone: #f7f1de;
  --line: rgba(21, 20, 15, 0.16);
  --line-soft: rgba(21, 20, 15, 0.08);
  --line-faint: rgba(21, 20, 15, 0.05);
  --shadow: 0 30px 60px -30px rgba(21, 20, 15, 0.18);
  --serif: 'Playfair Display', 'Times New Roman', serif;
  --sans: 'Inter Tight', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
  --body: 'Inter', -apple-system, system-ui, sans-serif;
  --mono: 'JetBrains Mono', 'SF Mono', Menlo, monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html, body { background: var(--paper); color: var(--ink); }
body {
  font-family: var(--body);
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
  position: relative;
}

html[lang="en"] [data-lzh],
html[lang="zh"] [data-len] { display: none !important; }

body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(106, 92, 56, 0.07) 0, transparent 28%),
    radial-gradient(circle at 88% 72%, rgba(106, 92, 56, 0.06) 0, transparent 32%),
    url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.18  0 0 0 0 0.16  0 0 0 0 0.12  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  background-size: auto, auto, 240px 240px;
  mix-blend-mode: multiply;
  opacity: 0.92;
}

.shell { position: relative; z-index: 2; }
.container { max-width: 1360px; padding: 0 64px; margin: 0 auto; position: relative; }

/* Plain Masthead */
.masthead {
  padding: 32px 0;
  border-bottom: 1px solid var(--line-faint);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mh-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: var(--sans);
  font-weight: 700;
  font-size: 16px;
  color: var(--ink);
  text-decoration: none;
}
.mh-mark {
  width: 28px; height: 28px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  display: inline-flex; align-items: center; justify-content: center;
  font-family: var(--serif); font-style: italic; font-size: 14px;
}
.mh-nav {
  display: flex;
  gap: 32px;
  list-style: none;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
}
.mh-nav a { color: var(--ink-soft); text-decoration: none; transition: color 0.18s ease; }
.mh-nav a:hover { color: var(--coral); }
.mh-actions { display: flex; align-items: center; gap: 24px; }

/* Lang Toggle */
.lang-toggle {
  display: inline-flex; align-items: center; gap: 0; cursor: pointer; background: none;
  border: 1px solid var(--line); border-radius: 999px; padding: 2px;
  font-family: var(--sans); font-size: 10px; font-weight: 600; letter-spacing: 0.08em;
  transition: border-color 0.18s ease;
}
.lang-toggle:hover { border-color: var(--coral); }
.lang-toggle .lt-opt { padding: 3px 10px; border-radius: 999px; color: var(--ink-faint); transition: all 0.18s ease; line-height: 1.4; }
.lang-toggle .lt-opt.active { background: var(--ink); color: var(--paper); }

/* ===== BLOG POST CSS (Editorial Hierarchy) ===== */
.bp-header {
  max-width: 820px;
  margin: 0 auto;
  padding: 110px 24px 60px;
  text-align: center;
}
.bp-category {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--coral);
  margin-bottom: 28px;
}
.bp-title {
  font-family: var(--sans);
  font-weight: 800;
  /* Editorial: Dramatic scale jump */
  font-size: clamp(40px, 5.5vw, 68px);
  line-height: 1.05;
  /* Editorial: Tight tracking for display */
  letter-spacing: -0.03em;
  color: var(--ink);
  margin-bottom: 36px;
}
.bp-deck {
  font-family: var(--body);
  /* Editorial: Large jump down to standfirst */
  font-size: 21px;
  line-height: 1.5;
  color: var(--ink-soft);
  max-width: 32ch;
  margin: 0 auto 48px;
}
.bp-author-strip {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}
.bp-author-strip img {
  width: 44px; height: 44px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bone);
  object-fit: cover;
}
.bp-author-meta { text-align: left; }
.bp-author-meta .name {
  font-family: var(--sans); font-size: 14px; font-weight: 700; color: var(--ink); display: block; margin-bottom: 2px;
}
.bp-author-meta .date {
  font-family: var(--mono); font-size: 11px; color: var(--ink-faint); letter-spacing: 0.04em;
}

.bp-hero {
  max-width: 1080px;
  margin: 0 auto 80px;
  padding: 0 24px;
}
.bp-hero-img {
  width: 100%;
  aspect-ratio: 21 / 9;
  background: linear-gradient(135deg, var(--paper-warm) 0%, var(--bone) 100%);
  border: 1px solid var(--line-faint);
  box-shadow: var(--shadow);
  display: flex; align-items: center; justify-content: center;
  position: relative;
  overflow: hidden;
}
.bp-hero-img::after {
  content: ''; position: absolute; inset: 0; background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8Y2lyY2xlIGN4PSI0IiBjeT0iNCIgcj0iMSIgZmlsbD0icmdiYSgyMSwgMjAsIDE1LCAwLjA1KSIvPgo8L3N2Zz4=") repeat;
}
.bp-hero-img img { width: 100%; height: 100%; object-fit: cover; position: relative; z-index: 1; }
.bp-hero figcaption {
  font-family: var(--sans);
  font-size: 11.5px;
  color: var(--ink-faint);
  letter-spacing: 0.05em;
  text-align: center;
  margin-top: 16px;
}

.bp-body {
  /* Editorial: strict measure 60-70ch */
  max-width: 660px;
  margin: 0 auto 80px;
  padding: 0 24px;
  font-family: var(--body);
  font-size: 17.5px;
  /* Editorial: reading rhythm */
  line-height: 1.65;
  color: var(--ink-soft);
}
.bp-body p { margin-bottom: 1.8em; }
.bp-body p code {
  font-family: var(--mono);
  font-size: 0.9em;
  background: rgba(21,20,15,0.05);
  padding: 2px 6px;
  border-radius: 4px;
  color: var(--ink);
}
.bp-body h2 {
  font-family: var(--sans);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--ink);
  /* Editorial: asymmetrical rhythm for sections */
  margin: 2.5em 0 1em;
}
.bp-body ul { margin: 0 0 1.8em 0; padding-left: 24px; list-style-type: square; }
.bp-body li { margin-bottom: 0.6em; padding-left: 6px; }

/* Editorial: Pull quote breaks the column */
.bp-pull-quote {
  font-family: var(--serif);
  font-size: 32px;
  line-height: 1.35;
  font-style: italic;
  color: var(--coral);
  margin: 3em -18% 3em 0;
  padding-left: 36px;
  border-left: 2px solid var(--coral);
  letter-spacing: -0.01em;
}
.bp-figure {
  margin: 3.5em -12%;
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border: 1px solid var(--line-faint);
  background: var(--bone);
}
.bp-figure img { width: 100%; height: 100%; object-fit: cover; display: block; }
.bp-figure figcaption {
  font-family: var(--sans); font-size: 11px; color: var(--ink-faint); text-align: center; margin-top: 14px;
}
.bp-blockquote {
  font-family: var(--body);
  font-size: 17.5px;
  font-style: italic;
  color: var(--ink-mute);
  padding: 20px 28px;
  background: rgba(21, 20, 15, 0.03);
  border-left: 3px solid var(--ink-faint);
  margin: 2.5em 0;
}

.bp-author-footer {
  max-width: 660px;
  margin: 0 auto 100px;
  padding: 48px 24px;
  border-top: 1px dashed var(--line);
  border-bottom: 1px dashed var(--line);
  display: flex;
  gap: 28px;
  align-items: center;
}
.bp-author-footer img {
  width: 80px; height: 80px;
  border-radius: 50%;
  border: 1px solid var(--line);
  background: var(--bone);
  flex-shrink: 0;
}
.bp-author-footer .bio {
  font-family: var(--body);
  font-size: 14.5px;
  line-height: 1.6;
  color: var(--ink-soft);
}
.bp-author-footer .bio-name {
  font-family: var(--sans);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  display: block;
  margin-bottom: 6px;
}

/* Related */
.bp-related {
  max-width: 1080px;
  margin: 0 auto 100px;
  padding: 0 24px;
}
.bp-related-title {
  font-family: var(--sans);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-faint);
  margin-bottom: 36px;
  text-align: center;
}
.bp-related-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
}
.bp-related-card {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.2s ease;
}
.bp-related-card:hover { transform: translateY(-4px); }
.bp-related-card .img {
  aspect-ratio: 16 / 9;
  background: var(--bone);
  border: 1px solid var(--line-faint);
  margin-bottom: 18px;
  border-radius: 8px;
  overflow: hidden;
}
.bp-related-card .img img { width: 100%; height: 100%; object-fit: cover; }
.bp-related-card h4 {
  font-family: var(--sans); font-size: 18px; font-weight: 700; line-height: 1.3; margin-bottom: 10px; color: var(--ink);
}
.bp-related-card p {
  font-family: var(--body); font-size: 13.5px; line-height: 1.5; color: var(--ink-mute); margin-bottom: 12px;
}
.bp-related-card .meta {
  font-family: var(--mono); font-size: 11px; color: var(--ink-faint); letter-spacing: 0.04em;
}
.bp-related-card .current-marker {
  display: inline-flex;
  align-items: center;
  margin-left: 8px;
  padding: 2px 7px;
  border: 1px solid rgba(237, 111, 92, 0.32);
  border-radius: 999px;
  color: var(--coral);
  font-family: var(--sans);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
}

/* Footers Base */
footer { border-top: 1px solid var(--line); padding: 60px 0 30px; margin-top: 60px; }
.foot-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 60px; }
.foot-brand .brand { margin-bottom: 18px; display: inline-flex; align-items: center; gap: 10px; font-family: var(--sans); font-weight: 700; color: var(--ink); text-decoration: none; }
.foot-brand .brand .mh-mark { width: 24px; height: 24px; font-size: 12px; }
.foot-brand p { font-family: var(--body); font-size: 13.5px; color: var(--ink-mute); line-height: 1.55; max-width: 38ch; }
.foot-col h5 { font-family: var(--sans); font-size: 11px; color: var(--ink); letter-spacing: 0.18em; text-transform: uppercase; margin-bottom: 18px; font-weight: 700; }
.foot-col ul { list-style: none; }
.foot-col li { margin-bottom: 10px; }
.foot-col a { font-family: var(--body); font-size: 13.5px; color: var(--ink-soft); text-decoration: none; transition: color 0.18s ease; }
.foot-col a:hover { color: var(--coral); }
.foot-bottom { border-top: 1px solid var(--line); padding-top: 22px; display: flex; justify-content: space-between; align-items: center; font-family: var(--sans); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--ink-faint); }
.foot-bottom .right { display: inline-flex; gap: 24px; align-items: center; }

/* Animations */
[data-reveal] {
  opacity: 0;
  translate: 0 24px;
  transition: opacity 800ms cubic-bezier(0.22, 1, 0.36, 1), translate 800ms cubic-bezier(0.22, 1, 0.36, 1);
}
[data-reveal][data-revealed='true'] { opacity: 1; translate: 0 0; }

@media (max-width: 1080px) {
  .bp-pull-quote { margin-right: 0; padding-left: 24px; font-size: 28px; }
  .bp-figure { margin-left: 0; margin-right: 0; }
  .bp-related-grid { gap: 20px; }
  .foot-grid { grid-template-columns: 2fr 1fr 1fr; }
  .foot-col:nth-child(4), .foot-col:nth-child(5) { display: none; }
}
@media (max-width: 768px) {
  .bp-title { font-size: 36px; }
  .bp-deck { font-size: 18px; }
  .bp-related-grid { grid-template-columns: 1fr; }
  .mh-nav { display: none; }
}
</style>
</head>
<body>

<div class="shell">

  <!-- Masthead -->
  <header class="masthead container">
    <a href="index.html" class="mh-brand">
      <span class="mh-mark">M</span>
      Musu
    </a>
    <ul class="mh-nav">
      <li><a href="index.html#about"><span data-len>About</span><span data-lzh>关于</span></a></li>
      <li><a href="index.html#skills"><span data-len>Skills</span><span data-lzh>技能</span></a></li>
      <li><a href="index.html#projects"><span data-len>Projects</span><span data-lzh>项目</span></a></li>
      <li><a href="index.html#blog" style="color:var(--coral);">
        <span data-len>Blog</span><span data-lzh>博客</span>
      </a></li>
    </ul>
    <div class="mh-actions">
      <button class="lang-toggle" id="lang-toggle" aria-label="Switch language">
        <span class="lt-opt" data-lang="en">EN</span>
        <span class="lt-opt" data-lang="zh">中文</span>
      </button>
    </div>
  </header>

  <main>
    <!-- Article Header -->
    <header class="bp-header" data-reveal>
      <div class="bp-category">
        <span data-len>Learning Notes</span><span data-lzh>学习记录</span>
      </div>
      <h1 class="bp-title" data-od-id="headline">
        <span data-len>Learning AI products by making prototypes</span>
        <span data-lzh>通过做原型学习 AI 产品</span>
      </h1>
      <p class="bp-deck">
        <span data-len>Notes on turning product ideas, AI workflows, and interface references into concrete product attempts.</span>
        <span data-lzh>记录如何把产品想法、AI 工作流和界面参考变成一次次具体尝试。</span>
      </p>
      <div class="bp-author-strip">
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23ddd2b6'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-family='serif' font-size='24' fill='%2315140f'>M</text></svg>" alt="Musu">
        <div class="bp-author-meta">
          <span class="name">Musu</span>
        <span class="date">May 14, 2026 &nbsp;·&nbsp; <span data-len>6 min read</span><span data-lzh>阅读 6 分钟</span></span>
        </div>
      </div>
    </header>

    <!-- Hero Image -->
    <figure class="bp-hero" data-reveal data-od-id="hero">
      <div class="bp-hero-img">
        <img src="assets/posts/learning-ai-products-by-making-prototypes/cover.png" alt="Hero Illustration" onerror="this.style.display='none'">
      </div>
      <figcaption>
        <span data-len>FIG 01. Moving a product idea into a visible draft.</span>
        <span data-lzh>图 01. 把一个产品想法推进到可见草稿。</span>
      </figcaption>
    </figure>

    <!-- Editorial Body -->
    <article class="bp-body" data-reveal data-od-id="body">
      
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
        <img src="assets/shared/workflow-map.png" alt="Architecture Diagram" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'800\' height=\'400\'><rect width=\'800\' height=\'400\' fill=\'%23ece4cf\'/><text x=\'50%\' y=\'50%\' text-anchor=\'middle\' font-family=\'sans-serif\' font-size=\'16\' fill=\'%238b8676\'>Architecture Diagram Placeholder</text></svg>'">
        <figcaption>
          <span data-len>FIG 02. Mapping the workflow before deciding where AI belongs.</span>
          <span data-lzh>图 02. 先梳理工作流，再判断 AI 应该参与哪一步。</span>
        </figcaption>
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
      <p data-lzh>所以这篇不是我对 AI 工具的结论，更像是正在使用过程中的一条记录。我想继续观察：不同工具让什么变简单了，又让什么变混乱了，以及我能不能借助这些变化，通过真实项目积累产品判断。</p>
    </article>

    <!-- Author Footer -->
    <div class="bp-author-footer" data-reveal>
      <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80'><rect width='80' height='80' fill='%23ddd2b6'/><text x='50%' y='50%' text-anchor='middle' dy='.3em' font-family='serif' font-size='24' fill='%2315140f'>M</text></svg>" alt="Musu Avatar">
      <div class="bio">
        <span class="bio-name">Musu</span>
        <span data-len>Musu is learning toward AI product management by building projects, recording tool workflows, and using real demos to sharpen product judgment.</span>
        <span data-lzh>王云飞 / Musu 正在通过项目实践、工具工作流记录和真实 demo，积累 AI 产品经验与产品判断。</span>
      </div>
    </div>

    <!-- Related Posts -->
    <section class="bp-related" data-reveal data-od-id="related-grid">
      <div class="bp-related-title">
        <span data-len>Read Next</span><span data-lzh>延伸阅读</span>
      </div>
      <div class="bp-related-grid">
        <a href="index.html#blog" class="bp-related-card">
          <div class="img">
            <img src="assets/posts/noticing-ai-tools/cover.png" alt="Related 01" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\'><rect width=\'300\' height=\'200\' fill=\'%23ece4cf\'/></svg>'">
          </div>
          <h4 data-len>What I notice while building with AI tools</h4>
          <h4 data-lzh>我在使用 AI 工具时观察到的事情</h4>
          <p data-len>Notes on Codex, Obsidian, Open Design, Claude Code, and how ideas become working projects.</p>
          <p data-lzh>关于 Codex、Obsidian、Open Design、Claude Code，以及想法如何变成可运行项目的观察。</p>
          <span class="meta">2026 · NOTES</span>
        </a>
        <a href="projects/paperforge" class="bp-related-card">
          <div class="img">
            <img src="assets/projects/promptcase/card.png" alt="Related 02" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\'><rect width=\'300\' height=\'200\' fill=\'%23ddd2b6\'/></svg>'">
          </div>
          <h4 data-len>PaperForge as a product exercise</h4>
          <h4 data-lzh>把 PaperForge 当作一次产品练习</h4>
          <p data-len>How a research writing workflow became an AI-assisted model setup product exercise.</p>
          <p data-lzh>一个研究写作流程如何变成 AI 辅助的模型设定产品练习。</p>
          <span class="meta">2026 · PROJECT NOTES</span>
        </a>
        <a href="projects/weblearnboost" class="bp-related-card">
          <div class="img">
            <img src="assets/projects/paperforge/card.png" alt="Related 03" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'200\'><rect width=\'300\' height=\'200\' fill=\'%23f7f1de\'/></svg>'">
          </div>
          <h4 data-len>WebLearnBoost and learning flow</h4>
          <h4 data-lzh>WebLearnBoost 与学习流程</h4>
          <p data-len>Notes on turning webpages into maps, questions, history, and Markdown study packs.</p>
          <p data-lzh>记录如何把网页转成学习地图、练习题、历史记录和 Markdown 学习包。</p>
          <span class="meta">2026 · PROJECT NOTES</span>
        </a>
      </div>
    </section>

  </main>

  <!-- footer -->
  <footer>
    <div class="container">
      <div class="foot-grid">
        <div class="foot-brand">
          <a href="index.html" class="brand">
            <span class="mh-mark">M</span>
            Musu
          </a>
          <p data-len>Personal homepage of Musu — learning to become an AI product manager through prototypes, notes, and practice.</p>
          <p data-lzh>牧晚吟 / Musu 的个人主页 —— 通过原型、笔记和实践，学习成为一名 AI 产品经理。</p>
        </div>
        <div class="foot-col">
          <h5 data-len>Navigate</h5><h5 data-lzh>导航</h5>
          <ul>
            <li><a href="index.html#about"><span data-len>About</span><span data-lzh>关于</span></a></li>
            <li><a href="index.html#skills"><span data-len>Skills</span><span data-lzh>技能</span></a></li>
            <li><a href="index.html#projects"><span data-len>Projects</span><span data-lzh>项目</span></a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5 data-len>Connect</h5><h5 data-lzh>连接</h5>
          <ul>
            <li><a href="https://github.com/Musu6856" target="_blank" rel="noreferrer noopener">GitHub</a></li>
            <li><a href="index.html#contact">WeChat</a></li>
            <li><a href="mailto:1803162257@qq.com">Email</a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5 data-len>Projects</h5><h5 data-lzh>项目</h5>
          <ul>
            <li><a href="projects/paperforge"><span data-len>PaperForge</span><span data-lzh>PaperForge</span></a></li>
            <li><a href="projects/weblearnboost"><span data-len>WebLearnBoost</span><span data-lzh>WebLearnBoost</span></a></li>
          </ul>
        </div>
        <div class="foot-col">
          <h5 data-len>Blog</h5><h5 data-lzh>博客</h5>
          <ul>
            <li><a href="blog-post.html"><span data-len>AI Product Notes</span><span data-lzh>AI 产品笔记</span></a></li>
            <li><a href="index.html#blog"><span data-len>All Notes</span><span data-lzh>全部笔记</span></a></li>
          </ul>
        </div>
      </div>

      <div class="foot-bottom">
        <span><span class="pulse"></span> Musu &nbsp;·&nbsp; MMXXVI</span>
        <span class="right">
          <span data-len>Learn · Prototype · Share</span>
          <span data-lzh>学习 · 原型 · 分享</span>
          <span>XI'AN</span>
        </span>
      </div>
    </div>
  </footer>

</div>

<script>
  document.addEventListener('DOMContentLoaded', () => {
    // Language Toggle
    const toggle = document.getElementById('lang-toggle');
    if (toggle) {
      const opts = toggle.querySelectorAll('.lt-opt');
      const html = document.documentElement;
      
      const setLang = (lang) => {
        html.setAttribute('lang', lang);
        try { localStorage.setItem('musu-lang', lang); } catch(e) {}
        updateToggle();
      };

      const updateToggle = () => {
        const currentLang = html.getAttribute('lang') || 'zh';
        opts.forEach(opt => opt.classList.toggle('active', opt.dataset.lang === currentLang));
      };

      let saved = null;
      try { saved = localStorage.getItem('musu-lang'); } catch(e) {}
      setLang(saved || 'zh');
      
      toggle.addEventListener('click', () => {
        setLang(html.getAttribute('lang') === 'en' ? 'zh' : 'en');
      });
    }

    // Scroll Reveal 
    const reveals = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-revealed', 'true');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -100px 0px' });
    
    reveals.forEach(r => observer.observe(r));
  });
</script>

</body>
</html>
`;
