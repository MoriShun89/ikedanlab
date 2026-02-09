import Link from "next/link";
import type { Article } from "@/lib/microcms";
import { formatDate, estimateReadTime } from "@/lib/utils";

type Props = {
  article: Article;
};

export function ArticleCard({ article }: Props) {
  const excerpt =
    article.description.length > 60
      ? article.description.slice(0, 60) + "..."
      : article.description;

  return (
    <Link href={`/articles/${article.slug}`} className="article-card">
      <div className="article-card__thumbnail">
        {article.thumbnail ? (
          <img
            src={`${article.thumbnail.url}?w=640&h=360&fit=crop`}
            alt={article.title}
            width={640}
            height={360}
            loading="lazy"
          />
        ) : (
          <div className="article-card__placeholder" />
        )}
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
          <p className="article-card__excerpt">{excerpt}</p>
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
