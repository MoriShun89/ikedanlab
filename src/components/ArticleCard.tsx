import Link from "next/link";
import type { Article } from "@/lib/microcms";
import { formatDate, estimateReadTime } from "@/lib/utils";

type Props = {
  article: Article;
  featured?: boolean;
};

export function ArticleCard({ article, featured }: Props) {
  const excerpt =
    article.description.length > 60
      ? article.description.slice(0, 60) + "..."
      : article.description;

  const cardClass = featured
    ? "article-card article-card--featured"
    : "article-card";

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
      </div>
      <div className="article-card__body">
        {article.categories && article.categories.length > 0 && (
          <div className="article-card__categories">
            {article.categories.map((cat) => (
              <span key={cat.id} className="article-card__category">
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
          {article.body && (
            <span>{estimateReadTime(article.body)}分で読める</span>
          )}
        </div>
      </div>
    </Link>
  );
}
