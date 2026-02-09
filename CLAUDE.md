# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 基本方針

- 必ず日本語で応対すること
- 調査やデバッグにはサブエージェント（Task tool）を活用してコンテキストを節約すること
- 重要な決定事項は定期的にマークダウンファイルに記録すること

## コード規約

- TypeScriptを使用
- テストはVitestで書く
- コミットメッセージは日本語で簡潔に

## ドキュメント

- `documents/project-brief.md` — 事業方針・ターゲット・記事の方向性・競合差別化
- `documents/ui-ux-guidelines.md` — UI/UXデザインルール（ページ構成・修正時に必ず参照）
- `documents/affiliate-compliance.md` — アフィリエイトコンプライアンス・法規制ガイド（記事執筆・コンテンツ作成時に必ず参照）

## Project Overview

イケダンラボ (ikedanlab) — an affiliate blog about skincare, men's grooming, hair removal, and AGA treatment. Built with Next.js 16 (App Router) + microCMS (headless CMS) + Vercel hosting. Content is managed entirely in microCMS; the Next.js app is a read-only frontend.

## Commands

```bash
npm run dev          # Start dev server (Turbopack enabled by default, http://localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # ESLint check
npm run lint:fix     # ESLint auto-fix
```

Node.js >= 20.9.0 required (see `.nvmrc`).

## Environment Variables

Copy `.env.local.example` to `.env.local`. Required:
- `MICROCMS_SERVICE_DOMAIN` — microCMS service domain
- `MICROCMS_API_KEY` — microCMS API key (server-side only, never expose to client)
- `NEXT_PUBLIC_SITE_URL` — canonical site URL
- `NEXT_PUBLIC_SITE_NAME` — site display name
- `NEXT_PUBLIC_GA_ID` — Google Analytics measurement ID (optional)
- `NEXT_PUBLIC_AFFILIATE_ACTIVE` — set to `true` after ASP approval to enable PR disclosure bar and footer affiliate note (optional, default: hidden)
- `NEXT_PUBLIC_GOOGLE_FORM_URL` — Google Forms embed URL for contact page (optional)

## Architecture

### Data Flow

All content comes from **microCMS** via `microcms-js-sdk`. The client and all data-fetching functions live in `src/lib/microcms.ts`. There is no database, no authentication, and no server-side mutations — the app is a static/ISR-based reader.

microCMS APIs:
- **articles** — blog posts with rich text body, affiliate links (repeating custom field `affiliateLink`), categories (multiple content reference), related articles
- **categories** — 4 fixed categories: skincare (メンズスキンケア), epilation (脱毛), aga (AGA・薄毛), wellness (食事・健康法)

### Routing (App Router)

| Route | File | Description |
|-------|------|-------------|
| `/` | `src/app/page.tsx` | Home — hero + latest 6 articles + "more" link |
| `/articles` | `src/app/articles/page.tsx` | All articles with `?category=X` filter |
| `/articles/[slug]` | `src/app/articles/[slug]/page.tsx` | Article detail with TOC, affiliate boxes, related articles, JSON-LD |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy + operator info |
| `/disclaimer` | `src/app/disclaimer/page.tsx` | Disclaimer |
| `/contact` | `src/app/contact/page.tsx` | Contact form (Google Forms embed) |
| `/sitemap.xml` | `src/app/sitemap.ts` | Auto-generated sitemap |

All pages use `export const revalidate = 60` (ISR, 60-second revalidation). Dynamic route params use Next.js 16's `params: Promise<>` pattern — always `await params` before use.

### Key Files

- `src/lib/microcms.ts` — microCMS client, TypeScript types (`Article`, `Category`, `AffiliateLink`), all data-fetching functions, and the `CATEGORIES` constant (source of truth for category IDs/names)
- `src/lib/utils.ts` — `formatDate` (Japanese date formatting via date-fns) and `estimateReadTime` (500 chars/min for Japanese text)
- `src/styles/globals.css` — all styling via CSS custom properties and BEM-like class naming; no CSS modules or CSS-in-JS
- `src/components/TableOfContents.tsx` — uses `cheerio` to extract h2/h3 headings from rich text HTML and inject anchor IDs; exports `extractHeadings` and `addIdsToHeadings` alongside the component

### Client vs Server Components

Most components are **server components** (default in App Router). Only these are client components (`"use client"`):
- `ReadingProgress` — scroll-based reading progress bar
- `MobileMenu` — hamburger menu with overlay
- `CookieNotice` — cookie usage notification banner

### Styling Conventions

- Single global CSS file (`globals.css`) using CSS custom properties (`:root` variables)
- BEM-like naming: `.block__element`, `.block--modifier`
- Container widths: `--container-width: 780px` (article), `--container-wide: 1100px` (grids)
- Responsive breakpoint: `768px` (single media query)
- UI/UX design decisions must follow `documents/ui-ux-guidelines.md` (color usage, CTA placement, layout patterns, typography rules)

### Image Handling

Images are served from `images.microcms-assets.io` (configured in `next.config.ts` `remotePatterns`). microCMS image transform parameters (e.g., `?w=800&h=500&fit=crop`) are used inline rather than Next.js `<Image>` component.

## ESLint Configuration

Uses flat config (`eslint.config.mjs`) with `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`. Custom rules:
- `@typescript-eslint/no-unused-vars`: warn (allows `_` prefix)
- `@typescript-eslint/no-explicit-any`: warn

## Path Aliases

`@/*` maps to `./src/*` (configured in `tsconfig.json`).

## Scripts Directory

`scripts/` contains microCMS seeding scripts (`seed-articles.mjs`, `seed-articles-v2.mjs`) for populating test content. These are standalone Node.js scripts, not part of the build.
