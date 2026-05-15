# Next.js Migration Guardrails

当前阶段的目标不是重画网站，而是用 Next.js 承载并逐步迁移现有 HTML 原型。

## 视觉真源

- `prototype/index.html`
- `prototype/project-detail.html`
- `prototype/blog-post.html`
- `prototype/tool-list.html`

这些文件是视觉、布局、动效、hover、语言切换、滚动 reveal、项目筛选等交互的唯一标准。

## 当前实现

Next.js 通过 route handlers 直接返回 `prototype/` 里的 HTML：

- `/` -> `prototype/index.html`
- `/index.html` -> `prototype/index.html`
- `/tool-list.html` 和 `/uses` -> `prototype/tool-list.html`
- `/project-detail.html` 和 `/projects/*` -> `prototype/project-detail.html`
- `/blog-post.html` 和 `/blog/*` -> `prototype/blog-post.html`

这样做的目的是先保证视觉和交互不丢，再逐块迁移到 React。

## 后续迁移规则

1. 每次只迁移一个页面或一个模块。
2. React 组件必须保留原 HTML 的 class、层级、文案结构和脚本行为。
3. 迁移前后必须用浏览器截图对照。
4. 未完成对照前，不删除 `prototype/` 原文件。
5. 内容数据化只能改变数据来源，不能改变视觉结果。
