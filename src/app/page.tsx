import Link from "next/link";
import { getArticles, CATEGORIES } from "@/lib/microcms";
import { ArticleCard } from "@/components/ArticleCard";

// ISR: 60秒ごとに再検証
export const revalidate = 60;

export default async function HomePage() {
  const { contents: articles } = await getArticles({ limit: 6 });

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">
            <ruby>イケ<rt>・・</rt></ruby>てる
            <ruby>ダン<rt>・・</rt></ruby>シのための
            <ruby>研究所<rt>ラボ</rt></ruby>
          </h1>
          <p className="hero__subtitle">
            身体の内側から外側まで、男を磨くための情報をお届けします
          </p>
          <nav className="hero__categories">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/articles?category=${cat.id}`}
                className="hero__category-link"
              >
                {cat.name}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      {/* Latest Articles */}
      <div className="container container--wide">
        <h2 className="section-heading">
          <span className="section-heading__sub">Latest</span>
          最新の記事
        </h2>

        {articles.length === 0 ? (
          <p className="empty-state">
            まだ記事がありません。microCMS から記事を投稿してください。
          </p>
        ) : (
          <>
            {/* Feature card — first article */}
            <ArticleCard article={articles[0]} featured />
            {articles.length > 1 && (
              <div className="articles-grid">
                {articles.slice(1).map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}
          </>
        )}

        {articles.length > 0 && (
          <div className="section-more">
            <Link href="/articles" className="section-more__link">
              記事をもっと見る
              <span className="section-more__arrow" aria-hidden="true">
                &rarr;
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
