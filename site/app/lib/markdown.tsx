import type { ReactNode } from "react";

// A deliberately small markdown-to-JSX renderer for the fixed set of posts in
// app/content-data.ts. It supports exactly the subset of markdown those posts
// use -- "## " headings, "- " list items, paragraphs, **bold**, *italic*, and
// [text](url) links -- and renders the given text unchanged; it never alters
// wording, facts, or punctuation.

const INLINE_PATTERN = /\*\*(.+?)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)]+)\)/g;

export function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let index = 0;
  let match: RegExpExecArray | null;
  INLINE_PATTERN.lastIndex = 0;
  while ((match = INLINE_PATTERN.exec(text))) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    if (match[1] !== undefined) {
      nodes.push(<strong key={`${keyPrefix}-${index}`}>{match[1]}</strong>);
    } else if (match[2] !== undefined) {
      nodes.push(<em key={`${keyPrefix}-${index}`}>{match[2]}</em>);
    } else {
      const label = match[3];
      const href = match[4];
      const external = /^https?:\/\//.test(href);
      nodes.push(
        <a
          key={`${keyPrefix}-${index}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {label}
        </a>,
      );
    }
    index += 1;
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export function renderMarkdown(markdown: string): ReactNode[] {
  const lines = markdown.split("\n");
  const blocks: ReactNode[] = [];
  let blockIndex = 0;
  let listItems: string[] = [];
  let paragraphLines: string[] = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) return;
    const text = paragraphLines.join(" ");
    blocks.push(<p key={`p-${blockIndex}`}>{renderInline(text, `p-${blockIndex}`)}</p>);
    blockIndex += 1;
    paragraphLines = [];
  }

  function flushList() {
    if (listItems.length === 0) return;
    const items = listItems;
    blocks.push(
      <ul key={`ul-${blockIndex}`}>
        {items.map((item, itemIndex) => (
          <li key={itemIndex}>{renderInline(item, `ul-${blockIndex}-${itemIndex}`)}</li>
        ))}
      </ul>,
    );
    blockIndex += 1;
    listItems = [];
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line === "") {
      flushParagraph();
      flushList();
      continue;
    }
    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      const text = line.slice(3).trim();
      blocks.push(<h2 key={`h2-${blockIndex}`}>{renderInline(text, `h2-${blockIndex}`)}</h2>);
      blockIndex += 1;
      continue;
    }
    if (line.startsWith("- ")) {
      flushParagraph();
      listItems.push(line.slice(2).trim());
      continue;
    }
    paragraphLines.push(line);
  }
  flushParagraph();
  flushList();

  return blocks;
}

export interface MarkdownSection {
  heading: string;
  body: string;
}

// Splits a document on its "## " headings so a page can select specific
// sections (e.g. the home page renders "What this is" and "Why this exists"
// verbatim but replaces "The articles" with a generated post list).
export function parseSections(markdown: string): MarkdownSection[] {
  const lines = markdown.split("\n");
  const sections: { heading: string; body: string[] }[] = [];
  let current: { heading: string; body: string[] } | null = null;
  for (const line of lines) {
    if (line.startsWith("## ")) {
      if (current) sections.push(current);
      current = { heading: line.slice(3).trim(), body: [] };
    } else if (current) {
      current.body.push(line);
    }
  }
  if (current) sections.push(current);
  return sections.map((section) => ({
    heading: section.heading,
    body: section.body.join("\n").trim(),
  }));
}
