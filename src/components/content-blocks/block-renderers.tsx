import React from "react";
import type { ImageBlock } from "@/types";

export function getHeadingStyles(block: {
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  spacing?: { marginTop?: number; marginBottom?: number };
}): React.CSSProperties {
  const hasCustomTop = typeof block.spacing?.marginTop === "number";
  const hasCustomBottom = typeof block.spacing?.marginBottom === "number";

  return {
    fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
    lineHeight: block.lineHeight ? block.lineHeight : undefined,
    color: block.color || undefined,
    backgroundColor: block.backgroundColor || undefined,
    borderColor: block.borderColor || undefined,
    borderWidth: block.borderWidth ? `${block.borderWidth}px` : undefined,
    borderStyle: block.borderWidth ? "solid" : undefined,
    borderRadius: block.borderRadius ? `${block.borderRadius}px` : undefined,
    padding: block.padding ? `${block.padding}px` : undefined,
    textAlign: block.textAlign || undefined,
    marginTop: hasCustomTop ? 0 : undefined,
    marginBottom: hasCustomBottom ? 0 : undefined,
  };
}

export function getParagraphStyles(block: {
  fontSize?: number;
  lineHeight?: number;
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
  padding?: number;
  indent?: number;
  textAlign?: "left" | "center" | "right" | "justify";
  spacing?: { marginTop?: number; marginBottom?: number };
}): React.CSSProperties {
  const hasCustomTop = typeof block.spacing?.marginTop === "number";
  const hasCustomBottom = typeof block.spacing?.marginBottom === "number";

  return {
    fontSize: block.fontSize ? `${block.fontSize}px` : undefined,
    lineHeight: block.lineHeight ? block.lineHeight : undefined,
    color: block.color || undefined,
    backgroundColor: block.backgroundColor || undefined,
    borderColor: block.borderColor || undefined,
    borderWidth: block.borderWidth ? `${block.borderWidth}px` : undefined,
    borderStyle: block.borderWidth ? "solid" : undefined,
    borderRadius: block.borderRadius ? `${block.borderRadius}px` : undefined,
    padding: block.padding ? `${block.padding}px` : undefined,
    textIndent: block.indent ? `${block.indent}px` : undefined,
    textAlign: block.textAlign || undefined,
    marginTop: hasCustomTop ? 0 : undefined,
    marginBottom: hasCustomBottom ? 0 : undefined,
  };
}

export function renderPublicImageBlock(
  block: ImageBlock,
  defaultAlt = "Hình ảnh minh hoạ",
): React.ReactNode {
  const hasCustomTop = typeof block.spacing?.marginTop === "number";
  const hasCustomBottom = typeof block.spacing?.marginBottom === "number";
  const isDual = block.layout === "dual" && (block.url || block.secondaryUrl);

  const getAspectClass = (aspect?: string | null) => {
    if (aspect === "16:9") return "aspect-video";
    if (aspect === "4:3") return "aspect-[4/3]";
    if (aspect === "1:1") return "aspect-square";
    return "";
  };

  const aspectClass = getAspectClass(block.aspectRatio);

  if (isDual) {
    return (
      <div
        className="my-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        style={{
          marginTop: hasCustomTop ? 0 : undefined,
          marginBottom: hasCustomBottom ? 0 : undefined,
        }}
      >
        {block.url ? (
          <figure className="slide-blog-figure flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.url}
              alt={block.alt || defaultAlt}
              className={`w-full rounded-lg object-cover ${aspectClass}`}
              loading="lazy"
            />
            {block.caption && (
              <figcaption
                className="mt-2 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: block.caption }}
              />
            )}
          </figure>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center min-h-[160px] text-xs text-zinc-400">
            Chưa chọn ảnh 1
          </div>
        )}

        {block.secondaryUrl ? (
          <figure className="slide-blog-figure flex flex-col">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={block.secondaryUrl}
              alt={block.secondaryAlt || defaultAlt}
              className={`w-full rounded-lg object-cover ${aspectClass}`}
              loading="lazy"
            />
            {block.secondaryCaption && (
              <figcaption
                className="mt-2 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400"
                dangerouslySetInnerHTML={{ __html: block.secondaryCaption }}
              />
            )}
          </figure>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-200 dark:border-zinc-800 flex items-center justify-center min-h-[160px] text-xs text-zinc-400">
            Chưa chọn ảnh 2
          </div>
        )}
      </div>
    );
  }

  return block.url ? (
    <figure
      className="my-6 slide-blog-figure"
      style={{
        marginTop: hasCustomTop ? 0 : undefined,
        marginBottom: hasCustomBottom ? 0 : undefined,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={block.url}
        alt={block.alt || defaultAlt}
        className={`w-full rounded-lg object-cover ${aspectClass}`}
        loading="lazy"
      />
      {block.caption && (
        <figcaption
          className="mt-2.5 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400"
          dangerouslySetInnerHTML={{ __html: block.caption }}
        />
      )}
    </figure>
  ) : null;
}
