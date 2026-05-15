import { readFile } from "node:fs/promises";
import path from "node:path";

const htmlHeaders = {
  "content-type": "text/html; charset=utf-8",
  "cache-control": "no-store",
};

export async function prototypeResponse(fileName: string) {
  const html = await prototypeHtml(fileName);
  return htmlResponse(html);
}

export async function prototypeHtml(fileName: string) {
  const filePath = path.join(process.cwd(), "prototype", fileName);
  return readFile(filePath, "utf8");
}

export function htmlResponse(html: string) {
  return new Response(html, { headers: htmlHeaders });
}
