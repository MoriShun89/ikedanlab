import { Metadata } from "next";
import Link from "next/link";
import {
  getArticles,
  getArticlesByCategory,
  CATEGORIES,
} from "@/lib/microcms";
import { ArticleCard } from "@/components/ArticleCard";

export const revalidate = 60;

type Props = {
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { category } = await searchParams;
  const cat = CATEGORIES.find((c) => c.id === category);

  if (cat) {
    return {
      title: `${cat.name}の記事一覧`,
      description: `${cat.name}に関するレビュー・比較記事の一覧です。`,
    };
  }

  return {
    title: "記事一覧",
    description:
      "スキンケア・脱毛・AGA治療・食事健康法に関する記事の一覧です。",
  };
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { category } = await searchParams;
  const activeCat = CATEGORIES.find((c) => c.id === category);

  const { contents: articles, totalCount } = activeCat
    ? await getArticlesByCategory(activeCat.id, { limit: 50 })
    : await getArticles({ limit: 50 });

  return (
    <>
      {/* Page Header */}
      <div className="container container--wide">
        <header className="category-header">
          <h1 className="category-header__title">
            {activeCat ? activeCat.name : "記事一覧"}
          </h1>
          <p className="category-header__count">{totalCount} 件の記事</p>
        </header>
      </div>

      {/* Category Tabs */}
      <div className="container container--wide">
        <nav className="category-tabs">
          <Link
            href="/articles"
            className={`category-tab ${!activeCat ? "category-tab--active" : ""}`}
          >
            すべて
          </Link>
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/articles?category=${cat.id}`}
              className={`category-tab ${cat.id === category ? "category-tab--active" : ""}`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Articles */}
      <div className="container container--wide">
        {articles.length === 0 ? (
          <p className="empty-state">
            {activeCat
              ? "このカテゴリにはまだ記事がありません。"
              : "まだ記事がありません。microCMS から記事を投稿してください。"}
          </p>
        ) : (
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
