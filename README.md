# イケダンラボ（ikedanlab）

**Next.js 16.1** (App Router / Turbopack) + microCMS + Vercel で構築するアフィリエイトブログ

## 技術スタック

| 技術 | バージョン | 役割 |
|------|----------|------|
| Next.js | 16.1.6 | フレームワーク（App Router） |
| React | 19.1 | UI ライブラリ |
| Turbopack | stable（v16デフォルト） | バンドラー（dev/build） |
| microCMS | — | ヘッドレス CMS |
| Vercel | — | ホスティング・デプロイ |
| TypeScript | 5.7+ | 型安全 |
| Node.js | 20.9.0 以上必須 | ランタイム |

## 🚀 セットアップ手順（最短30分）

### Step 1: microCMS のセットアップ

1. [microCMS](https://microcms.io/) にアカウント作成（無料 Hobby プラン）
2. サービスを作成
3. 以下の **2つの API** を作成する

#### API①：カテゴリ（リスト形式）

- エンドポイント名: `categories`
- フィールド:

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| name | カテゴリ名 | テキストフィールド | ✅ |
| slug | スラッグ | テキストフィールド | ✅ |
| description | 説明 | テキストエリア | |

- **初期データを3件登録:**

| コンテンツID（手動設定） | name | slug |
|------------------------|------|------|
| skincare | メンズスキンケア | skincare |
| epilation | 脱毛 | epilation |
| aga | AGA治療 | aga |
| wellness | 食事・健康法 | wellness |

> ⚠️ コンテンツIDは「コンテンツ編集画面」の右サイドバーで手動設定できます

#### API②：記事（リスト形式）

- エンドポイント名: `articles`
- フィールド:

| フィールドID | 表示名 | 種類 | 必須 | 備考 |
|-------------|--------|------|------|------|
| title | タイトル | テキストフィールド | ✅ | |
| slug | スラッグ | テキストフィールド | ✅ | URLに使用（半角英数-のみ） |
| body | 本文 | リッチエディタ | ✅ | |
| description | メタディスクリプション | テキストエリア | ✅ | 120文字程度 |
| thumbnail | サムネイル | 画像 | | 推奨: 1200x630px |
| categories | カテゴリ | 複数コンテンツ参照（categories） | ✅ | 1つ以上選択 |
| isPromotion | PR記事 | 真偽値（ブーリアン） | | trueの記事にPR表記を表示 |
| affiliateLinks | アフィリエイトリンク | 繰り返しフィールド | | 下記参照 |
| relatedArticles | 関連記事 | 複数コンテンツ参照（articles） | | |

- **affiliateLinks の繰り返しフィールド設定:**
  - カスタムフィールドID: `affiliateLink`

| フィールドID | 表示名 | 種類 | 必須 |
|-------------|--------|------|------|
| serviceName | サービス名 | テキストフィールド | ✅ |
| url | リンクURL | テキストフィールド | ✅ |
| buttonText | ボタンテキスト | テキストフィールド | ✅ |
| badge | バッジ | テキストフィールド | |

### Step 2: プロジェクトのセットアップ

```bash
# Node.js 20.9.0 以上が必要（Next.js 16 の最小要件）
node -v  # v20.9.0 以上であることを確認

# プロジェクトディレクトリに移動
cd ikedanlab

# 依存関係インストール
npm install

# 環境変数を設定
cp .env.local.example .env.local
```

`.env.local` を編集:

```env
MICROCMS_SERVICE_DOMAIN=ikedanlab            # microCMS管理画面のURL参照
MICROCMS_API_KEY=your-api-key                  # サービス設定 → APIキー
NEXT_PUBLIC_SITE_URL=http://localhost:3000      # 開発時
NEXT_PUBLIC_SITE_NAME=イケダンラボ
```

```bash
# 開発サーバー起動（Turbopack がデフォルトで有効）
npm run dev
```

→ http://localhost:3000 でサイトが表示される

### Step 3: Vercel にデプロイ

1. GitHub にリポジトリを作成してプッシュ
2. [Vercel](https://vercel.com/) にログイン → 「Import Project」
3. GitHub リポジトリを選択
4. Environment Variables に `.env.local` の内容を設定
5. 「Deploy」をクリック

### Step 4: microCMS Webhook（自動デプロイ設定）

1. Vercel のプロジェクト → Settings → Git → Deploy Hooks
2. 「Create Hook」で名前を付けてフックURLを生成
3. microCMS → サービス設定 → Webhook → 「カスタム通知」を追加
4. Vercel のフックURLを設定
5. これで microCMS で記事を公開するたびに自動でサイトが更新される

### Step 5: 独自ドメイン設定

1. ドメインを取得（お名前.com / Cloudflare 等で年1,000〜1,500円）
2. Vercel → Settings → Domains → ドメインを追加
3. DNS設定をVercelの指示通りに変更
4. `.env.local` の `NEXT_PUBLIC_SITE_URL` を更新して再デプロイ
5. `public/robots.txt` の Sitemap URL も更新

### Step 6: Google Search Console に登録

1. https://search.google.com/search-console
2. 「プロパティを追加」→ ドメインを入力
3. DNS検証 or HTMLファイルで認証
4. サイトマップを送信: `https://ikedanlab.com/sitemap.xml`

## 📁 プロジェクト構成

```
ikedanlab/
├── next.config.ts              # Next.js 16 設定（TypeScript形式）
├── package.json                # Next.js 16.1.6 / React 19.1
├── tsconfig.json
├── .nvmrc                      # Node.js 20
├── .env.local.example
├── public/
│   └── robots.txt
└── src/
    ├── app/                    # ← App Router
    │   ├── layout.tsx          # 共通レイアウト（Header/Footer/GA）
    │   ├── page.tsx            # トップページ（ヒーロー + 最新記事6件）
    │   ├── not-found.tsx       # 404ページ
    │   ├── sitemap.ts          # 自動サイトマップ生成
    │   └── articles/
    │       ├── page.tsx        # 記事一覧（?category=X でフィルタ）
    │       └── [slug]/
    │           └── page.tsx    # 記事詳細ページ
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ArticleCard.tsx     # 記事カード（一覧用）
    │   ├── AffiliateBox.tsx    # アフィリエイトリンクボックス
    │   └── GoogleAnalytics.tsx
    ├── lib/
    │   ├── microcms.ts         # microCMS クライアント & 型定義
    │   └── utils.ts            # ユーティリティ
    └── styles/
        └── globals.css         # グローバルスタイル
```

## 📝 Next.js 16 対応ポイント

| 項目 | 対応状況 |
|-----|---------|
| App Router | ✅ `src/app/` 配下で全ページ構成 |
| Turbopack（stable） | ✅ `next dev --turbopack` がデフォルト |
| Async params | ✅ 全動的ルートで `params: Promise<>` + `await` |
| next.config.ts | ✅ TypeScript 形式（v16推奨） |
| Node.js 20.9+ | ✅ `.nvmrc` + `engines` で指定 |
| ESLint | `next lint` は v16 で非推奨のため除外 |
| middleware → proxy | 未使用のため対応不要 |

## 📝 記事の書き方ワークフロー

1. microCMS 管理画面にログイン
2. 「記事」→「新規作成」
3. 各フィールドを入力：
   - **スラッグ**: URLになる（例: `best-skincare-2026`）
   - **本文**: リッチエディタで見出し・画像・表を使って執筆
   - **アフィリエイトリンク**: 「+」で追加、A8.netのリンクを貼る
   - **カテゴリ**: 3つから選択
4. 「公開」ボタン → Webhook で自動デプロイ → 数分後にサイトに反映

## 💰 アフィリエイトリンクの貼り方

> **重要**: アフィリエイトリンクを含む記事を公開する前に、必ず `documents/affiliate-compliance.md` の **Phase 3: ASP承認後にやること** チェックリストを完了してください。

### ASP承認前（現在）

アフィリエイトリンクを含まない情報記事のみ公開する。PR表記は環境変数で非表示に制御されている。

### ASP承認後

1. `.env.local` と Vercel に `NEXT_PUBLIC_AFFILIATE_ACTIVE=true` を設定
2. プライバシーポリシー・免責事項の文言を将来形→現在形に更新
3. 再デプロイでPR表記が自動的に有効化される

詳細な手順は `documents/affiliate-compliance.md` の Phase 3 を参照。

### リンクの設置箇所

A8.net / もしもアフィリエイトで提携した案件のリンクは2箇所に設置できます：

1. **記事末尾のアフィリエイトボックス**（`affiliateLinks` フィールド）
   → CTAボタン付きのボックスが自動生成される（`rel="nofollow sponsored"` 付き）

2. **記事本文中にテキストリンク**
   → リッチエディタでテキストを選択 → リンクを挿入 → ASPのリンクURLを貼る
   → `rel="nofollow sponsored"` を手動でHTMLモードで追加すること

## ⚡ パフォーマンス & SEO

- ISR（Incremental Static Regeneration）: 60秒間隔で再検証
- 構造化データ（JSON-LD）: 記事ページに自動出力
- サイトマップ: `/sitemap.xml` で自動生成
- OGP: 記事ごとに自動設定
- 画像最適化: microCMS の画像変換パラメータを利用
- Turbopack: 開発時のHMRが5〜10倍高速
