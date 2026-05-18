import { projectDetails, type ProjectDetail } from "@/content/project-details";
import { publicProjects } from "@/content/projects";
import { escapeHtml } from "@/lib/html-utils";
import { pageTemplate } from "@/lib/page-template-registry";
import { publicProjectHref, renderPublicFooterContent } from "@/lib/public-navigation";
import { normalizePrototypeLinks } from "@/lib/prototype-links";

export type ProjectDetailImages = {
  cover: string;
  galleryOne: string;
  galleryTwo: string;
  wide: string;
};

const defaultImages: ProjectDetailImages = {
  cover: "assets/projects/paperforge/card.png",
  galleryOne: "assets/shared/legacy-project-light.png",
  galleryTwo: "assets/shared/legacy-project-dark.png",
  wide: "assets/shared/workflow-map.png",
};

const contentSlots: Array<[string, (detail: ProjectDetail) => string]> = [
  ["project.titleTag", (detail) => escapeHtml(detail.titleTag)],
  ["project.category.en", (detail) => escapeHtml(detail.categoryEn)],
  ["project.category.zh", (detail) => escapeHtml(detail.categoryZh)],
  ["project.index", (detail) => escapeHtml(detail.index)],
  ["project.title.en", (detail) => detail.titleEn],
  ["project.title.zh", (detail) => detail.titleZh],
  ["project.role.en", (detail) => escapeHtml(detail.roleEn)],
  ["project.role.zh", (detail) => escapeHtml(detail.roleZh)],
  ["project.context.en", (detail) => escapeHtml(detail.contextEn)],
  ["project.context.zh", (detail) => escapeHtml(detail.contextZh)],
  ["project.linkLabel.en", (detail) => escapeHtml(detail.linkLabelEn)],
  ["project.linkLabel.zh", (detail) => escapeHtml(detail.linkLabelZh)],
  ["project.intro.en", (detail) => escapeHtml(detail.introEn)],
  ["project.intro.zh", (detail) => escapeHtml(detail.introZh)],
  ["project.sectionTitle.en", (detail) => escapeHtml(detail.sectionTitleEn)],
  ["project.sectionTitle.zh", (detail) => escapeHtml(detail.sectionTitleZh)],
  ["project.sectionBody.en", (detail) => escapeHtml(detail.sectionBodyEn)],
  ["project.sectionBody.zh", (detail) => escapeHtml(detail.sectionBodyZh)],
  ["project.quote.en", (detail) => escapeHtml(detail.quoteEn)],
  ["project.quote.zh", (detail) => escapeHtml(detail.quoteZh)],
  ["project.stack.en", (detail) => escapeHtml(detail.stackEn)],
  ["project.stack.zh", (detail) => escapeHtml(detail.stackZh)],
  ["project.captionOne.en", (detail) => escapeHtml(detail.captionOneEn)],
  ["project.captionOne.zh", (detail) => escapeHtml(detail.captionOneZh)],
  ["project.captionTwo.en", (detail) => escapeHtml(detail.captionTwoEn)],
  ["project.captionTwo.zh", (detail) => escapeHtml(detail.captionTwoZh)],
  ["project.finalTitle.en", (detail) => escapeHtml(detail.finalTitleEn)],
  ["project.finalTitle.zh", (detail) => escapeHtml(detail.finalTitleZh)],
  ["project.finalBody.en", (detail) => escapeHtml(detail.finalBodyEn)],
  ["project.finalBody.zh", (detail) => escapeHtml(detail.finalBodyZh)],
  ["project.next.en", (detail) => escapeHtml(detail.nextEn)],
  ["project.next.zh", (detail) => escapeHtml(detail.nextZh)],
];

function nextPublicProject(detail: ProjectDetail) {
  const slug = detail.nextHref.replace(/^\/?projects\//, "");
  const configured = publicProjects.find((project) => project.slug === slug);
  const fallback = publicProjects.find((project) => project.title.en !== detail.nextEn) ?? publicProjects[0];

  return configured ?? fallback;
}

function assetPath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countOccurrences(html: string, needle: string) {
  if (!needle) return 0;
  let count = 0;
  let index = 0;

  while (true) {
    index = html.indexOf(needle, index);
    if (index === -1) return count;
    count += 1;
    index += needle.length;
  }
}

function assertSingleSlot(html: string, slot: string) {
  const count = countOccurrences(html, `data-slot="${slot}"`);
  if (count !== 1) {
    throw new Error(`Expected one project detail slot for ${slot}, found ${count}.`);
  }
}

function findTagEnd(html: string, startIndex: number) {
  let quote: '"' | "'" | null = null;

  for (let index = startIndex; index < html.length; index += 1) {
    const char = html[index];

    if (quote) {
      if (char === quote) quote = null;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === ">") return index;
  }

  return -1;
}

function replaceSlotHtml(html: string, slot: string, content: string) {
  assertSingleSlot(html, slot);

  const pattern = new RegExp(
    `(<([a-z0-9-]+)[^>]*data-slot="${escapeRegExp(slot)}"[^>]*>)[\\s\\S]*?(<\\/\\2>)`,
    "i",
  );

  if (!pattern.test(html)) {
    throw new Error(`Expected an element body for project detail slot ${slot}.`);
  }

  return html.replace(pattern, (_match, open: string, _tag: string, close: string) => `${open}${content}${close}`);
}

function replaceSlotAttribute(html: string, slot: string, attr: string, value: string) {
  assertSingleSlot(html, slot);

  const marker = `data-slot="${slot}"`;
  const markerIndex = html.indexOf(marker);
  const tagStart = html.lastIndexOf("<", markerIndex);
  const tagEnd = findTagEnd(html, markerIndex);

  if (tagStart === -1 || tagEnd === -1) {
    throw new Error(`Expected an element tag for project detail slot ${slot}.`);
  }

  const tag = html.slice(tagStart, tagEnd + 1);
  const attrPattern = new RegExp(`\\s${escapeRegExp(attr)}="[^"]*"`);

  if (!attrPattern.test(tag)) {
    throw new Error(`Expected ${attr} on project detail slot ${slot}.`);
  }

  const nextTag = tag.replace(attrPattern, ` ${attr}="${escapeHtml(value)}"`);
  return html.slice(0, tagStart) + nextTag + html.slice(tagEnd + 1);
}

function upsertSlotAttribute(html: string, slot: string, attr: string, value: string) {
  assertSingleSlot(html, slot);

  const marker = `data-slot="${slot}"`;
  const markerIndex = html.indexOf(marker);
  const tagStart = html.lastIndexOf("<", markerIndex);
  const tagEnd = findTagEnd(html, markerIndex);

  if (tagStart === -1 || tagEnd === -1) {
    throw new Error(`Expected an element tag for project detail slot ${slot}.`);
  }

  const tag = html.slice(tagStart, tagEnd + 1);
  const attrPattern = new RegExp(`\\s${escapeRegExp(attr)}="[^"]*"`);
  const nextTag = attrPattern.test(tag)
    ? tag.replace(attrPattern, ` ${attr}="${escapeHtml(value)}"`)
    : tag.replace(/\s*>$/, ` ${attr}="${escapeHtml(value)}">`);

  return html.slice(0, tagStart) + nextTag + html.slice(tagEnd + 1);
}

function svgFallback(width: number, height: number, fill: string, text: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="${width}" height="${height}" fill="${fill}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="serif" font-style="italic" font-size="24" fill="#8b8676">${escapeHtml(text)}</text></svg>`;
  return `this.src='data:image/svg+xml;utf8,${encodeURIComponent(svg)}'`;
}

function replaceSlotImage(html: string, slot: string, src: string, alt: string, fallbackText: string, lazy = true) {
  let rendered = replaceSlotAttribute(html, slot, "src", assetPath(src));
  rendered = replaceSlotAttribute(rendered, slot, "alt", alt);
  rendered = upsertSlotAttribute(rendered, slot, "decoding", "async");
  if (lazy) {
    rendered = upsertSlotAttribute(rendered, slot, "loading", "lazy");
  }
  return replaceSlotAttribute(rendered, slot, "onerror", svgFallback(1200, 675, "#f7f1de", fallbackText));
}

function renderProjectWording(html: string) {
  return html
    .replaceAll("Learn · Prototype · Share · Repeat", "Learn · Build · Share · Repeat")
    .replaceAll("学习 · 原型 · 分享 · 重复", "学习 · 项目 · 分享 · 重复")
    .replaceAll("Learn · Prototype · Share", "Learn · Build · Share")
    .replaceAll("学习 · 原型 · 分享", "学习 · 项目 · 分享")
    .replaceAll("Personal homepage of Musu — learning to become an AI product manager through prototypes, notes, and practice.", "Personal homepage of Musu — learning to become an AI product manager through projects, notes, and practice.")
    .replaceAll("牧晚吟 / Musu 的个人主页 —— 通过原型、笔记和实践，学习成为一名 AI 产品经理。", "王云飞 / Musu 的个人主页 —— 通过项目、笔记和实践，学习成为一名 AI 产品经理。");
}

export function renderProjectDetailHtml(
  template: string,
  detail: ProjectDetail,
  images: ProjectDetailImages = defaultImages,
) {
  const nextProject = nextPublicProject(detail);
  let html = renderProjectWording(template);
  html = renderPublicFooterContent(html, "            ");

  for (const [slot, resolve] of contentSlots) {
    html = replaceSlotHtml(html, slot, resolve(detail));
  }

  if (nextProject) {
    html = replaceSlotHtml(html, "project.next.en", escapeHtml(nextProject.title.en));
    html = replaceSlotHtml(html, "project.next.zh", escapeHtml(nextProject.title.zh));
  }

  html = replaceSlotHtml(html, "project.link", escapeHtml(detail.linkText));
  html = replaceSlotAttribute(html, "project.link", "href", detail.linkHref);
  html = replaceSlotAttribute(html, "project.nextLink", "href", nextProject ? publicProjectHref(nextProject.slug) : "/#projects");

  html = replaceSlotImage(html, "project.image.cover", images.cover, detail.coverAlt, detail.coverFallback, false);
  html = replaceSlotImage(html, "project.image.galleryOne", images.galleryOne, detail.captionOneEn, detail.captionOneEn);
  html = replaceSlotImage(html, "project.image.galleryTwo", images.galleryTwo, detail.captionTwoEn, detail.captionTwoEn);
  html = replaceSlotImage(html, "project.image.wide", images.wide, detail.wideFallback, detail.wideFallback);

  return normalizePrototypeLinks(html);
}

export function projectDetailHtml(slug: string, images: ProjectDetailImages = defaultImages) {
  const detail = projectDetails[slug];

  if (!detail) {
    throw new Error(`Unknown project slug: ${slug}`);
  }

  return renderProjectDetailHtml(pageTemplate("projectDetail"), detail, images);
}
