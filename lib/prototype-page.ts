export { normalizePrototypeLinks } from "@/lib/prototype-links";

export type PrototypePage = {
  title: string;
  styles: string[];
  body: string;
  scripts: string[];
};

function matchAll(html: string, pattern: RegExp) {
  return Array.from(html.matchAll(pattern), (match) => match[1] ?? "");
}

export function splitPrototypeHtml(html: string): PrototypePage {
  const title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "Musu";
  const styles = matchAll(html, /<style>([\s\S]*?)<\/style>/gi);
  const body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  const scripts = matchAll(body, /<script[^>]*>([\s\S]*?)<\/script>/gi);
  const bodyWithoutScripts = body.replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");

  return {
    title,
    styles,
    body: bodyWithoutScripts,
    scripts,
  };
}
