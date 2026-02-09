import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getArticleBySlug,
  getAllArticleSlugs,
  getArticlesByCategory,
  type Article,
} from "@/lib/microcms";
import { AffiliateBox } from "@/components/AffiliateBox";
import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import {
  TableOfContents,
  extractHeadings,
  addIdsToHeadings,
} from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { AuthorBox } from "@/components/AuthorBox";
import { ArticleLeadBox } from "@/components/ArticleLeadBox";
import { StickyCta } from "@/components/StickyCta";
import { formatDate, estimateReadTime } from "@/lib/utils";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

/** 静的パス生成（ビルド時） */
export async function generateStaticParams() {
  const articles = await getAllArticleSlugs();
  return articles.map((a) => ({ slug: a.slug }));
}

/** 動的メタデータ生成 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      url: `${siteUrl}/articles/${article.slug}`,
      images: article.thumbnail
        ? [{ url: article.thumbnail.url, width: 1200, height: 630 }]
        : [],
    },
    alternates: {
      canonical: `${siteUrl}/articles/${article.slug}`,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  // 同じカテゴリの関連記事（自分を除く・最初のカテゴリで検索）
  const categories = article.categories ?? [];
  const primaryCategory = categories[0];
  const { contents: relatedArticles } = primaryCategory
    ? await getArticlesByCategory(primaryCategory.id, { limit: 4 })
    : { contents: [] as Article[] };
  const filteredRelated = relatedArticles.filter((a) => a.id !== article.id);

  // 目次用に見出しを抽出し、本文にidを付与
  const headings = extractHeadings(article.body);
  const bodyWithIds = addIdsToHeadings(article.body, headings);

  // JSON-LD 構造化データ
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    image: article.thumbnail?.url,
    author: {
      "@type": "Organization",
      name: `${process.env.NEXT_PUBLIC_SITE_NAME ?? "イケダンラボ"} 編集部`,
    },
  };

  return (
    <>
      <ReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="container">
        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            ...(primaryCategory
              ? [
                  {
                    label: primaryCategory.name,
                    href: `/articles?category=${primaryCategory.id}`,
                  },
                ]
              : []),
            { label: article.title },
          ]}
        />

        {/* PR Notice: isPromotion=true または affiliateLinks がある場合に表示（ステマ規制対策） */}
        {(article.isPromotion ||
          (article.affiliateLinks && article.affiliateLinks.length > 0)) && (
          <p className="article-pr-notice">
            PR この記事にはプロモーションが含まれています
          </p>
        )}

        {/* Header */}
        <header className="article-header">
          <div className="article-header__categories">
            {categories.map((cat) => (
              <span key={cat.id} className="article-header__category">
                {cat.name}
              </span>
            ))}
          </div>
          <h1 className="article-header__title">{article.title}</h1>
          <div className="article-header__meta">
            <time dateTime={article.publishedAt}>
              {formatDate(article.publishedAt)}
            </time>
            {article.updatedAt !== article.publishedAt && (
              <span>（更新: {formatDate(article.updatedAt)}）</span>
            )}
            <span>{estimateReadTime(article.body)}分で読める</span>
          </div>
        </header>

        {/* Thumbnail */}
        {article.thumbnail && (
          <img
            src={`${article.thumbnail.url}?w=800&q=80`}
            alt={article.title}
            width={800}
            height={450}
            style={{ borderRadius: 8, width: "100%", marginBottom: 24 }}
          />
        )}

        {/* Lead Box */}
        <ArticleLeadBox
          html={article.body}
          readTime={estimateReadTime(article.body)}
        />

        {/* Table of Contents */}
        <TableOfContents html={article.body} />

        {/* Body */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: bodyWithIds }}
        />

        {/* Affiliate Links */}
        {article.affiliateLinks && article.affiliateLinks.length > 0 && (
          <section className="affiliate-section">
            <h2 className="affiliate-section__title">
              この記事で紹介したサービス
            </h2>
            {article.affiliateLinks.map((link, i) => (
              <AffiliateBox key={i} link={link} />
            ))}
          </section>
        )}

        {/* Author */}
        <AuthorBox />
      </article>

      {/* Mobile Sticky CTA */}
      {article.affiliateLinks && article.affiliateLinks.length > 0 && (
        <StickyCta link={article.affiliateLinks[0]} />
      )}

      {/* Related Articles */}
      {filteredRelated.length > 0 && (
        <section className="related-section">
          <div className="container container--wide">
            <h2 className="related-section__title">
              <span className="section-heading__sub">Related</span>
              関連記事
            </h2>
            <div className="articles-grid">
              {filteredRelated.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
