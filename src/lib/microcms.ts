import { createClient } from "microcms-js-sdk";
import type { MicroCMSImage, MicroCMSDate, MicroCMSQueries } from "microcms-js-sdk";

// ============================================
// Client
// ============================================

if (!process.env.MICROCMS_SERVICE_DOMAIN) {
  throw new Error("MICROCMS_SERVICE_DOMAIN is required");
}
if (!process.env.MICROCMS_API_KEY) {
  throw new Error("MICROCMS_API_KEY is required");
}

export const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY,
});

// ============================================
// Types
// ============================================

/** カテゴリ */
export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
} & MicroCMSDate;

/** アフィリエイトリンク（繰り返しフィールド） */
export type AffiliateLink = {
  fieldId: "affiliateLink";
  serviceName: string;
  url: string;
  buttonText: string;
  badge?: string; // 「おすすめ」「人気No.1」等
  description?: string; // サービスの説明・特徴
};

/** 記事 */
export type Article = {
  id: string;
  title: string;
  slug: string;
  body: string;
  description: string;
  thumbnail?: MicroCMSImage;
  categories?: Category[];
  isPromotion?: boolean; // PR記事かどうか（trueの場合PR表記を表示）
  affiliateLinks?: AffiliateLink[];
  relatedArticles?: Article[];
  publishedAt: string;
} & MicroCMSDate;

// ============================================
// カテゴリ定義（microCMS のカテゴリIDと対応）
// ============================================

export const CATEGORIES = [
  { id: "skincare", name: "メンズスキンケア", slug: "skincare" },
  { id: "epilation", name: "脱毛", slug: "epilation" },
  { id: "aga", name: "AGA・薄毛", slug: "aga" },
  { id: "wellness", name: "食事・健康法", slug: "wellness" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

// ============================================
// Data Fetching
// ============================================

/** 記事一覧を取得 */
export async function getArticles(queries?: MicroCMSQueries) {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      limit: 20,
      orders: "-publishedAt",
      ...queries,
    },
  });
  return data;
}

/** 記事をslugで1件取得 */
export async function getArticleBySlug(slug: string) {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `slug[equals]${slug}`,
      limit: 1,
    },
  });
  return data.contents[0] ?? null;
}

/** 記事をIDで1件取得 */
export async function getArticleById(id: string) {
  const data = await client.get<Article>({
    endpoint: "articles",
    contentId: id,
  });
  return data;
}

/** カテゴリ別の記事一覧を取得 */
export async function getArticlesByCategory(
  categoryId: string,
  queries?: MicroCMSQueries
) {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      filters: `categories[contains]${categoryId}`,
      orders: "-publishedAt",
      limit: 20,
      ...queries,
    },
  });
  return data;
}

/** 全記事のslug一覧（sitemap・静的生成用） */
export async function getAllArticleSlugs() {
  const data = await client.getList<Article>({
    endpoint: "articles",
    queries: {
      fields: ["id", "slug", "updatedAt"],
      limit: 100,
    },
  });
  return data.contents;
}
