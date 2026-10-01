import * as React from "react";

/**
 * Decodes common HTML entity references into their character representations.
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'");
}

/**
 * Cleans orphaned closing tags (like </em> at start of line) and ensures unclosed tags are closed.
 */
function balanceLineTags(line: string): string {
  let l = line.replace(/^<\/(em|strong|b|i|span)>/i, "").trim();
  const tags = ["em", "strong", "b", "i", "span"];
  for (const tag of tags) {
    const openMatches = (l.match(new RegExp(`<${tag}[^>]*>`, "gi")) || [])
      .length;
    const closeMatches = (l.match(new RegExp(`<\/${tag}>`, "gi")) || []).length;
    if (openMatches > closeMatches) {
      l += `</${tag}>`;
    }
  }
  return l;
}

/**
 * Strips HTML tags, markdown symbols, and returns a clean, single-line text excerpt
 * suitable for previews, summaries, and collapsed cards without raw tags.
 */
export function getPlainTextExcerpt(
  htmlOrMarkdown?: string | null,
  maxLength = 220,
): string {
  if (!htmlOrMarkdown) return "";
  const decoded = decodeHtmlEntities(htmlOrMarkdown);

  // Insert space on line breaks and closing tags to prevent words fusing together
  const spaced = decoded
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<\/p>/gi, " ")
    .replace(/<\/li>/gi, " ");

  // Strip all HTML tags
  let text = spaced.replace(/<[^>]+>/g, " ");

  // Strip markdown headers: e.g. "## Mô tả công việc"
  text = text.replace(/^#+\s*[^.\n]+[:.]?\s*/gi, "");

  // Strip bullet markers (*, -, •)
  text = text.replace(/[*•-]\s*/g, " ");

  // Collapse whitespaces
  text = text.replace(/\s+/g, " ").trim();

  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
}

/**
 * Formats rich text from HTML editors (TipTap/Quill) or mixed Markdown
 * into clean, beautifully structured HTML with uniform lists and paragraphs.
 */
export function formatRichJobContent(htmlOrMarkdown?: string | null): string {
  if (!htmlOrMarkdown) return "";
  let content = decodeHtmlEntities(htmlOrMarkdown).trim();

  // Strip empty paragraphs at start or end
  content = content
    .replace(/^<p>\s*<\/p>/i, "")
    .replace(/<p>\s*<\/p>$/i, "")
    .trim();

  // If it already has <ul> or <ol>, clean redundant markdown heading inside <p> or before <ul>
  if (/<(ul|ol)[\s>]/i.test(content)) {
    content = content.replace(/<p>\s*##\s*[^<]+<\/p>/gi, "");
    return content;
  }

  // Remove wrapping <p> and </p> if whole content is wrapped in single <p>
  let inner = content;
  if (/^<p[^>]*>[\s\S]*<\/p>$/i.test(content)) {
    inner = content
      .replace(/^<p[^>]*>/i, "")
      .replace(/<\/p>$/i, "")
      .trim();
  }

  // Remove markdown headers at start (longest match first)
  inner = inner.replace(
    /^##\s*(Mô tả công việc|Mô tả|Yêu cầu công việc|Yêu cầu|Quyền lợi ứng viên|Quyền lợi được hưởng|Quyền lợi)[:.]?\s*/i,
    "",
  );

  // Check if content has <br> or newline separating lines
  const hasBr = /<br\s*\/?>/i.test(inner);
  const hasNewline = /\r?\n/.test(inner);

  if (hasBr || hasNewline) {
    const rawLines = inner.split(/<br\s*\/?>|\r?\n/);
    const cleanedLines = rawLines
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => l.replace(/^[*•-]\s*/, "").trim())
      .map(balanceLineTags)
      .filter(Boolean);

    if (cleanedLines.length > 1) {
      const itemsHtml = cleanedLines.map((line) => `<li>${line}</li>`).join("");
      return `<ul class="job-rich-list">${itemsHtml}</ul>`;
    }
  }

  // Check if content has inline dashes separating bullet items: "Intro text - item 1 - item 2"
  // Note: we use negative lookahead (?!\d) to avoid breaking salary ranges like "15 - 25 triệu"
  if (/\s+-\s+(?!\d)/.test(inner)) {
    const parts = inner.split(/\s+-\s+(?!\d)/);
    if (parts.length > 1) {
      const intro = parts[0].trim();
      const items = parts
        .slice(1)
        .map((p) => p.trim())
        .map(balanceLineTags)
        .filter(Boolean);

      let res = "";
      if (intro && !intro.startsWith("-")) {
        res += `<p class="job-rich-intro">${balanceLineTags(intro)}</p>`;
      } else if (intro.startsWith("-")) {
        items.unshift(balanceLineTags(intro.replace(/^-+\s*/, "")));
      }

      if (items.length > 0) {
        res += `<ul class="job-rich-list">${items
          .map((item) => `<li>${item}</li>`)
          .join("")}</ul>`;
      }
      return res;
    }
  }

  // Default fallback: return wrapped in paragraph with balanced tags
  return `<p>${balanceLineTags(inner)}</p>`;
}

/**
 * Component to safely render rich job descriptions, requirements, and benefits
 * with custom design-system typography and fallback handling.
 */
export function JobRichContent({
  html,
  fallback,
  className = "",
}: {
  html?: string | null;
  fallback?: React.ReactNode;
  className?: string;
}) {
  const formattedHtml = React.useMemo(() => {
    if (!html) return "";
    return formatRichJobContent(html);
  }, [html]);

  if (!formattedHtml) {
    if (fallback) return <>{fallback}</>;
    return null;
  }

  return (
    <div
      className={`job-rich-content ${className}`}
      dangerouslySetInnerHTML={{ __html: formattedHtml }}
    />
  );
}
