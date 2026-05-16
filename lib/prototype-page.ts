export { normalizePrototypeLinks } from "@/lib/prototype-links";

export type PrototypePage = {
  title: string;
  headLinks: PrototypeHeadLink[];
  styles: string[];
  body: string;
  scripts: string[];
};

export type PrototypeHeadLink = {
  rel?: string;
  href?: string;
  crossOrigin?: "" | "anonymous" | "use-credentials";
};

function matchAll(html: string, pattern: RegExp) {
  return Array.from(html.matchAll(pattern), (match) => match[1] ?? "");
}

function parseAttributes(tag: string) {
  const attributes: Record<string, string> = {};
  const pattern = /([a-zA-Z:-]+)(?:=(["'])(.*?)\2|=([^\s>]+))?/g;

  for (const match of tag.matchAll(pattern)) {
    const [, rawName, , quotedValue, bareValue] = match;
    if (rawName.toLowerCase() === "link") continue;
    attributes[rawName.toLowerCase()] = quotedValue ?? bareValue ?? "";
  }

  return attributes;
}

function headLinks(html: string): PrototypeHeadLink[] {
  const head = html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? "";
  return Array.from(head.matchAll(/<link\b[^>]*>/gi), (match) => {
    const attributes = parseAttributes(match[0]);
    const crossOrigin: PrototypeHeadLink["crossOrigin"] =
      attributes.crossorigin === "" || attributes.crossorigin === "anonymous" || attributes.crossorigin === "use-credentials"
        ? attributes.crossorigin
        : undefined;

    return {
      rel: attributes.rel,
      href: attributes.href,
      crossOrigin,
    };
  }).filter((link) => link.rel || link.href);
}

export function splitPrototypeHtml(html: string): PrototypePage {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "Musu";
  const styles = matchAll(html, /<style>([\s\S]*?)<\/style>/gi);
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const scripts = matchAll(body, /<script[^>]*>([\s\S]*?)<\/script>/gi);
  const bodyWithoutScripts = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  return {
    title,
    headLinks: headLinks(html),
    styles,
    body: bodyWithoutScripts,
    scripts,
  };
}
