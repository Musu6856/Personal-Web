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

export function replaceRequired(html: string, from: string, to: string, label = from) {
  const count = countOccurrences(html, from);
  if (count !== 1) {
    throw new Error(`Expected one match for ${label}, found ${count}.`);
  }

  return replaceOnce(html, from, to);
}

export function replaceAllRequired(html: string, from: string, to: string, label = from) {
  const count = countOccurrences(html, from);
  if (count < 1) {
    throw new Error(`Expected at least one match for ${label}, found 0.`);
  }

  return html.replaceAll(from, to);
}

export function replaceRequiredPairs(html: string, replacements: Array<[string, string, string?]>) {
  return replacements.reduce((current, [from, to, label]) => replaceAllRequired(current, from, to, label), html);
}

function findMarker(html: string, marker: string, startIndex: number) {
  const lfIndex = html.indexOf(marker, startIndex);
  if (lfIndex !== -1) return { index: lfIndex, marker };

  if (marker.includes("\n")) {
    const crlfMarker = marker.replaceAll("\n", "\r\n");
    const crlfIndex = html.indexOf(crlfMarker, startIndex);
    if (crlfIndex !== -1) return { index: crlfIndex, marker: crlfMarker };
  }

  return { index: -1, marker };
}

export function replaceRequiredBetween(html: string, start: string, end: string, replacement: string, label: string) {
  const startCount = countOccurrences(html, start);
  if (startCount !== 1) {
    throw new Error(`Expected one start marker for ${label}, found ${startCount}.`);
  }

  const startIndex = html.indexOf(start);
  const contentStart = startIndex + start.length;
  const endMatch = findMarker(html, end, contentStart);
  if (endMatch.index === -1) {
    throw new Error(`Missing end marker for ${label}.`);
  }

  const newline = endMatch.marker.includes("\r\n") ? "\r\n" : "\n";
  return html.slice(0, contentStart) + newline + replacement + newline + "    " + html.slice(endMatch.index);
}
