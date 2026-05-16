# 个人网站维护说明

这个项目已经过了“直接加载 HTML 原型”的阶段。现在它是一个 Next.js 网站：保留原始 HTML 原型作为视觉参考，但正式运行时由 `app/` 路由、`lib/page-templates/` 模板、`content/` 内容文件和 `public/assets/` 图片资源共同渲染。

## 当前状态

- 正式网站运行时不再读取 `prototype/` 里的 HTML 文件。
- 原始 HTML 原型已经迁入 `lib/page-templates/`。
- 页面路由在 `app/`。
- 大部分可维护内容在 `content/`。
- 项目详情页的大段正文在 `content/project-details.ts`。
- 正式图片资源在 `public/assets/`。
- `prototype/` 现在是视觉对照档案，不是生产源码。

## 本地运行

在项目根目录运行：

```powershell
npm test
npm run build
npm run start -- -p 3002
```

本地预览地址：

```text
http://127.0.0.1:3002/
```

## 页面路由

- `/`：首页。
- `/uses` 和 `/tool-list.html`：工具清单页。
- `/blog` 和 `/blog-post.html`：默认博客详情页。
- `/blog/[slug]`：单篇博客详情页。
- `/projects`：项目入口页，目前复用首页项目区的页面形态。
- `/project-detail.html`：默认项目详情页。
- `/projects/[slug]`：单个项目详情页。

保留 `.html` 路由是为了兼容原型里的旧链接。

## 内容在哪里改

### 发布和隐藏内容

项目和博客都有两个容易混淆但用途不同的字段：

```ts
published: true | false
featured: true | false
```

- `published` 是公开开关。设为 `false` 后，内容仍保留在代码里，但不会出现在首页、footer、公开列表、详情页路由和延伸阅读里。
- `featured` 是重点展示标记。它不负责公开或隐藏；`featured: true` 但 `published: false` 的内容仍然不会公开。

上线前如果某个项目或博客还是虚构、占位、计划中、没有真实截图或没有真实正文，就把它设为：

```ts
published: false
```

当前公开项目：

- `paperforge`
- `weblearnboost`

当前隐藏项目：

- `promptcase`
- `personal-web`
- `prototype-gallery`

当前公开博客：

- `noticing-ai-tools`
- `paperforge-as-product-exercise`

当前隐藏博客：

- `learning-ai-products-by-making-prototypes`

以后要隐藏博客时，把对应文章改成 `published: false`；要重新发布时，确认正文、封面图和延伸阅读都是真实内容，再改回 `published: true`。

### 个人信息和首页文案

主要改这里：

```text
content/profile.ts
```

这里适合维护：

- 首页介绍
- 关于我文案
- 联系方式
- footer 简介
- 地址
- 邮箱
- GitHub
- 微信号

首页的视觉结构仍然来自：

```text
lib/page-templates/home.ts
```

只有在要改布局、class、动画、滚动 reveal、页面结构时，才动这个模板。

### 项目卡片和项目列表信息

改这里：

```text
content/projects.ts
```

这里适合维护：

- 项目 slug
- 项目标题
- 项目分类
- 年份和状态
- 项目卡片图片
- 项目短描述
- 技术栈
- 是否公开展示：`published`
- 是否重点展示：`featured`

### 项目详情页正文

改这里：

```text
content/project-details.ts
```

这里适合维护：

- 项目详情页标题
- 项目详情 intro
- 中间说明段落
- 引用文案
- 图片说明
- 最后一段总结
- 下一个项目链接和名称

项目详情页模板在：

```text
lib/page-templates/projectDetail.ts
```

项目详情页渲染器在：

```text
lib/project-detail-renderer.ts
```

模板里面有很多 `data-slot` 标记。不要随便删掉或改名，除非同步更新 `lib/project-detail-renderer.ts` 和测试。

### 博客文章

改这里：

```text
content/posts.ts
```

这里适合维护：

- 博客 slug
- 标题
- 日期
- 类型标签
- 封面图
- 阅读时间
- 摘要
- 正文内容
- 是否公开展示：`published`
- 是否重点展示：`featured`

博客详情页的视觉模板在：

```text
lib/page-templates/blogPost.ts
```

底部“延伸阅读”根据 `content/posts.ts` 里的文章顺序生成。

### 工具清单

改这里：

```text
content/tools.ts
```

这里适合维护：

- 硬件设备
- 软件和编辑器
- 技术栈
- 每个工具的名称、徽标和描述

工具页现在刻意贴近原版 HTML。渲染器不会输出分类编号和分类介绍段落，因为原版工具页没有这些内容。

### 图片资源

图片路径集中在：

```text
content/assets.ts
```

实际图片文件放在：

```text
public/assets/
```

常用目录：

- `public/assets/site/`：首页各区块图片。
- `public/assets/projects/`：项目卡片图和项目详情图。
- `public/assets/posts/`：博客封面图。
- `public/assets/shared/`：多个页面共用的图片。

如果在 `content/assets.ts` 里新增图片路径，要确保对应文件真的放在 `public/` 下。测试会检查这些路径。

## 模板和渲染文件关系

- `components/prototype/PrototypeDocument.tsx`：渲染迁入后的模板 body、内联 style 和脚本。
- `lib/prototype-page.ts`：把 HTML 模板拆成 title、head links、styles、body、scripts。
- `lib/prototype-links.ts`：把原型里的旧链接转成 Next 路由。
- `lib/site-renderers.ts`：把首页、工具页、博客页的结构化内容注入模板。
- `content/project-details.ts`：维护项目详情页正文、链接文字、图片说明和下一个项目入口。
- `lib/project-detail-renderer.ts`：把项目详情内容注入项目详情模板的 `data-slot`。
- `lib/slug-pages.ts`：处理 `/blog/[slug]` 和 `/projects/[slug]`。
- `lib/page-factories.tsx`：把模板、渲染器和页面组件串起来。

## prototype 文件夹怎么处理

暂时保留：

```text
prototype/
```

它现在的作用是：

- 对照原版视觉。
- 检查原版布局。
- 检查原版动效和交互。
- 当页面看起来不一致时，用来判断是不是迁移后跑偏。

不要恢复运行时代码去读取 `prototype/`。正式运行应该继续使用 `lib/page-templates/`、`content/` 和 `public/assets/`。

## 改视觉结构前的规则

视觉相关改动要保守处理。

1. 先确认用户看到的具体问题。
2. 对照当前页面和 `prototype/` 原版。
3. 优先修具体元素，不要先动全局布局或滚动容器。
4. 改完后必须回到用户发现问题的同一个页面和视口检查。
5. 桌面端确认后，再至少检查一个手机宽度。

## 验证清单

改完代码后至少运行：

```powershell
npm test
npm run build
```

涉及视觉、图片、链接、路由时，还要打开本地预览：

```text
http://127.0.0.1:3002/
```

建议检查这些页面：

- `/`
- `/tool-list.html`
- `/projects/paperforge`
- `/projects/weblearnboost`
- `/blog/noticing-ai-tools`
- `/blog/paperforge-as-product-exercise`

## 当前已知的后续清理项

- 部分内容源文件里的中文在终端里可能显示成乱码。判断页面是否正确时，以浏览器渲染效果为准。
- `prototype/` 可以等全站视觉验收完成后再归档，不建议现在删除。
- 项目详情正文已经拆到 `content/project-details.ts`；后面新增或修改项目详情时优先改这个文件。
