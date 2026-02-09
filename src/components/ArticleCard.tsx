import Link from "next/link";
import type { Article } from "@/lib/microcms";
import { formatDate, estimateReadTime } from "@/lib/utils";

type Props = {
  article: Article;
  featured?: boolean;
};

const CATEGORY_MODIFIERS: Record<string, string> = {
  skincare: "article-card__category--skincare",
  epilation: "article-card__category--epilation",
  aga: "article-card__category--aga",
  wellness: "article-card__category--wellness",
};

function isNew(publishedAt: string): boolean {
  const diff = Date.now() - new Date(publishedAt).getTime();
  return diff <= 7 * 24 * 60 * 60 * 1000;
}

export function ArticleCard({ article, featured }: Props) {
  const excerpt =
    article.description.length > 60
      ? article.description.slice(0, 60) + "..."
      : article.description;

  const cardClass = featured
    ? "article-card article-card--featured"
    : "article-card";

  const readTime = article.body ? estimateReadTime(article.body) : null;

  return (
    <Link href={`/articles/${article.slug}`} className={cardClass}>
      <div className="article-card__thumbnail">
        {article.thumbnail ? (
          <img
            src={`${article.thumbnail.url}?w=${featured ? "800" : "640"}&h=${featured ? "450" : "360"}&fit=crop`}
            alt={article.title}
            width={featured ? 800 : 640}
            height={featured ? 450 : 360}
            loading={featured ? undefined : "lazy"}
          />
        ) : (
          <div className="article-card__placeholder" />
        )}
        <div className="article-card__thumbnail-overlay" />
        {readTime && (
          <span className="article-card__readtime-badge">
            {readTime}min
          </span>
        )}
        {isNew(article.publishedAt) && (
          <span className="article-card__new-badge">NEW</span>
        )}
      </div>
      <div className="article-card__body">
        {article.categories && article.categories.length > 0 && (
          <div className="article-card__categories">
            {article.categories.map((cat) => (
              <span
                key={cat.id}
                className={`article-card__category ${CATEGORY_MODIFIERS[cat.id] ?? ""}`}
              >
                {cat.name}
              </span>
            ))}
          </div>
        )}
        <h2 className="article-card__title">{article.title}</h2>
        {article.description && (
          <p className="article-card__excerpt">
            {featured ? article.description : excerpt}
          </p>
        )}
        <div className="article-card__meta">
          <time dateTime={article.publishedAt}>
            {formatDate(article.publishedAt)}
          </time>
        </div>
      </div>
    </Link>
  );
}
