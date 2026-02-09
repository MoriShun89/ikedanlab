import Link from "next/link";
import { getArticles } from "@/lib/microcms";
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
        </div>
      </section>

      {/* Latest Articles */}
      <div className="container container--wide">
        <h2 className="section-heading">最新の記事</h2>

        {articles.length === 0 ? (
          <p className="empty-state">
            まだ記事がありません。microCMS から記事を投稿してください。
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
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
