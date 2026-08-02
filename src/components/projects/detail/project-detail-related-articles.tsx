"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectEntry } from "@/data/projects.data";

/**
 * Related articles section — displays articles linked to this project.
 * Card layout: thumbnail + title + publish date.
 * Conditional render when articles exist.
 */
export const ProjectDetailRelatedArticles = ({
  project,
}: {
  project: ProjectEntry;
}) => {
  const articles = project.relatedArticles;

  if (!articles || articles.length === 0) return null;

  return (
    <section className="pd-related-articles" aria-label="Bài viết liên quan">
      <div className="pd-related-articles__container">
        <div className="pd-related-articles__header">
          <span className="pd-related-articles__label">Bài viết</span>
          <h2 className="pd-related-articles__heading">
            Tin tức
            <br />
            liên quan
          </h2>
        </div>

        <div className="pd-related-articles__grid">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="pd-related-articles__card"
            >
              {article.thumbnail && (
                <div className="pd-related-articles__card-image">
                  <Image
                    src={article.thumbnail}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="pd-related-articles__card-content">
                <h3 className="pd-related-articles__card-title">
                  {article.title}
                </h3>
                {article.publishedAt && (
                  <time className="pd-related-articles__card-date">
                    {new Date(article.publishedAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
