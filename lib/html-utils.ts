export function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function replaceAllPairs(html: string, replacements: Array<[string, string]>) {
  return replacements.reduce((current, [from, to]) => current.replaceAll(from, to), html);
}

export function replaceOnce(html: string, from: string, to: string) {
  const index = html.indexOf(from);
  if (index === -1 || from === to) return html;
  return html.slice(0, index) + to + html.slice(index + from.length);
}
