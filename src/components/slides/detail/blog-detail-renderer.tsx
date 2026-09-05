import React from "react";
import type { SlideDetailBlog, SlideDetailBlogBlock } from "@/types";
import "./slide-detail.css";

export interface BlogDetailRendererProps {
  blog: SlideDetailBlog;
}

export function BlogDetailRenderer({ blog }: BlogDetailRendererProps) {
  const { title, subtitle, excerpt, heroImageUrl, content } = blog;
  const heroMeta = content?.heroMeta;
  const heroPlacement = heroMeta?.placement ?? "above_title";
  const heroPosition = heroMeta?.position ?? "center";
  const heroCaption = heroMeta?.caption ?? "";
  const blocks = content?.blocks ?? [];

  // ── 1. Hero Subcomponents ──
  const renderHeroHeader = () => (
    <header className="space-y-2 mb-4" key="hero-header">
      {subtitle && (
        <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#ca2a30]">
          {subtitle}
        </p>
      )}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-[#011A42] dark:text-white font-heading">
        {title}
      </h1>
    </header>
  );

  const renderHeroExcerpt = () =>
    excerpt ? (
      <p
        className="text-base sm:text-lg leading-relaxed text-[#6C7E96] dark:text-zinc-400 font-normal my-4"
        key="hero-excerpt"
      >
        {excerpt}
      </p>
    ) : null;

  const renderHeroMedia = () =>
    heroImageUrl ? (
      <figure
        className="my-6 overflow-hidden rounded-xl slide-blog-figure"
        key="hero-media"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroImageUrl}
          alt={title || "Ảnh bìa bài viết"}
          className="w-full max-h-[480px] object-cover rounded-xl"
          style={{ objectPosition: heroPosition }}
        />
        {heroCaption && (
          <figcaption className="mt-3 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400">
            {heroCaption}
          </figcaption>
        )}
      </figure>
    ) : null;

  // ── 2. Block Dispatcher ──
  const renderBlock = (block: SlideDetailBlogBlock): React.ReactNode => {
    const spacingStyle: React.CSSProperties = {
      marginTop:
        typeof block.spacing?.marginTop === "number"
          ? `${block.spacing.marginTop}px`
          : undefined,
      marginBottom:
        typeof block.spacing?.marginBottom === "number"
          ? `${block.spacing.marginBottom}px`
          : undefined,
    };

    return (
      <div key={block.id} style={spacingStyle} className="w-full">
        {(() => {
          switch (block.type) {
            case "heading":
              return block.level === 2 ? (
                <h2 className="slide-blog-heading-2 mt-8 mb-4">{block.text}</h2>
              ) : (
                <h3 className="slide-blog-heading-3 mt-6 mb-3">{block.text}</h3>
              );

            case "paragraph":
              return (
                <p
                  className="slide-blog-paragraph mb-4"
                  dangerouslySetInnerHTML={{ __html: block.text }}
                />
              );

            case "image":
              return block.url ? (
                <figure className="my-6 slide-blog-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={block.url}
                    alt={block.alt || "Hình ảnh minh hoạ"}
                    className="w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                  {block.caption && (
                    <figcaption className="mt-2.5 text-center text-xs sm:text-sm italic text-[#6C7E96] dark:text-zinc-400">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              ) : null;

            case "list":
              return (
                <ul className="slide-blog-list space-y-2 my-4 pl-2 text-base leading-relaxed">
                  {block.items.map((item, idx) => (
                    <li
                      key={typeof item === "object" && item.id ? item.id : idx}
                    >
                      <span
                        dangerouslySetInnerHTML={{
                          __html:
                            typeof item === "object" ? item.content : item,
                        }}
                      />
                    </li>
                  ))}
                </ul>
              );

            case "section":
              return (
                <section className="my-8 slide-blog-section">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="slide-blog-section__badge">
                      {block.number}
                    </span>
                    <h3 className="slide-blog-section__title">{block.title}</h3>
                  </div>
                  <div className="space-y-4">
                    {block.children.map((child) => renderBlock(child))}
                  </div>
                </section>
              );

            case "quote":
              return (
                <blockquote className="slide-blog-quote">
                  <p
                    className="slide-blog-quote__text"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                  {block.author && (
                    <p className="slide-blog-quote__author">— {block.author}</p>
                  )}
                </blockquote>
              );

            case "highlight":
              return (
                <aside className="slide-blog-highlight">
                  {block.title && (
                    <h4 className="slide-blog-highlight__title">
                      {block.title}
                    </h4>
                  )}
                  <p
                    className="slide-blog-highlight__text"
                    dangerouslySetInnerHTML={{ __html: block.text }}
                  />
                </aside>
              );

            case "cta":
              return (
                <div className="my-6 text-center">
                  <a
                    href={block.url}
                    target={block.url.startsWith("http") ? "_blank" : undefined}
                    rel={
                      block.url.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="slide-blog-cta-btn"
                  >
                    {block.label}
                  </a>
                </div>
              );

            default:
              return null;
          }
        })()}
      </div>
    );
  };

  // ── 3. Page Layout Assembly ──
  return (
    <article className="slide-detail-article px-4 sm:px-6 py-6">
      {/* Hero Layout Switcher */}
      {heroPlacement === "above_title" && (
        <>
          {renderHeroMedia()}
          {renderHeroHeader()}
          {renderHeroExcerpt()}
        </>
      )}

      {heroPlacement === "between_title_desc" && (
        <>
          {renderHeroHeader()}
          {renderHeroMedia()}
          {renderHeroExcerpt()}
        </>
      )}

      {heroPlacement === "below_desc" && (
        <>
          {renderHeroHeader()}
          {renderHeroExcerpt()}
          {renderHeroMedia()}
        </>
      )}

      {/* Content Blocks */}
      <div className="mt-8 space-y-6">
        {blocks.map((block) => renderBlock(block))}
      </div>
    </article>
  );
}
